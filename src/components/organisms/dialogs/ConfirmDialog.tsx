import { ConfirmDialogProps } from "../../../lib/types/modal/dialogs";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "../../ui/alert-dialog";
import { AlertTriangle } from "lucide-react";

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
            <Icon className="w-12 h-12 text-yellow-500 mb-3" />
            <AlertDialogTitle className="text-lg font-semibold">
              {title}
            </AlertDialogTitle>
            <AlertDialogDescription className="text-gray-500 dark:text-gray-300">
              {description}
            </AlertDialogDescription>
          </div>
        </AlertDialogHeader>

        {/* Botones centrados correctamente */}
        <AlertDialogFooter>
          <div className="w-full flex justify-center gap-4 items-center">
            <AlertDialogCancel onClick={onClose}>
              No, cancelar
            </AlertDialogCancel>
            <AlertDialogAction
              onClick={onConfirm}
              className={`${confirmColor} text-white`}
            >
              {confirmLabel}
            </AlertDialogAction>
          </div>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
