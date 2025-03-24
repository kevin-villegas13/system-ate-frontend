import { LucideIcon } from "lucide-react";
import { ReactNode } from "react";

export interface ConfirmDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title: string;
  description: string;
  confirmLabel?: string;
  icon?: LucideIcon;
  confirmColor?: string;
}

export interface DelegateDialogProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  className: string;
  description?: string;
  children: ReactNode;
  footerButtons?: ReactNode;
}
