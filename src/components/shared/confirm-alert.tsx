import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "../../components/ui/alert-dialog";
import { LucideIcon, Trash2, Ban, Pencil, AlertTriangle } from "lucide-react";

interface ConfirmDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title: string;
  description: string;
  confirmLabel?: string;
  icon?: LucideIcon;
  confirmColor?: string;
}

export default function ConfirmDialog({
  isOpen,
  onClose,
  onConfirm,
  title,
  description,
  confirmLabel = "Sí, confirmar",
  icon: Icon = AlertTriangle,
  confirmColor = "bg-red-600 hover:bg-red-700",
}: ConfirmDialogProps) {
  return (
    <AlertDialog open={isOpen} onOpenChange={onClose}>
      <AlertDialogContent className="max-w-sm text-center">
        <AlertDialogHeader>
          <div className="flex flex-col items-center">
            <Icon className="w-12 h-12 text-gray-400 dark:text-gray-500 mb-3" />
            <AlertDialogTitle className="text-lg font-semibold">
              {title}
            </AlertDialogTitle>
            <AlertDialogDescription className="text-gray-500 dark:text-gray-300">
              {description}
            </AlertDialogDescription>
          </div>
        </AlertDialogHeader>

        <AlertDialogFooter className="flex justify-center gap-4">
          <AlertDialogCancel onClick={onClose}>No, cancelar</AlertDialogCancel>
          <AlertDialogAction
            onClick={onConfirm}
            className={`${confirmColor} text-white`}
          >
            {confirmLabel}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
