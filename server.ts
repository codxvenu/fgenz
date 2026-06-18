import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI, Type } from "@google/genai";
import dotenv from "dotenv";

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
