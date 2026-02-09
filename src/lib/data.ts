import { BomItem, Donation, OrgType, Project, ProjectStatus } from "@/lib/types";

const zones = ["Fuentes de las Lomas", "Interlomas", "Naucalpan"];

const seedProjects: Project[] = [
  {
    id: "p1",
    title: "Cancha comunitaria Las Palmas",
    zone: "Fuentes de las Lomas",
    coverImage: "https://images.unsplash.com/photo-1508609349937-5ec4ae374ebf?auto=format&fit=crop&w=1200&q=80",
    description:
      "Rehabilitación integral de la cancha con iluminación, pasto sintético y mobiliario deportivo para uso seguro de la comunidad.",
    organizer: "Colectivo Las Palmas",
    orgType: "Community",
    goal: 280000,
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 8).toISOString(),
    durationDays: 30,
    status: "Approved",
    bom: [
      {
        id: "b1",
        name: "Muros de concreto",
        type: "unit",
        qty: 24,
        unitPrice: 3000,
        fundedAmount: 54000,
        neededByWeek: 2
      },
      {
        id: "b2",
        name: "Postes de luz LED",
        type: "unit",
        qty: 6,
        unitPrice: 5000,
        fundedAmount: 20000,
        neededByWeek: 3
      },
      {
        id: "b3",
        name: "Pasto sintético",
        type: "total",
        totalPrice: 60000,
        fundedAmount: 36000,
        neededByWeek: 4
      },
      {
        id: "b4",
        name: "Porterías",
        type: "unit",
        qty: 2,
        unitPrice: 12000,
        fundedAmount: 12000,
        neededByWeek: 4
      },
      {
        id: "b5",
        name: "Mano de obra",
        type: "flex",
        totalPrice: 40000,
        fundedAmount: 9000,
        neededByWeek: 5
      }
    ],
    updates: [
      {
        id: "u1",
        date: new Date(Date.now() - 1000 * 60 * 60 * 24 * 5).toISOString(),
        title: "Permisos confirmados",
        description: "El municipio autorizó el uso del predio y se liberó la fecha de inicio.",
        image: "https://images.unsplash.com/photo-1504151932400-72d4384f04b3?auto=format&fit=crop&w=1200&q=80"
      },
      {
        id: "u2",
        date: new Date(Date.now() - 1000 * 60 * 60 * 24 * 2).toISOString(),
        title: "Primeros voluntarios listos",
        description: "Se sumaron 15 vecinos para la jornada de preparación del terreno.",
        image: "https://images.unsplash.com/photo-1489515217757-5fd1be406fef?auto=format&fit=crop&w=1200&q=80"
      }
    ],
    donations: [
      {
        id: "d1",
        projectId: "p1",
        itemId: "b1",
        donorName: "María López",
        amount: 6000,
        status: "Confirmed",
        createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 3).toISOString()
      },
      {
        id: "d2",
        projectId: "p1",
        itemId: "b3",
        donorName: "Fer Alvarez",
        amount: 12000,
        status: "Confirmed",
        createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 1).toISOString()
      }
    ]
  },
  {
    id: "p2",
    title: "Bacheo integral Av. Central",
    zone: "Naucalpan",
    coverImage: "https://images.unsplash.com/photo-1465447142348-e9952c393450?auto=format&fit=crop&w=1200&q=80",
    description:
      "Reparación de 18 baches críticos con mezcla asfáltica de alto desempeño y señalización preventiva.",
    organizer: "Obras Naucalpan",
    orgType: "Government",
    goal: 180000,
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 3).toISOString(),
    durationDays: 20,
    status: "Approved",
    bom: [
      {
        id: "b6",
        name: "Mezcla asfáltica",
        type: "total",
        totalPrice: 90000,
        fundedAmount: 40000,
        neededByWeek: 2
      },
      {
        id: "b7",
        name: "Cuadrillas de reparación",
        type: "unit",
        qty: 8,
        unitPrice: 8000,
        fundedAmount: 16000,
        neededByWeek: 3
      },
      {
        id: "b8",
        name: "Señalización temporal",
        type: "flex",
        totalPrice: 20000,
        fundedAmount: 5000,
        neededByWeek: 1
      }
    ],
    updates: [
      {
        id: "u3",
        date: new Date(Date.now() - 1000 * 60 * 60 * 24 * 1).toISOString(),
        title: "Ruta definida",
        description: "Se priorizaron 3 puntos críticos con mayor flujo vehicular.",
        image: "https://images.unsplash.com/photo-1494515843206-f3117d3f51b7?auto=format&fit=crop&w=1200&q=80"
      }
    ],
    donations: [
      {
        id: "d3",
        projectId: "p2",
        itemId: "b6",
        donorName: "Constructora Vía",
        amount: 30000,
        status: "Confirmed",
        createdAt: new Date(Date.now() - 1000 * 60 * 60 * 20).toISOString()
      }
    ]
  },
  {
    id: "p3",
    title: "Parque lineal La Estación",
    zone: "Interlomas",
    coverImage: "https://images.unsplash.com/photo-1471879832106-c7ab9e0cee23?auto=format&fit=crop&w=1200&q=80",
    description:
      "Creación de un parque lineal con luminarias solares, bancas y jardinería para mejorar la seguridad peatonal.",
    organizer: "Empresa VerdeMX",
    orgType: "Business",
    goal: 320000,
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 1).toISOString(),
    durationDays: 25,
    status: "Pending",
    bom: [
      {
        id: "b9",
        name: "Luminarias solares",
        type: "unit",
        qty: 10,
        unitPrice: 9000,
        fundedAmount: 0,
        neededByWeek: 2
      },
      {
        id: "b10",
        name: "Bancas urbanas",
        type: "unit",
        qty: 8,
        unitPrice: 4500,
        fundedAmount: 0,
        neededByWeek: 3
      },
      {
        id: "b11",
        name: "Jardinería y riego",
        type: "total",
        totalPrice: 60000,
        fundedAmount: 0,
        neededByWeek: 4
      }
    ],
    updates: [],
    donations: []
  }
];

