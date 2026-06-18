export interface BrandBlueprint {
  brandValues: string[];
  logoConcept: string;
  persona: string;
}

export interface MarketingCampaign {
  campaignTitle: string;
  socialAdConcepts: string[];
  budgetPriority: string;
}

export interface StaffingBrief {
  rolesToHire: string[];
  briefingTemplate: string;
}

export interface AcquisitionPlan {
  targetPoints: string[];
  retentionIdea: string;
}

export interface ExpansionStrategy {
  launchGeoPlan: string;
  networkStrategy: string;
}

export interface GBABlueprint {
  branding: BrandBlueprint;
  marketing: MarketingCampaign;
  staffing: StaffingBrief;
  acquisition: AcquisitionPlan;
  expansion: ExpansionStrategy;
}

export interface CompanyInput {
  businessName: string;
  industry: string;
  description: string;
  targetAudience: string;
  chosenServices: string[];
}
