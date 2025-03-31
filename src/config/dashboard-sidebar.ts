import {
  Baby,
  ClipboardList,
  FileText,
  GalleryVerticalEnd,
  Gift,
  History,
  Home,
  ListChecks,
  MapPin,
  Search,
  User,
  UserCheck,
  UserPlus,
  Users,
} from "lucide-react";

export const data = {
  user: {
    name: "shadcn",
    email: "m@example.com",
    avatar: "/avatars/shadcn.jpg",
  },
  teams: [
    {
      name: "Acme Inc",
      logo: GalleryVerticalEnd,
      plan: "Enterprise",
    },
  ],
  navMain: [
    // 📌 PRINCIPAL
    {
      title: "Inicio",
      icon: Home,
      url: "/dashboard",
      roles: ["Administrador", "Empleado"],
    },
    // 📌 USUARIOS Y AFILIADOS
    {
      title: "Usuarios",
      icon: Users,
      isActive: true,
      url: "#",
      items: [
        {
          title: "Lista",
          url: "/dashboard/usuarios",
          icon: User,
          roles: ["Administrador"],
        },
        {
          title: "Afiliados",
          url: "/dashboard/afiliados",
          icon: UserPlus,
          roles: ["Administrador", "Empleado"],
        },
        {
          title: "Hijos",
          url: "/dashboard/hijos",
          icon: Baby,
          roles: ["Administrador", "Empleado"],
        },
      ],
    },
    // 📌 DELEGADOS Y SECTORES
    {
      title: "Delegados",
      icon: UserCheck,
      url: "#",
      items: [
        {
          title: "Consultar",
          url: "/dashboard/delegados",
          icon: Users,
          roles: ["Administrador", "Empleado"],
        },
        {
          title: "Sectores",
          url: "/dashboard/sectores",
          icon: Search,
          roles: ["Administrador", "Empleado"],
        },
      ],
    },
    // 📌 BENEFICIOS Y EVENTOS
    {
      title: "Beneficios",
      icon: Gift,
      url: "#",
      items: [
        {
          title: "Consultar",
          url: "/dashboard/beneficios",
          icon: ListChecks,
          roles: ["Administrador", "Empleado"],
        },
        {
          title: "Historial",
          url: "/dashboard/benefit/history",
          icon: FileText,
          roles: ["Administrador", "Empleado"],
        },
        {
          title: "Entregas",
          url: "/dashboard/beneficios/distribucion",
          icon: ClipboardList,
          roles: ["Administrador", "Empleado"],
        },
      ],
    },
    {
      title: "Eventos",
      icon: History,
      url: "#",
      items: [
        {
          title: "Consultar",
          url: "/dashboard/eventos",
          icon: MapPin,
          roles: ["Administrador", "Empleado"],
        },
      ],
    },

    // **Reportes Básicos**
    {
      title: "Reportes ",
      icon: FileText,
      url: "/dashboard/reportes",
    },
  ],
};
