import {
  Baby,
  ClipboardCheck,
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
          roles: ["Administrador", "Empleado"],
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
          title: "Beneficios",
          url: "/dashboard/benefit/assign/delegate",
          icon: ClipboardCheck,
          roles: ["Administrador"],
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
          url: "/dashboard/benefit",
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
          url: "/dashboard/benefit/delivery",
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

    // // **Reportes Básicos**
    // {
    //   title: "Reportes Básicos",
    //   icon: FileText,
    //   url: "#",
    //   items: [
    //     {
    //       title: "Afiliados y Beneficios",
    //       url: "/dashboard/report/affiliates-benefits",
    //       roles: ["Administrador"],
    //     },
    //     {
    //       title: "Entregas Realizadas",
    //       url: "/dashboard/report/deliveries",
    //       roles: ["Administrador"],
    //     },
    //     {
    //       title: "Beneficios Disponibles",
    //       url: "/dashboard/report/benefits-available",
    //       roles: ["Administrador"],
    //     },
    //     {
    //       title: "Beneficios Agotados",
    //       url: "/dashboard/report/benefits-exhausted",
    //       roles: ["Administrador"],
    //     },
    //   ],
    // },

    // // **Informes Detallados**
    // {
    //   title: "Informes Detallados",
    //   icon: FileText,
    //   url: "#",
    //   items: [
    //     {
    //       title: "Afiliados y Beneficios Asignados",
    //       url: "/dashboard/report/detailed/affiliates-benefits",
    //       roles: ["Administrador"],
    //     },
    //     {
    //       title: "Inventario de Beneficios",
    //       url: "/dashboard/report/detailed/benefit-inventory",
    //       roles: ["Administrador"],
    //     },
    //     {
    //       title: "Delegados y Actividad",
    //       url: "/dashboard/report/detailed/delegates-status",
    //       roles: ["Administrador"],
    //     },
    //     {
    //       title: "Registro de Eventos",
    //       url: "/dashboard/report/detailed/events-record",
    //       roles: ["Administrador"],
    //     },
    //   ],
    // },
  ],
};
