import { LucideIcon } from "lucide-react";

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