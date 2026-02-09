import {
  BomItem,
  Comment,
  CompletionStatus,
  Donation,
  FundingStatus,
  OrgType,
  Project,
  ProjectType,
  Report
} from "@/lib/types";

const zones = ["Fuentes de las Lomas", "Interlomas", "Naucalpan"];

const currentUserId = "user_me";

const seedProjects: Project[] = [
  {
    id: "p1",
    title: "Cancha pública Las Palmas",
    zone: "Fuentes de las Lomas",
    coverImage: "https://images.unsplash.com/photo-1508609349937-5ec4ae374ebf?auto=format&fit=crop&w=1200&q=80",
    description:
      "Rehabilitación integral de la cancha con iluminación, pasto sintético y mobiliario deportivo para uso seguro de la comunidad.",
    organizer: "Municipio de Huixquilucan",
    orgType: "Government",
    type: "official",
    verificationDoc: "Oficio MUNI-2024-089",
    goal: 280000,
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 8).toISOString(),
    durationDays: 30,
    fundingStatus: "Approved",
    status: "active",
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
        donorId: "donor_maria",
        donorName: "María López",
        amount: 6000,
        status: "Confirmed",
        createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 3).toISOString()
      },
      {
        id: "d2",
        projectId: "p1",
        itemId: "b3",
        donorId: "donor_fer",
        donorName: "Fer Alvarez",
        amount: 12000,
        status: "Confirmed",
        createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 1).toISOString()
      },
      {
        id: "d4",
        projectId: "p1",
        itemId: "b2",
        donorId: "donor_grupo_ima",
        donorName: "Grupo IMA",
        amount: 60000,
        status: "Confirmed",
        createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 2).toISOString()
      },
      {
        id: "d5",
        projectId: "p1",
        itemId: "b4",
        donorId: "donor_erpp",
        donorName: "ERPP",
        amount: 25000,
        status: "Confirmed",
        createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 2).toISOString()
      },
      {
        id: "d6",
        projectId: "p1",
        itemId: "b5",
        donorId: currentUserId,
        donorName: "Tu cuenta",
        amount: 2600,
        status: "Confirmed",
        createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 1).toISOString()
      }
    ],
    comments: [
      {
        id: "c1",
        projectId: "p1",
        name: "Julio P.",
        text: "Buenísimo ver transparencia en materiales. ¡Éxito!",
        createdAt: new Date(Date.now() - 1000 * 60 * 60 * 12).toISOString()
      },
      {
        id: "c2",
        projectId: "p1",
        name: "Ana Q.",
        text: "¿Cuándo empiezan las obras? Me gustaría ayudar.",
        createdAt: new Date(Date.now() - 1000 * 60 * 60 * 3).toISOString()
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
    type: "official",
    verificationDoc: "Dictamen 2024-INFRA-33",
    goal: 180000,
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 3).toISOString(),
    durationDays: 20,
    fundingStatus: "Approved",
    status: "completed",
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
        donorId: "donor_grupo_ima",
        donorName: "Grupo IMA",
        amount: 30000,
        status: "Confirmed",
        createdAt: new Date(Date.now() - 1000 * 60 * 60 * 20).toISOString()
      },
      {
        id: "d7",
        projectId: "p2",
        itemId: "b7",
        donorId: "donor_grupo_ima",
        donorName: "Grupo IMA",
        amount: 40000,
        status: "Confirmed",
        createdAt: new Date(Date.now() - 1000 * 60 * 60 * 18).toISOString()
      },
      {
        id: "d8",
        projectId: "p2",
        itemId: "b8",
        donorId: "donor_erpp",
        donorName: "ERPP",
        amount: 20000,
        status: "Confirmed",
        createdAt: new Date(Date.now() - 1000 * 60 * 60 * 16).toISOString()
      },
      {
        id: "d9",
        projectId: "p2",
        itemId: "b7",
        donorId: currentUserId,
        donorName: "Tu cuenta",
        amount: 2000,
        status: "Confirmed",
        createdAt: new Date(Date.now() - 1000 * 60 * 60 * 12).toISOString()
      }
    ],
    comments: [
      {
        id: "c3",
        projectId: "p2",
        name: "Majo",
        text: "Se nota la mejora en la avenida. Gracias.",
        createdAt: new Date(Date.now() - 1000 * 60 * 60 * 8).toISOString()
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
    type: "official",
    verificationDoc: "Registro CSR-VERDEMX-2024",
    goal: 320000,
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 1).toISOString(),
    durationDays: 25,
    fundingStatus: "Pending",
    status: "active",
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
    donations: [],
    comments: []
  },
  {
    id: "p4",
    title: "Rocky necesita tratamiento",
    zone: "Naucalpan",
    coverImage: "https://images.unsplash.com/photo-1517849845537-4d257902454a?auto=format&fit=crop&w=1200&q=80",
    description: "Mi perrito necesita estudios y tratamiento urgente. Gracias por cualquier apoyo.",
    organizer: "Laura R.",
    orgType: "Community",
    type: "community",
    category: "Mascotas",
    goal: 50000,
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 4).toISOString(),
    durationDays: 21,
    fundingStatus: "Approved",
    status: "active",
    bom: [],
    updates: [],
    donations: [],
    comments: []
  },
  {
    id: "p5",
    title: "Inscripción de escuela",
    zone: "Fuentes de las Lomas",
    coverImage: "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?auto=format&fit=crop&w=1200&q=80",
    description: "Necesito completar mi inscripción este mes para no perder el semestre.",
    organizer: "Eduardo M.",
    orgType: "Community",
    type: "community",
    category: "Escuela",
    goal: 12000,
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 6).toISOString(),
    durationDays: 20,
    fundingStatus: "Approved",
    status: "active",
    bom: [],
    updates: [],
    donations: [],
    comments: []
  },
  {
    id: "p6",
    title: "Arreglo mi cuarto",
    zone: "Interlomas",
    coverImage: "https://images.unsplash.com/photo-1505691938895-1758d7feb511?auto=format&fit=crop&w=1200&q=80",
    description: "Necesito pintura, un escritorio y arreglar la instalación eléctrica.",
    organizer: "Sofi G.",
    orgType: "Community",
    type: "community",
    category: "Hogar",
    goal: 8500,
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 2).toISOString(),
    durationDays: 18,
    fundingStatus: "Approved",
    status: "active",
    bom: [],
    updates: [],
    donations: [],
    comments: []
  },
  {
    id: "p7",
    title: "Reparo mi bici",
    zone: "Naucalpan",
    coverImage: "https://images.unsplash.com/photo-1485965120184-e220f721d03e?auto=format&fit=crop&w=1200&q=80",
    description: "Uso la bici para trabajar y necesito reparar frenos y llanta trasera.",
    organizer: "Carlos T.",
    orgType: "Community",
    type: "community",
    category: "Transporte",
    goal: 1200,
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 1).toISOString(),
    durationDays: 14,
    fundingStatus: "Approved",
    status: "active",
    bom: [],
    updates: [],
    donations: [],
    comments: []
  },
  {
    id: "p8",
    title: "Apoyo para comprar útiles",
    zone: "Fuentes de las Lomas",
    coverImage: "https://images.unsplash.com/photo-1491841550275-ad7854e35ca6?auto=format&fit=crop&w=1200&q=80",
    description: "Me faltan cuadernos y materiales básicos para este semestre.",
    organizer: "Daniela P.",
    orgType: "Community",
    type: "community",
    category: "Escuela",
    goal: 900,
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 10).toISOString(),
    durationDays: 12,
    fundingStatus: "Approved",
    status: "active",
    bom: [],
    updates: [],
    donations: [],
    comments: []
  },
  {
    id: "p9",
    title: "500 para mi vape",
    zone: "Interlomas",
    coverImage: "https://images.unsplash.com/photo-1523475472560-d2df97ec485c?auto=format&fit=crop&w=1200&q=80",
    description: "Estoy juntando para reemplazar mi vape. Gracias por ayudarme a completar la meta.",
    organizer: "Mike",
    orgType: "Community",
    type: "community",
    category: "Personal",
    goal: 500,
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 6).toISOString(),
    durationDays: 7,
    fundingStatus: "Approved",
    status: "active",
    bom: [],
    updates: [],
    donations: [],
    comments: []
  },
  {
    id: "p10",
    title: "Reto solidario para refugio de animales",
    zone: "Fuentes de las Lomas",
    coverImage: "https://images.unsplash.com/photo-1548199973-03cce0bbc87b?auto=format&fit=crop&w=1200&q=80",
    description: "Reto de donación con mi comunidad para apoyar al refugio local.",
    organizer: "Equipo Creator",
    orgType: "Business",
    type: "creator",
    creatorName: "Luna Torres",
    creatorFollowers: 240000,
    creatorVideoLink: "https://example.com/video/luna-reto",
    verified: true,
    goal: 100000,
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 5).toISOString(),
    durationDays: 20,
    fundingStatus: "Approved",
    status: "active",
    bom: [],
    updates: [],
    donations: [],
    comments: []
  },
  {
    id: "p11",
    title: "Entradas para seguidores",
    zone: "Interlomas",
    coverImage: "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=1200&q=80",
    description: "Quiero apoyar entradas solidarias y sumar donaciones con mis seguidores.",
    organizer: "Equipo Creator",
    orgType: "Business",
    type: "creator",
    creatorName: "Diego Play",
    creatorFollowers: 180000,
    creatorVideoLink: "https://example.com/video/diego-entradas",
    verified: true,
    goal: 80000,
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 3).toISOString(),
    durationDays: 18,
    fundingStatus: "Approved",
    status: "active",
    bom: [],
    updates: [],
    donations: [],
    comments: []
  },
  {
    id: "p12",
    title: "Regalos de Navidad",
    zone: "Naucalpan",
    coverImage: "https://images.unsplash.com/photo-1512389142860-9c449e58a543?auto=format&fit=crop&w=1200&q=80",
    description: "Campaña para comprar regalos y alimentos para familias en Navidad.",
    organizer: "Equipo Creator",
    orgType: "Business",
    type: "creator",
    creatorName: "Marina Vlogs",
    creatorFollowers: 320000,
    creatorVideoLink: "https://example.com/video/marina-navidad",
    verified: true,
    goal: 60000,
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 2).toISOString(),
    durationDays: 22,
    fundingStatus: "Approved",
    status: "active",
    bom: [],
    updates: [],
    donations: [],
    comments: []
  }
];

