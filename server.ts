import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI, Type } from "@google/genai";
import dotenv from "dotenv";
import fs from "fs";
import nodemailer from "nodemailer";

dotenv.config();

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // Server-side lazy-initialized Gemini client
  let aiClient: GoogleGenAI | null = null;
  function getGeminiClient(): GoogleGenAI {
    if (!aiClient) {
      const apiKey = process.env.GEMINI_API_KEY;
      if (!apiKey || apiKey === "MY_GEMINI_API_KEY") {
        throw new Error("GEMINI_API_KEY is not configured in environment variables.");
      }
      aiClient = new GoogleGenAI({
        apiKey,
        httpOptions: {
          headers: {
            "User-Agent": "aistudio-build",
          },
        },
      });
    }
    return aiClient;
  }

  // API endpoint to generate structural GBA business growth roadmaps
  app.post("/api/gba/build", async (req, res) => {
    try {
      const { businessName, industry, description, targetAudience, chosenServices } = req.body;

      if (!businessName || !description) {
        return res.status(400).json({ error: "Required fields businessName and description are missing." });
      }

      // Check if API key is populated
      const apiKey = process.env.GEMINI_API_KEY;
      if (!apiKey || apiKey === "MY_GEMINI_API_KEY") {
        // Return structured placeholder mockup data so the user gets an outstanding experience immediately
        console.log("Using realistic fallback roadmap because GEMINI_API_KEY is not configured.");
        return res.json({
          isPlaceholder: true,
          message: "To get custom AI-generated insights, configure your GEMINI_API_KEY in the Secrets panel on the right.",
          roadmap: {
            branding: {
              brandValues: [
                "Rebellious authenticity for " + (targetAudience || "modern general customers"),
                "Extreme transparency",
                "High-velocity digital presence"
              ],
              logoConcept: `A bold retro-tech symbol featuring interlocking kinetic gear teeth and custom geometric wordmark styled with neon highlights in JetBrains Mono.`,
              persona: `A Gen-Z or Millennial professional who feels restricted by corporatism and values high aesthetic standards, quick results, and direct language.`
            },
            marketing: {
              campaignTitle: `Operation: Velocity 1.0 (for ${idx(industry) || "Startup Growth"})`,
              socialAdConcepts: [
                "A glitch-art style short-form video comparing old dusty business models with Kinetic Collective's raw delivery pipeline.",
                "A bold minimalist typographic billboard reading: 'We don't sell hours. We ship results.'"
              ],
              budgetPriority: "70% high-impact social and micro-creator activations, 30% guerrilla visual campaigns in targeted urban startup clusters."
            },
            staffing: {
              rolesToHire: [
                "1x Growth Catalyst (Lead Marketer & Content Curator)",
                "1x Automation & Integration Lead",
                "1x Visual Identity Curator (Branding Lead)"
              ],
              briefingTemplate: `ROLE: Growth Catalyst. MISSION: Maximize audience reach and customer retention via organic, native visual layouts. SKILLS: Figma proficiency, video editing, direct customer engagement channels. STRETCH GOAL: 10k audience expansion within 30 days.`
            },
            acquisition: {
              targetPoints: [
                "Establish localized high-retention onboarding workflows",
                "Provide direct incentive structures for referral loops"
              ],
              retentionIdea: "An exclusive invite-only Discord channel with weekly direct masterclasses on automated operations."
            },
            expansion: {
              launchGeoPlan: "Establish a physical micro-hub in high-density creative coworking districts (e.g., Brooklyn, Austin, or Berlin).",
              networkStrategy: "Co-host curated physical events and hackathons with complementary early-stage founders to leverage joint communities."
            }
          }
        });
      }

      const client = getGeminiClient();

      const prompt = `You are the lead strategic consultant at Kinetic Collective, a high-octane elite Gen-Z Business Agency.
Your objective is to generate an innovative, high-impact business growth blueprint for a company with the following details:
- Company Name: ${businessName}
- Industry/Niche: ${industry || "General Startup"}
- Description: ${description}
- Target Audience Focus: ${targetAudience || "Gen-Z / Modern Professionals"}
- Focus Services: ${chosenServices ? chosenServices.join(", ") : "All GBA elements"}

Return structured advice strictly aligning with our "machines over dreams" philosophy. Be bold, modern, highly specific, and practical. Do not use corporate jargon; use direct, modern, aesthetic framing.`;

      const response = await client.models.generateContent({
        model: "gemini-3.5-flash",
        contents: prompt,
        config: {
          systemInstruction: "You are the premium business architect at Kinetic Collective, providing ultra-modern, high-impact tactical strategies for companies. Keep insights razor-sharp, actionable, and visually evocative.",
          responseMimeType: "application/json",
          responseSchema: {
            type: Type.OBJECT,
            properties: {
              branding: {
                type: Type.OBJECT,
                properties: {
                  brandValues: {
                    type: Type.ARRAY,
                    items: { type: Type.STRING },
                    description: "3 highly specific, distinctive brand values styled in a modern, rebellious, or bold voice."
                  },
                  logoConcept: {
                    type: Type.STRING,
                    description: "A visually descriptive concept outline for an aesthetic logo and typographic set."
                  },
                  persona: {
                    type: Type.STRING,
                    description: "A highly vivid description of the ideal buyer persona."
                  }
                },
                required: ["brandValues", "logoConcept", "persona"]
              },
              marketing: {
                type: Type.OBJECT,
                properties: {
                  campaignTitle: {
                    type: Type.STRING,
                    description: "The name of their launch or growth campaign."
                  },
                  socialAdConcepts: {
                    type: Type.ARRAY,
                    items: { type: Type.STRING },
                    description: "2 distinct, native, shortform video or modern digital ad concepts."
                  },
                  budgetPriority: {
                    type: Type.STRING,
                    description: "Brief blueprint of budget allocation."
                  }
                },
                required: ["campaignTitle", "socialAdConcepts", "budgetPriority"]
              },
              staffing: {
                type: Type.OBJECT,
                properties: {
                  rolesToHire: {
                    type: Type.ARRAY,
                    items: { type: Type.STRING },
                    description: "2-3 key roles they must hire to execute this strategy."
                  },
                  briefingTemplate: {
                    type: Type.STRING,
                    description: "A micro recruiter briefing document/instruction for the top role."
                  }
                },
                required: ["rolesToHire", "briefingTemplate"]
              },
              acquisition: {
                type: Type.OBJECT,
                properties: {
                  targetPoints: {
                    type: Type.ARRAY,
                    items: { type: Type.STRING },
                    description: "2 precision acquisition steps."
                  },
                  retentionIdea: {
                    type: Type.STRING,
                    description: "One high-retention customer program or community idea."
                  }
                },
                required: ["targetPoints", "retentionIdea"]
              },
              expansion: {
                type: Type.OBJECT,
                properties: {
                  launchGeoPlan: {
                    type: Type.STRING,
                    description: "Where they should expand physical/digital footprints."
                  },
                  networkStrategy: {
                    type: Type.STRING,
                    description: "How to multiply network influence."
                  }
                },
                required: ["launchGeoPlan", "networkStrategy"]
              }
            },
            required: ["branding", "marketing", "staffing", "acquisition", "expansion"]
          }
        }
      });

      const responseText = response.text;
      if (!responseText) {
        throw new Error("Empty response received from Gemini.");
      }

      const generatedData = JSON.parse(responseText.trim());
      res.json({
        isPlaceholder: false,
        roadmap: generatedData
      });

    } catch (error: any) {
      console.error("GBA Build Endpoint Error:", error);
      res.status(500).json({
        error: "Internal Server Error in generating blueprint.",
        details: error.message || error.toString()
      });
    }
  });

  // API endpoint to book a consultation and email/persist the details
  app.post("/api/gba/book", async (req, res) => {
    try {
      const { name, email, company, budget, message, selectedServices } = req.body;

      if (!name || !email) {
        return res.status(400).json({ error: "Name and Email are required fields." });
      }

      const bookingRecord = {
        name,
        email,
        company: company || "N/A",
        budget: budget || "Not specified",
        message: message || "No message left.",
        selectedServices: selectedServices || [],
        timestamp: new Date().toISOString()
      };

      // 1. Persist booking data locally to bookings.json for durable records
      const bookingsFilePath = path.join(process.cwd(), "bookings.json");
      let currentBookings = [];
      try {
        if (fs.existsSync(bookingsFilePath)) {
          const rawData = fs.readFileSync(bookingsFilePath, "utf8");
          currentBookings = JSON.parse(rawData);
        }
      } catch (err) {
        console.error("Error reading current bookings, initializing as empty array:", err);
      }
      
      currentBookings.push(bookingRecord);
      try {
        fs.writeFileSync(bookingsFilePath, JSON.stringify(currentBookings, null, 2), "utf8");
        console.log("Booking successfully persisted to bookings.json");
      } catch (err) {
        console.error("Error saving booking to bookings.json:", err);
      }

      // 2. Attemping notification via Email (SMTP)
      const targetEmail = "genzesofindia+consultation@gmail.com";
      const smtpHost = process.env.SMTP_HOST;
      const smtpPortStr = process.env.SMTP_PORT;
      const smtpUser = process.env.SMTP_USER;
      const smtpPass = process.env.SMTP_PASS;
      const smtpFrom = process.env.SMTP_FROM || smtpUser || "bookings@kineticcollective.com";

      const isSmtpConfigured = !!(smtpHost && smtpUser && smtpPass);

      if (!isSmtpConfigured) {
        // Send success message but notify that SMTP config is missing (will display warning tooltip)
        console.log("SMTP environment variables are not fully configured. Email was not sent but booking is safely stored.");
        return res.json({
          success: true,
          persisted: true,
          emailSent: false,
          warning: "Booking received! Please configure SMTP_HOST, SMTP_USER, and SMTP_PASS in the secrets menu to activate email notifications."
        });
      }

      const smtpPort = smtpPortStr ? parseInt(smtpPortStr, 10) : 587;

      const transporter = nodemailer.createTransport({
        host: smtpHost,
        port: smtpPort,
        secure: smtpPort === 465, // secure for port 465
        auth: {
          user: smtpUser,
          pass: smtpPass
        }
      });

      // Crafting a gorgeous Black, Purple, and White structured layout
      const servicesHtml = bookingRecord.selectedServices.length > 0
        ? bookingRecord.selectedServices.map((s: string) => `<span style="display:inline-block; background-color:#7950c4; color:#ffffff; font-family:monospace; padding:4px 8px; margin:3px; font-weight:bold; font-size:11px; text-transform:uppercase;">${s.toUpperCase()}</span>`).join(" ")
        : `<span style="color:#555555; font-style:italic;">None chosen</span>`;

      const mailOptions = {
        from: `"${bookingRecord.name} (GBA Booking)" <${smtpFrom}>`,
        to: targetEmail,
        replyTo: bookingRecord.email,
        subject: `NEW GBA CONSULTANCY BOOKING: ${bookingRecord.name}`,
        html: `
          <!DOCTYPE html>
          <html>
            <head>
              <meta charset="utf-8">
              <title>New GBA Booking</title>
            </head>
            <body style="margin: 0; padding: 40px; background-color: #000000; font-family: Arial, sans-serif; color: #ffffff;">
              <div style="max-width: 550px; margin: 0 auto; background-color: #ffffff; border: 4px solid #7950c4; padding: 30px; box-shadow: 10px 10px 0px 0px #7950c4; color: #000000;">
                
                <!-- Purple Accent Badge -->
                <div style="background-color: #7950c4; color: #ffffff; display: inline-block; padding: 6px 12px; font-family: monospace; font-weight: bold; font-size: 11px; text-transform: uppercase; margin-bottom: 20px;">
                  GBA CONSULTANCY REQUEST
                </div>

                <h2 style="font-family: Arial, sans-serif; font-size: 24px; font-weight: 900; text-transform: uppercase; margin: 0 0 10px 0; color: #000000;">
                  BOOKING DETAILS
                </h2>
                <p style="margin: 0 0 20px 0; font-size: 14px; color: #555555; line-height: 1.5;">
                  A user has submitted a strategic consultancy request via the kinetic digital portal.
                </p>

                <!-- Divider -->
                <div style="height: 3px; background-color: #7950c4; margin-bottom: 20px;"></div>

                <!-- Structured plain content (White body backdrop for maximum contrast) -->
                <div style="background-color: #ffffff; color: #000000;">
                  
                  <div style="margin-bottom: 16px;">
                    <span style="font-family: monospace; font-size: 11px; color: #7950c4; font-weight: bold; text-transform: uppercase; display: block; margin-bottom: 2px;">CLIENT NAME</span>
                    <span style="font-size: 16px; font-weight: bold; color: #000000;">${bookingRecord.name}</span>
                  </div>

                  <div style="margin-bottom: 16px;">
                    <span style="font-family: monospace; font-size: 11px; color: #7950c4; font-weight: bold; text-transform: uppercase; display: block; margin-bottom: 2px;">EMAIL ADDRESS</span>
                    <a href="mailto:${bookingRecord.email}" style="font-size: 15px; font-weight: bold; color: #7950c4; text-decoration: underline;">${bookingRecord.email}</a>
                  </div>

                  <div style="margin-bottom: 16px;">
                    <span style="font-family: monospace; font-size: 11px; color: #7950c4; font-weight: bold; text-transform: uppercase; display: block; margin-bottom: 2px;">ENTERPRISE / COMPANY</span>
                    <span style="font-size: 15px; font-weight: bold; color: #000000;">${bookingRecord.company}</span>
                  </div>

                  <div style="margin-bottom: 16px;">
                    <span style="font-family: monospace; font-size: 11px; color: #7950c4; font-weight: bold; text-transform: uppercase; display: block; margin-bottom: 2px;">ESTIMATED BUDGET</span>
                    <span style="display: inline-block; background-color: #000000; color: #ffffff; padding: 4px 10px; font-weight: bold; font-size: 12px;">${bookingRecord.budget}</span>
                  </div>

                  <div style="margin-bottom: 16px;">
                    <span style="font-family: monospace; font-size: 11px; color: #7950c4; font-weight: bold; text-transform: uppercase; display: block; margin-bottom: 6px;">CHOSEN SERVICES</span>
                    <div style="margin-top: 2px;">
                      ${servicesHtml}
                    </div>
                  </div>

                  <div>
                    <span style="font-family: monospace; font-size: 11px; color: #7950c4; font-weight: bold; text-transform: uppercase; display: block; margin-bottom: 4px;">MESSAGE NOTES</span>
                    <div style="margin: 4px 0 0 0; padding: 12px; background-color: #f7f7f7; border-left: 4px solid #7950c4; color: #333333; font-size: 14px; line-height: 1.5;">
                      ${bookingRecord.message.replace(/\n/g, "<br/>")}
                    </div>
                  </div>

                </div>

                <!-- Footer stamp -->
                <div style="border-top: 1px solid #eeeeee; padding-top: 15px; margin-top: 25px; font-family: monospace; font-size: 10px; color: #888888; text-align: center;">
                  TIMESTAMP: ${bookingRecord.timestamp} <br/>
                  SYSTEM LOG: GBA_CLIENT_BOOKING_SUCCESS
                </div>

              </div>
            </body>
          </html>
        `
      };

      await transporter.sendMail(mailOptions);
      console.log(`Success: Strategic booking details delivered successfully to ${targetEmail}`);

      return res.json({
        success: true,
        persisted: true,
        emailSent: true
      });

    } catch (error: any) {
      console.error("Booking API Error:", error);
      res.status(500).json({
        error: "Internal Server Error in completing reservation.",
        details: error.message || error.toString()
      });
    }
  });

  // Helper utility function for fallback
  function idx(val: string | undefined) {
    return val;
  }

  // Vite middleware setup
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server started and listening on http://0.0.0.0:${PORT}`);
  });
}

startServer();