let projects = seedProjects;

const createId = (prefix: string) => `${prefix}-${Math.random().toString(36).slice(2, 9)}`;

const computeGoalProgress = (project: Project) => {
  const total = project.donations
    .filter((donation) => donation.status === "Confirmed")
    .reduce((sum, donation) => sum + donation.amount, 0);
  return total;
};

const computeDeadline = (project: Project) => {
  const created = new Date(project.createdAt).getTime();
  return new Date(created + project.durationDays * 24 * 60 * 60 * 1000);
};

const applyStatusRules = (project: Project) => {
  const total = computeGoalProgress(project);
  const deadline = computeDeadline(project);
  const now = new Date();

  if (project.status === "Rejected") {
    return project;
  }

  if (total >= project.goal) {
    project.status = "Funded";
    return project;
  }

  if (now > deadline && project.status === "Approved") {
    project.status = "Failed";
    project.donations = project.donations.map((donation) => ({
      ...donation,
      status: "Refunded"
    }));
  }

  return project;
};

const recalcBomFunded = (project: Project) => {
  const donationTotals: Record<string, number> = {};
  project.donations
    .filter((donation) => donation.status === "Confirmed")
    .forEach((donation) => {
      if (!donation.itemId) return;
      donationTotals[donation.itemId] = (donationTotals[donation.itemId] || 0) + donation.amount;
    });

  project.bom = project.bom.map((item) => ({
    ...item,
    fundedAmount: donationTotals[item.id] || 0
  }));
};

const normalizeProject = (project: Project) => {
  recalcBomFunded(project);
  applyStatusRules(project);
  return project;
};

export const getZones = () => zones;

export const listProjects = (status?: ProjectStatus, zone?: string, orgType?: OrgType) => {
  const filtered = projects
    .map(normalizeProject)
    .filter((project) => (status ? project.status === status : true))
    .filter((project) => (zone ? project.zone === zone : true))
    .filter((project) => (orgType ? project.orgType === orgType : true));
  return filtered;
};

export const getProjectById = (id: string) => {
  const project = projects.find((item) => item.id === id);
  return project ? normalizeProject(project) : null;
};

export const createProject = (payload: Omit<Project, "id" | "status" | "createdAt" | "donations" | "updates">) => {
  const newProject: Project = {
    ...payload,
    id: createId("project"),
    status: "Pending",
    createdAt: new Date().toISOString(),
    donations: [],
    updates: []
  };
  projects = [newProject, ...projects];
  return newProject;
};

export const updateProjectStatus = (id: string, status: ProjectStatus) => {
  projects = projects.map((project) => {
    if (project.id !== id) return project;
    return { ...project, status };
  });
  return getProjectById(id);
};

export const addDonation = (projectId: string, donation: Omit<Donation, "id" | "status" | "createdAt">) => {
  const project = projects.find((item) => item.id === projectId);
  if (!project) return null;

  const normalized = normalizeProject(project);
  if (normalized.status === "Funded" || normalized.status === "Failed" || normalized.status === "Rejected") {
    return { error: "ProjectClosed" } as const;
  }

  const newDonation: Donation = {
    ...donation,
    id: createId("donation"),
    status: "Confirmed",
    createdAt: new Date().toISOString()
  };
  project.donations = [newDonation, ...project.donations];
  recalcBomFunded(project);
  applyStatusRules(project);
  return newDonation;
};

export const computeBomMetrics = (item: BomItem) => {
  if (item.type === "unit") {
    const fundedUnits = Math.min(item.qty ?? 0, Math.floor(item.fundedAmount / (item.unitPrice ?? 1)));
    return {
      fundedUnits,
      totalUnits: item.qty ?? 0,
      fundedPercent: item.qty ? (fundedUnits / item.qty) * 100 : 0
    };
  }

  if (item.type === "total" || item.type === "flex") {
    const total = item.totalPrice ?? 0;
    const fundedPercent = total ? Math.min(100, (item.fundedAmount / total) * 100) : 0;
    return {
      fundedUnits: null,
      totalUnits: null,
      fundedPercent
    };
  }

  return { fundedUnits: null, totalUnits: null, fundedPercent: 0 };
};

export const computeProjectMetrics = (project: Project) => {
  const totalRaised = computeGoalProgress(project);
  const deadline = computeDeadline(project);
  const daysRemaining = Math.max(0, Math.ceil((deadline.getTime() - Date.now()) / (1000 * 60 * 60 * 24)));
  const progress = Math.min(100, (totalRaised / project.goal) * 100);
  return { totalRaised, deadline, daysRemaining, progress };
};

export const getTopBuilders = (project: Project) => {
  const totals: Record<string, number> = {};
  project.donations
    .filter((donation) => donation.status === "Confirmed")
    .forEach((donation) => {
      totals[donation.donorName] = (totals[donation.donorName] || 0) + donation.amount;
    });
  return Object.entries(totals)
    .map(([name, total]) => ({ name, total }))
    .sort((a, b) => b.total - a.total)
    .slice(0, 5);
};

export const getBadgeLabel = (orgType: OrgType) => {
  if (orgType === "Community") return "Community";
  return "Verified";
};