let projects = seedProjects;
let reports: Report[] = [];

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

  if (project.fundingStatus === "Rejected") {
    return project;
  }

  if (total >= project.goal) {
    project.fundingStatus = "Funded";
    return project;
  }

  if (now > deadline && project.fundingStatus === "Approved") {
    project.fundingStatus = "Failed";
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

export const listProjects = (
  fundingStatus?: FundingStatus,
  zone?: string,
  orgType?: OrgType,
  type?: ProjectType,
  completionStatus?: CompletionStatus
) => {
  const filtered = projects
    .map(normalizeProject)
    .filter((project) => (fundingStatus ? project.fundingStatus === fundingStatus : true))
    .filter((project) => (zone ? project.zone === zone : true))
    .filter((project) => (orgType ? project.orgType === orgType : true))
    .filter((project) => (type ? project.type === type : true))
    .filter((project) => (completionStatus ? project.status === completionStatus : true));
  return filtered;
};

export const getProjectById = (id: string) => {
  const project = projects.find((item) => item.id === id);
  return project ? normalizeProject(project) : null;
};

export const createProject = (
  payload: Omit<Project, "id" | "fundingStatus" | "status" | "createdAt" | "donations" | "updates" | "comments">
) => {
  const newProject: Project = {
    ...payload,
    id: createId("project"),
    fundingStatus: "Pending",
    status: "active",
    createdAt: new Date().toISOString(),
    donations: [],
    updates: [],
    comments: []
  };
  projects = [newProject, ...projects];
  return newProject;
};

export const updateProjectStatus = (id: string, status: FundingStatus) => {
  projects = projects.map((project) => {
    if (project.id !== id) return project;
    return { ...project, fundingStatus: status };
  });
  return getProjectById(id);
};

export const addDonation = (projectId: string, donation: Omit<Donation, "id" | "status" | "createdAt">) => {
  const project = projects.find((item) => item.id === projectId);
  if (!project) return null;

  const normalized = normalizeProject(project);
  if (
    normalized.fundingStatus === "Funded" ||
    normalized.fundingStatus === "Failed" ||
    normalized.fundingStatus === "Rejected" ||
    normalized.status === "completed"
  ) {
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

export const addComment = (projectId: string, name: string, text: string) => {
  const project = projects.find((item) => item.id === projectId);
  if (!project) return null;
  const newComment: Comment = {
    id: createId("comment"),
    projectId,
    name,
    text,
    createdAt: new Date().toISOString()
  };
  project.comments = [newComment, ...project.comments];
  return newComment;
};

export const addReport = (projectId: string, reason?: string) => {
  const report: Report = {
    id: createId("report"),
    projectId,
    reason,
    createdAt: new Date().toISOString()
  };
  reports = [report, ...reports];
  return report;
};

export const getReports = () => reports;

export const getProfileSummary = (userId: string) => {
  const allProjects = projects.map(normalizeProject);
  const donations = allProjects.flatMap((project) => project.donations);
  const totalDonated = donations
    .filter((donation) => donation.status === "Confirmed" && donation.donorId === userId)
    .reduce((sum, donation) => sum + donation.amount, 0);
  const projectsDonated = allProjects.filter((project) =>
    project.donations.some((donation) => donation.donorId === userId)
  );
  return { totalDonated, projectsDonated };
};

const computeDonorTotals = (donations: Donation[]) => {
  const totals: Record<string, { donorId: string; donorName: string; total: number }> = {};
  donations
    .filter((donation) => donation.status === "Confirmed")
    .forEach((donation) => {
      const key = donation.donorId;
      if (!totals[key]) {
        totals[key] = { donorId: donation.donorId, donorName: donation.donorName, total: 0 };
      }
      totals[key].total += donation.amount;
    });
  return Object.values(totals);
};

export const getTopBuilders = (project: Project) => {
  return computeDonorTotals(project.donations)
    .map((entry) => ({ name: entry.donorName, total: entry.total }))
    .sort((a, b) => b.total - a.total)
    .slice(0, 5);
};

export const getTopBuildersGlobal = (limit = 10) => {
  const allDonations = projects.flatMap((project) => project.donations);
  return computeDonorTotals(allDonations)
    .map((entry) => ({ donorId: entry.donorId, donorName: entry.donorName, total: entry.total }))
    .sort((a, b) => b.total - a.total)
    .slice(0, limit);
};

export const getTopBuildersByProject = (projectId: string, limit = 10) => {
  const project = projects.find((item) => item.id === projectId);
  if (!project) return [];
  return computeDonorTotals(project.donations)
    .map((entry) => ({ donorId: entry.donorId, donorName: entry.donorName, total: entry.total }))
    .sort((a, b) => b.total - a.total)
    .slice(0, limit);
};

export const getMyRankGlobal = (userId: string) => {
  const leaderboard = getTopBuildersGlobal(100);
  const index = leaderboard.findIndex((entry) => entry.donorId === userId);
  if (index === -1) {
    return { rank: null, total: 0 };
  }
  return { rank: index + 1, total: leaderboard[index].total };
};

export const getCurrentUserId = () => currentUserId;
