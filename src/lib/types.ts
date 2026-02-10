export type FundingStatus = "Pending" | "Approved" | "Rejected" | "Failed" | "Funded";
export type CompletionStatus = "active" | "completed";
export type OrgType = "Community" | "Business" | "Government";
export type BomType = "unit" | "total" | "flex";
export type ProjectType = "official" | "community" | "creator";
export type CommunityCategory = "Personal" | "Mascotas" | "Escuela" | "Hogar" | "Transporte" | "Otro";

export interface BomItem {
  id: string;
  name: string;
  type: BomType;
  qty?: number;
  unitPrice?: number;
  totalPrice?: number;
  fundedAmount: number;
  neededByWeek?: number;
}

export interface ProjectUpdate {
  id: string;
  date: string;
  title: string;
  description: string;
  image: string;
}

export interface Donation {
  id: string;
  projectId: string;
  itemId?: string;
  donorId: string;
  donorName: string;
  amount: number;
  status: "Pending" | "Confirmed" | "Refunded";
  createdAt: string;
  paymentMethod?: string;
  reference?: string;
}

export interface Comment {
  id: string;
  projectId: string;
  name: string;
  text: string;
  createdAt: string;
}

export interface Report {
  id: string;
  projectId: string;
  reason?: string;
  createdAt: string;
}

export interface Project {
  id: string;
  slug?: string;
  title: string;
  zone: string;
  coverImage: string;
  description: string;
  organizer: string;
  orgType: OrgType;
  type: ProjectType;
  tags: string[];
  trendScore: number;
  donationsLast24h: number;
  verificationDoc?: string;
  category?: CommunityCategory;
  creatorName?: string;
  creatorHandle?: string;
  creatorPlatform?: "twitch" | "youtube" | "tiktok";
  creatorAvatarUrl?: string;
  creatorBannerUrl?: string;
  creatorVerified?: boolean;
  isLive?: boolean;
  livePlatform?: "twitch" | "youtube" | "kick" | "tiktok" | "x" | "instagram" | "other";
  liveUrl?: string;
  lastLiveAt?: string;
  pinnedInLive?: boolean;
  ownerHandle?: string;
  creatorFollowers?: number;
  creatorVideoLink?: string;
  verified?: boolean;
  goal: number;
  createdAt: string;
  durationDays: number;
  fundingStatus: FundingStatus;
  status: CompletionStatus;
  bom: BomItem[];
  updates: ProjectUpdate[];
  donations: Donation[];
  comments: Comment[];
}

export interface FundraUser {
  handle: string;
  displayName: string;
  bio?: string;
  avatarUrl?: string;
}
