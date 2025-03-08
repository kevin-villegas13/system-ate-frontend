import { LucideIcon } from "lucide-react";

export interface PageProps {
  title: string;
  buttonText: string;
  buttonIcon: LucideIcon;
  onButtonClick: () => void;
}
