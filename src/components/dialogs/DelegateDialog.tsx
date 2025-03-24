import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "../ui/dialog";
import { Button } from "../ui/button";
import { DelegateDialogProps } from "./types/dialogs";

export default function DelegateDialog({
  isOpen,
  onClose,
  title,
  description,
  children,
  footerButtons,
}: DelegateDialogProps) {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          {description && <DialogDescription>{description}</DialogDescription>}
        </DialogHeader>
        <div className="py-4">{children}</div>
        <DialogFooter>
          <Button
            variant="outline"
            className="border-black text-black hover:bg-black hover:text-white transition-colors"
            onClick={onClose}
          >
            Cancelar
          </Button>

          {footerButtons}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
