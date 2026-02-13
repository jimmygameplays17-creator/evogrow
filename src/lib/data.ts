import {
  BomItem,
  Comment,
  CompletionStatus,
  Donation,
  FundraUser,
  FundingStatus,
  OrgType,
  Project,
  ProjectType,
  Report
} from "@/lib/types";

const zones = ["Fuentes de las Lomas", "Interlomas", "Naucalpan"];

const currentUserId = "user_me";

const slugify = (input: string) =>
  input
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "")
    .slice(0, 64);

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
    tags: ["Oficial", "Verified", "Tendencia"],
    trendScore: 95,
    donationsLast24h: 12,
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
    tags: ["Oficial", "Verified"],
    trendScore: 70,
    donationsLast24h: 8,
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
    tags: ["Oficial", "Verified", "Nuevo"],
    trendScore: 40,
    donationsLast24h: 2,
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
    tags: ["Nuevo", "Tendencia"],
    trendScore: 65,
    donationsLast24h: 9,
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
    tags: ["Nuevo"],
    trendScore: 50,
    donationsLast24h: 4,
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
    tags: ["Nuevo"],
    trendScore: 45,
    donationsLast24h: 3,
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
    tags: ["Tendencia", "Últimos días"],
    trendScore: 80,
    donationsLast24h: 10,
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
    tags: ["Nuevo"],
    trendScore: 30,
    donationsLast24h: 2,
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
    tags: ["Últimos días"],
    trendScore: 25,
    donationsLast24h: 1,
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
    title: "500,000 USD para iPads para niños",
    zone: "Fuentes de las Lomas",
    coverImage: "https://images.unsplash.com/photo-1513258496099-48168024aec0?auto=format&fit=crop&w=1200&q=80",
    description:
      "Escuelas públicas y zonas vulnerables: recaudación global para entregar iPads y conectividad educativa.",
    organizer: "Equipo Creator",
    orgType: "Business",
    type: "creator",
    tags: ["Creador", "Verified", "Tendencia", "Live"],
    trendScore: 97,
    donationsLast24h: 41,
    creatorName: "MrBeast",
    creatorHandle: "@mrbeast",
    creatorPlatform: "youtube",
    creatorAvatarUrl: "https://images.unsplash.com/photo-1544723795-3fb6469f5b39?auto=format&fit=crop&w=300&q=80",
    creatorBannerUrl: "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?auto=format&fit=crop&w=1200&q=80",
    creatorFollowers: 290000000,
    creatorVideoLink: "https://example.com/video/mrbeast-ipads",
    creatorVerified: true,
    ownerHandle: "mrbeast",
    isLive: false,
    livePlatform: "youtube",
    liveUrl: "https://www.youtube.com/@mrbeast/live",
    verified: true,
    goal: 500000,
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
    title: "250,000 USD para 10,000 cobijas y kits de invierno",
    zone: "Interlomas",
    coverImage: "https://images.unsplash.com/photo-1473116763249-2faaef81ccda?auto=format&fit=crop&w=1200&q=80",
    description:
      "Campaña LIVE para entregar cobijas, termos y kits de invierno a personas en situación de calle.",
    organizer: "Equipo Creator",
    orgType: "Business",
    type: "creator",
    tags: ["Creador", "Verified", "Tendencia", "Live"],
    trendScore: 92,
    donationsLast24h: 33,
    creatorName: "IShowSpeed",
    creatorHandle: "@ishowspeed",
    creatorPlatform: "youtube",
    creatorAvatarUrl: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&w=300&q=80",
    creatorBannerUrl: "https://images.unsplash.com/photo-1516574187841-cb9cc2ca948b?auto=format&fit=crop&w=1200&q=80",
    creatorFollowers: 34000000,
    creatorVideoLink: "https://example.com/video/speed-cobijas",
    creatorVerified: true,
    ownerHandle: "ishowspeed",
    isLive: true,
    livePlatform: "youtube",
    liveUrl: "https://www.youtube.com/@IShowSpeed/live",
    lastLiveAt: new Date(Date.now() - 1000 * 60 * 8).toISOString(),
    pinnedInLive: true,
    verified: true,
    goal: 250000,
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
    title: "150,000 USD para útiles + becas de escuela",
    zone: "Naucalpan",
    coverImage: "https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=1200&q=80",
    description:
      "Con mi comunidad vamos a financiar útiles y becas para estudiantes de secundaria y preparatoria.",
    organizer: "Equipo Creator",
    orgType: "Business",
    type: "creator",
    tags: ["Creador", "Verified", "Nuevo", "Live"],
    trendScore: 85,
    donationsLast24h: 24,
    creatorName: "Westcol",
    creatorHandle: "@westcol",
    creatorPlatform: "twitch",
    creatorAvatarUrl: "https://images.unsplash.com/photo-1552058544-f2b08422138a?auto=format&fit=crop&w=300&q=80",
    creatorBannerUrl: "https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&w=1200&q=80",
    creatorFollowers: 7600000,
    creatorVideoLink: "https://example.com/video/westcol-becas",
    creatorVerified: true,
    ownerHandle: "westcol",
    isLive: true,
    livePlatform: "twitch",
    liveUrl: "https://www.twitch.tv/westcol",
    lastLiveAt: new Date(Date.now() - 1000 * 60 * 12).toISOString(),
    pinnedInLive: true,
    verified: true,
    goal: 150000,
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 2).toISOString(),
    durationDays: 22,
    fundingStatus: "Approved",
    status: "active",
    bom: [],
    updates: [],
    donations: [],
    comments: []
  },
  {
    id: "p13",
    title: "120,000 USD para refugio de animales (comida + veterinario)",
    zone: "Interlomas",
    coverImage: "https://images.unsplash.com/photo-1601758228041-f3b2795255f1?auto=format&fit=crop&w=1200&q=80",
    description:
      "Recaudación para alimento, vacunación y atención veterinaria en un refugio con rescates urgentes.",
    organizer: "Equipo Creator",
    orgType: "Business",
    type: "creator",
    tags: ["Creador", "Verified", "Tendencia", "Live"],
    trendScore: 82,
    donationsLast24h: 19,
    creatorName: "Shifu",
    creatorHandle: "@shifu",
    creatorPlatform: "tiktok",
    creatorAvatarUrl: "https://images.unsplash.com/photo-1463453091185-61582044d556?auto=format&fit=crop&w=300&q=80",
    creatorBannerUrl: "https://images.unsplash.com/photo-1548199973-03cce0bbc87b?auto=format&fit=crop&w=1200&q=80",
    creatorFollowers: 2900000,
    creatorVideoLink: "https://example.com/video/shifu-refugio",
    creatorVerified: true,
    ownerHandle: "shifu",
    isLive: false,
    livePlatform: "tiktok",
    liveUrl: "https://www.tiktok.com/@shifu/live",
    verified: true,
    goal: 120000,
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 1).toISOString(),
    durationDays: 21,
    fundingStatus: "Approved",
    status: "active",
    bom: [],
    updates: [],
    donations: [],
    comments: []
  },
  {
    id: "p14",
    title: "200,000 USD para canchas comunitarias",
    zone: "Naucalpan",
    coverImage: "https://images.unsplash.com/photo-1574629810360-7efbbe195018?auto=format&fit=crop&w=1200&q=80",
    description:
      "(Extra demo) Renovación de canchas y luminarias para torneos juveniles en colonias populares.",
    organizer: "Equipo Creator",
    orgType: "Business",
    type: "creator",
    tags: ["Creador", "Verified", "Live"],
    trendScore: 78,
    donationsLast24h: 14,
    creatorName: "Kai Cenat",
    creatorHandle: "@kaicenat",
    creatorPlatform: "twitch",
    creatorAvatarUrl: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=300&q=80",
    creatorBannerUrl: "https://images.unsplash.com/photo-1517649763962-0c623066013b?auto=format&fit=crop&w=1200&q=80",
    creatorFollowers: 13000000,
    creatorVideoLink: "https://example.com/video/kai-canchas",
    creatorVerified: true,
    ownerHandle: "kaicenat",
    isLive: false,
    livePlatform: "twitch",
    liveUrl: "https://www.twitch.tv/kaicenat",
    verified: true,
    goal: 200000,
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

const seedUsers: FundraUser[] = [
  {
    handle: "mrbeast",
    displayName: "MrBeast",
    bio: "Creator Verified · Retos globales para causas sociales.",
    avatarUrl: "https://images.unsplash.com/photo-1544723795-3fb6469f5b39?auto=format&fit=crop&w=320&q=80"
  },
  {
    handle: "ishowspeed",
    displayName: "IShowSpeed",
    bio: "LIVE fundraising para ayudar rápido y en grande.",
    avatarUrl: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&w=320&q=80"
  },
  {
    handle: "westcol",
    displayName: "Westcol",
    bio: "Comunidad creator enfocada en becas y educación.",
    avatarUrl: "https://images.unsplash.com/photo-1552058544-f2b08422138a?auto=format&fit=crop&w=320&q=80"
  },
  {
    handle: "shifu",
    displayName: "Shifu",
    bio: "Stream solidario para causas de bienestar animal.",
    avatarUrl: "https://images.unsplash.com/photo-1463453091185-61582044d556?auto=format&fit=crop&w=320&q=80"
  },
  {
    handle: "jaime",
    displayName: "Jaime",
    bio: "Comparte tu link de Fundra en chat y recibe aportes en segundos.",
    avatarUrl: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=320&q=80"
  }
];

const ensureProjectSlugs = (items: Project[]) => {
  const used = new Set<string>();
  return items.map((project) => {
    const base = project.slug ? slugify(project.slug) : slugify(project.title);
    let candidate = base || `project-${project.id}`;
    let i = 2;
    while (used.has(candidate)) {
      candidate = `${base}-${i}`;
      i += 1;
    }
    used.add(candidate);
    return { ...project, slug: candidate, ownerHandle: project.ownerHandle ?? undefined };
  });
};

let projects = ensureProjectSlugs(seedProjects);
let reports: Report[] = [];
let topBuildersSeed: { donorId: string; donorName: string; total: number }[] = [];
let payments: Record<string, { donationId: string; status: "pending" | "confirmed"; createdAt: string }> = {};

const createId = (prefix: string) => `${prefix}-${Math.random().toString(36).slice(2, 9)}`;

const seedTopBuilders = () => {
  const userTotal = 45000;
  const higherTotals = Array.from({ length: 68 }, (_, index) => 500000 - index * 6000);
  const lowerTotals = Array.from({ length: 30 }, (_, index) => 44000 - index * 900);

  const higherNames = [
    "Alma Ruiz",
    "Fernando Ortiz",
    "Sofía Torres",
    "Luis Navarro",
    "Mariana Vega",
    "Rafael Domínguez",
    "Paola Reyes",
    "Jorge Campos",
    "Lucía Paredes",
    "Gustavo León",
    "Andrea Morales",
    "Diego Rojas",
    "Valeria Márquez",
    "Héctor Gil",
    "Camila Vives",
    "Ricardo Luna",
    "Renata Cruz",
    "Carlos Ibarra",
    "Isabela Mena",
    "Iván Soto",
    "Natalia Rangel",
    "Bruno Castillo",
    "María Fernanda",
    "Ángel Navarro",
    "Paulina Vega",
    "Joaquín Medina",
    "Fernanda Solís",
    "Leonardo Peña",
    "Karina Silva",
    "Diego Cabrera",
    "Sara Márquez",
    "Hugo Escobar",
    "Andrea Soto",
    "Eduardo Carrillo",
    "Mónica Prieto",
    "Felipe Hernández",
    "Romina Aguilar",
    "Adrián Bautista",
    "Gabriela Muñoz",
    "Miguel Castañeda",
    "Claudia Fuentes",
    "Sebastián Ríos",
    "René Ávila",
    "Paula Ortiz",
    "Patricio Lara",
    "Santiago Ramos",
    "Laura Cid",
    "Ana Belén",
    "Mateo Figueroa",
    "Violeta Ochoa",
    "Tomás Salas",
    "Regina Montes",
    "Oscar Medina",
    "Fabiola León",
    "Julián Carrasco",
    "Patricia Aranda",
    "Cristóbal Vera",
    "Daniela Gil",
    "Esteban Torres",
    "Beatriz Esparza",
    "Mauricio Campos",
    "Nicolás Aguirre",
    "Elena Cárdenas",
    "Samuel Lozano",
    "Pilar Fuentes",
    "Sergio Palacios",
    "Inés Jiménez",
    "Rodrigo Meza"
  ];

  const lowerNames = [
    "Carmen Díaz",
    "Luisa Ponce",
    "Mateo Valencia",
    "Daniela Córdova",
    "Marco Silva",
    "Laura Suárez",
    "Pablo Mendoza",
    "Carolina Guerra",
    "Javier Núñez",
    "Melissa Orozco",
    "Octavio Ramos",
    "Julia Martínez",
    "Fernando Lara",
    "Maribel Sandoval",
    "Raúl Padilla",
    "Victoria Arévalo",
    "Santiago Luna",
    "Elisa Cárdenas",
    "Alfonso Prieto",
    "Hilda Moreno",
    "Gonzalo Iglesias",
    "Ariana Solís",
    "Héctor Salgado",
    "Liliana Trejo",
    "Sofía Calderón",
    "Daniel Ponce",
    "Rosa Delgado",
    "Luisana Pineda",
    "Agustín Vega",
    "Mariano Mora"
  ];

  const higherEntries = higherNames.map((name, index) => ({
    donorId: `donor_high_${index + 1}`,
    donorName: name,
    total: higherTotals[index]
  }));

  const lowerEntries = lowerNames.map((name, index) => ({
    donorId: `donor_low_${index + 1}`,
    donorName: name,
    total: lowerTotals[index]
  }));

  topBuildersSeed = [
    { donorId: "grupo_ima", donorName: "Grupo IMA", total: 9000000 },
    ...higherEntries,
    { donorId: currentUserId, donorName: "Tú", total: userTotal },
    ...lowerEntries
  ].sort((a, b) => b.total - a.total);
};

seedTopBuilders();

const computeGoalProgress = (project: Project) => {
  const total = project.donations
    .filter((donation) => donation.status === "Confirmed")
    .reduce((sum, donation) => sum + donation.amount, 0);
  return total;
};

const resolveGoalAmount = (project: Project) => project.goalAmount ?? project.goal;

const resolveCreatorPledgeAmount = (project: Project) => {
  const goalAmount = resolveGoalAmount(project);
  const pledgeType = project.creatorPledgeType ?? "fixed";
  const pledgeValue = Math.max(0, project.creatorPledgeValue ?? 0);

  if (pledgeType === "percent") {
    const boundedPercent = Math.min(100, pledgeValue);
    return Math.min(goalAmount, (goalAmount * boundedPercent) / 100);
  }

  return Math.min(goalAmount, pledgeValue);
};

const computeFundingBreakdown = (project: Project) => {
  const goalAmount = resolveGoalAmount(project);
  const fundedAmountPublic = computeGoalProgress(project);
  const creatorPledgeAmount = resolveCreatorPledgeAmount(project);
  const fundedAmountTotal = Math.min(goalAmount, creatorPledgeAmount + fundedAmountPublic);
  const remainingAmount = Math.max(0, goalAmount - fundedAmountTotal);

  return {
    goalAmount,
    creatorPledgeAmount,
    fundedAmountPublic,
    fundedAmountTotal,
    remainingAmount
  };
};

const computeDeadline = (project: Project) => {
  const created = new Date(project.createdAt).getTime();
  return new Date(created + project.durationDays * 24 * 60 * 60 * 1000);
};

const applyStatusRules = (project: Project) => {
  const { fundedAmountTotal, goalAmount } = computeFundingBreakdown(project);
  const deadline = computeDeadline(project);
  const now = new Date();

  if (project.fundingStatus === "Rejected") {
    return project;
  }

  if (fundedAmountTotal >= goalAmount) {
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
  const breakdown = computeFundingBreakdown(project);
  project.goalAmount = breakdown.goalAmount;
  project.creatorPledgeAmount = breakdown.creatorPledgeAmount;
  project.fundedAmountPublic = breakdown.fundedAmountPublic;
  project.fundedAmountTotal = breakdown.fundedAmountTotal;
  project.remainingAmount = breakdown.remainingAmount;
  if (typeof project.creatorPledgeValue !== "number") project.creatorPledgeValue = 0;
  if (!project.creatorPledgeType) project.creatorPledgeType = "fixed";
  project.goal = breakdown.goalAmount;
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

export const getProjectBySlug = (slug: string) => {
  const project = projects.find((item) => item.slug === slug);
  return project ? normalizeProject(project) : null;
};

export const getProjectSharePath = (project: Project) => `/p/${project.slug ?? slugify(project.title)}`;

export const getUserByHandle = (handle: string) =>
  seedUsers.find((user) => user.handle.toLowerCase() === handle.toLowerCase()) ?? null;

export const getProjectsByHandle = (handle: string) =>
  projects
    .map(normalizeProject)
    .filter((project) => (project.ownerHandle ?? project.creatorHandle?.replace(/^@/, "")) === handle)
    .sort((a, b) => b.trendScore - a.trendScore);

export const createProject = (
  payload: Omit<
    Project,
    | "id"
    | "fundingStatus"
    | "status"
    | "createdAt"
    | "donations"
    | "updates"
    | "comments"
    | "tags"
    | "trendScore"
    | "donationsLast24h"
  >
) => {
  const defaultTags =
    payload.type === "official"
      ? ["Oficial", "Verified"]
      : payload.type === "creator"
        ? ["Creador", "Verified"]
        : ["Nuevo"];
  const newProject: Project = {
    ...payload,
    id: createId("project"),
    slug: slugify(payload.title),
    goalAmount: payload.goalAmount ?? payload.goal,
    creatorPledgeType: payload.creatorPledgeType ?? "fixed",
    creatorPledgeValue: payload.creatorPledgeValue ?? 0,
    creatorPledgeAmount: payload.creatorPledgeAmount ?? 0,
    fundedAmountPublic: 0,
    fundedAmountTotal: payload.creatorPledgeAmount ?? 0,
    remainingAmount: Math.max(0, (payload.goalAmount ?? payload.goal) - (payload.creatorPledgeAmount ?? 0)),
    tags: defaultTags,
    trendScore: 0,
    donationsLast24h: 0,
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

export const addPendingDonation = (
  projectId: string,
  donation: Omit<Donation, "id" | "status" | "createdAt">
) => {
  const project = projects.find((item) => item.id === projectId);
  if (!project) return null;

  const newDonation: Donation = {
    ...donation,
    id: createId("donation"),
    status: "Pending",
    createdAt: new Date().toISOString()
  };
  project.donations = [newDonation, ...project.donations];
  return newDonation;
};

export const createPayment = (reference: string, donationId: string) => {
  payments[reference] = {
    donationId,
    status: "pending",
    createdAt: new Date().toISOString()
  };
};

export const getPaymentStatus = (reference: string) => payments[reference] ?? null;

export const confirmPayment = (reference: string) => {
  const payment = payments[reference];
  if (!payment) return null;
  if (payment.status === "confirmed") return payment;

  const project = projects.find((item) =>
    item.donations.some((donation) => donation.id === payment.donationId)
  );
  if (!project) return null;
  project.donations = project.donations.map((donation) =>
    donation.id === payment.donationId ? { ...donation, status: "Confirmed" } : donation
  );
  recalcBomFunded(project);
  applyStatusRules(project);
  payments[reference] = { ...payment, status: "confirmed" };
  return payments[reference];
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
  const breakdown = computeFundingBreakdown(project);
  const totalRaised = breakdown.fundedAmountTotal;
  const deadline = computeDeadline(project);
  const daysRemaining = Math.max(0, Math.ceil((deadline.getTime() - Date.now()) / (1000 * 60 * 60 * 24)));
  const progress = Math.min(100, breakdown.goalAmount ? (totalRaised / breakdown.goalAmount) * 100 : 0);
  return {
    totalRaised,
    deadline,
    daysRemaining,
    progress,
    creatorPledgeAmount: breakdown.creatorPledgeAmount,
    fundedAmountPublic: breakdown.fundedAmountPublic,
    fundedAmountTotal: breakdown.fundedAmountTotal,
    remainingAmount: breakdown.remainingAmount,
    goalAmount: breakdown.goalAmount
  };
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

export const getTopBuildersGlobal = (limit = 10) => topBuildersSeed.slice(0, limit);

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
