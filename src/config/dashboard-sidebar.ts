import {
  Archive,
  Baby,
  BookOpen,
  Bot,
  Building,
  ClipboardCheck,
  ClipboardList,
  FileText,
  GalleryVerticalEnd,
  Gift,
  History,
  ListChecks,
  MapPin,
  SquareTerminal,
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
    {
      title: "Gestión de Afiliados",
      icon: Users,
      isActive: true,
      url: "#",
      items: [
        {
          title: "Crear Afiliado",
          url: "/dashboard/affiliate",
          icon: UserPlus,
        },
        {
          title: "Hijos",
          url: "#",
          icon: Baby,
        },
        {
          title: "Sectores",
          url: "#",
          icon: MapPin,
        },
      ],
    },
    {
      title: "Delegados",
      url: "#",
      icon: UserCheck,
      items: [
        {
          title: "Afiliados Asignados",
          url: "#",
          icon: UserPlus,
        },
        {
          title: "Sectores a Cargo",
          url: "#",
          icon: Building,
        },
      ],
    },
    {
      title: "Beneficios",
      url: "#",
      icon: Gift,
      items: [
        {
          title: "Beneficios Otorgados",
          url: "#",
          icon: ClipboardCheck,
        },
        {
          title: "Estado del Beneficio",
          url: "#",
          icon: ListChecks,
        },
      ],
    },
    {
      title: "Historial",
      url: "#",
      icon: History,
      items: [
        {
          title: "Historial de Afiliados",
          url: "#",
          icon: FileText,
        },
        {
          title: "Historial de Beneficios",
          url: "#",
          icon: ClipboardList,
        },
        {
          title: "Historial de Delegados",
          url: "#",
          icon: Archive,
        },
      ],
    },
  ],
};
