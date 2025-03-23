import { LucideIcon } from "lucide-react";
import { ElementType } from "react";

export interface NavMainProps {
  items: NavItem[];
}

interface NavItem {
  title: string;
  url: string;
  icon?: LucideIcon;
  isActive?: boolean;
  items?: NavItem[];
}

export interface SidebarMenuLinkProps {
  title: string;
  icon?: ElementType;
  url?: string;
}
