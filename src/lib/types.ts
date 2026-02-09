export type ProjectStatus = "Pending" | "Approved" | "Rejected" | "Failed" | "Funded";
export type OrgType = "Community" | "Business" | "Government";
export type BomType = "unit" | "total" | "flex";
export type ProjectType = "official" | "community";
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
  status: "Confirmed" | "Refunded";
  createdAt: string;
}

export interface Project {
  id: string;
  title: string;
  zone: string;
  coverImage: string;
  description: string;
  organizer: string;
  orgType: OrgType;
  type: ProjectType;
  verificationDoc?: string;
  category?: CommunityCategory;
  goal: number;
  createdAt: string;
  durationDays: number;
  status: ProjectStatus;
  bom: BomItem[];
  updates: ProjectUpdate[];
  donations: Donation[];
}
