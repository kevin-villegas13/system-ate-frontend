import DelegateDialog from "../../../../components/shared/DelegateDialog";
import { Button } from "../../../../components/ui/button";
import { Input } from "../../../../components/ui/input";
import { Label } from "../../../../components/ui/label";
import { UserCheck } from "lucide-react";

interface CrearAfiliadoProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function CreateEventForm({
  isOpen,
  onClose,
}: CrearAfiliadoProps) {
  return (
    <DelegateDialog
      isOpen={isOpen}
      onClose={onClose}
      title="Create New Event"
      description="Add a new event with its details."
      footerButtons={
        <Button type="submit" form="affiliate-form">
          <UserCheck className="mr-2 h-4 w-4" />
          Register Affiliate
        </Button>
      }
    >
      <form id="affiliate-form">
        <div className="grid gap-4 py-4">
          <div className="grid gap-2">
            <Label htmlFor="name">Sector Name</Label>
            <Input id="name" name="name" required />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="code">Sector Code</Label>
            <Input
              id="code"
              name="code"
              required
              maxLength={5}
              placeholder="e.g., ADM, HR, IT"
            />
            <p className="text-xs text-muted-foreground">
              Use a short, unique code (max 5 characters)
            </p>
          </div>
        </div>
      </form>
    </DelegateDialog>
  );
}
