import {
  Baby,
  ClipboardCheck,
  ClipboardList,
  FileText,
  GalleryVerticalEnd,
  Gift,
  History,
  ListChecks,
  MapPin,
  ShieldCheck,
  UserCheck,
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
    {
      title: "Gestión de Usuarios",
      icon: Users,
      isActive: true,
      url: "#",
      items: [
        {
          title: "Lista de Usuarios",
          url: "/dashboard/users",
          icon: Users,
          roles: ["Administrador", "Empleado"],
        },
      ],
    },

    // Gestión de Afiliados
    {
      title: "Gestión de Afiliados",
      icon: Users,
      isActive: true,
      url: "#",
      items: [
        {
          title: "Consultar Afiliados",
          url: "/dashboard/affiliate",
          icon: Users,
          roles: ["Administrador", "Empleado"],
        },
        {
          title: "Hijos de Afiliados",
          url: "/dashboard/affiliate/children",
          icon: Baby,
          roles: ["Administrador", "Empleado"],
        },
      ],
    },
    // Gestión de Delegados
    {
      title: "Gestión de Delegados",
      icon: UserCheck,
      url: "#",
      items: [
        {
          title: "Consultar Delegados",
          url: "/dashboard/delegate",
          icon: Users,
          roles: ["Administrador", "Empleado"],
        },
        {
          title: "Beneficios Asignados",
          url: "/dashboard/benefit/assign/delegate",
          icon: ClipboardCheck,
          roles: ["Administrador"],
        },
      ],
    },
    // Gestión de Beneficios
    {
      title: "Gestión de Beneficios",
      icon: Gift,
      url: "#",
      items: [
        {
          title: "Consultar Beneficios",
          url: "/dashboard/benefit",
          icon: ListChecks,
          roles: ["Administrador", "Empleado"],
        },
        {
          title: "Historial de Beneficios",
          url: "/dashboard/benefit/history",
          icon: FileText,
          roles: ["Administrador", "Empleado"],
        },
        {
          title: "Consultar Entregas",
          url: "/dashboard/benefit/delivery",
          icon: ClipboardList,
          roles: ["Administrador", "Empleado"],
        },
      ],
    },
    // Gestión de Eventos
    {
      title: "Gestión de Eventos",
      icon: History,
      url: "#",
      items: [
        {
          title: "Consultar Eventos",
          url: "/dashboard/event",
          icon: MapPin,
          roles: ["Administrador", "Empleado"],
        },
      ],
    },
    // **Gestión de Usuarios**
    {
      title: "Gestión de Usuarios",
      icon: UserCheck,
      url: "#",
      items: [
        {
          title: "Consultar Usuarios",
          url: "/dashboard/user",
          icon: Users,
          roles: ["Administrador"],
        },
      ],
    },
    // **Reportes Básicos**
    {
      title: "Reportes Básicos",
      icon: FileText,
      url: "#",
      items: [
        {
          title: "Afiliados y Beneficios",
          url: "/dashboard/report/affiliates-benefits",
          roles: ["Administrador"],
        },
        {
          title: "Entregas Realizadas",
          url: "/dashboard/report/deliveries",
          roles: ["Administrador"],
        },
        {
          title: "Beneficios Disponibles",
          url: "/dashboard/report/benefits-available",
          roles: ["Administrador"],
        },
        {
          title: "Beneficios Agotados",
          url: "/dashboard/report/benefits-exhausted",
          roles: ["Administrador"],
        },
      ],
    },

    // **Informes Detallados**
    {
      title: "Informes Detallados",
      icon: FileText,
      url: "#",
      items: [
        {
          title: "Afiliados y Beneficios Asignados",
          url: "/dashboard/report/detailed/affiliates-benefits",
          roles: ["Administrador"],
        },
        {
          title: "Inventario de Beneficios",
          url: "/dashboard/report/detailed/benefit-inventory",
          roles: ["Administrador"],
        },
        {
          title: "Delegados y Actividad",
          url: "/dashboard/report/detailed/delegates-status",
          roles: ["Administrador"],
        },
        {
          title: "Registro de Eventos",
          url: "/dashboard/report/detailed/events-record",
          roles: ["Administrador"],
        },
      ],
    },
  ],
};
