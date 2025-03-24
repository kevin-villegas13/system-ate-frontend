import DelegateDialog from "../../../../components/organisms/dialogs/DelegateDialog";
import { Button } from "../../../../components/ui/button";
import { Input } from "../../../../components/ui/input";
import { Label } from "../../../../components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../../../components/ui/select";
import { UserCheck } from "lucide-react";

interface CreateDelegateProps {
  isOpen: boolean;
  onClose: () => void;
}

const mockSectors = [
  { id: 1, name: "Finance" },
  { id: 2, name: "Human Resources" },
  { id: 3, name: "IT Department" },
];

export default function CreateDelegatesForm({
  isOpen,
  onClose,
}: CreateDelegateProps) {
  return (
    <DelegateDialog
      className="max-w-lg"
      isOpen={isOpen}
      onClose={onClose}
      title="Register New Delegate"
      description="Fill in the details below to register a new delegate."
      footerButtons={
        <Button type="submit" form="delegate-form">
          <UserCheck className="mr-2 h-4 w-4" />
          Register Delegate
        </Button>
      }
    >
      <form id="delegate-form">
        <div className="grid gap-4 py-4">
          <div className="grid gap-2">
            <Label htmlFor="name">Full Name</Label>
            <Input id="name" name="name" required />
          </div>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div className="grid gap-2">
              <Label htmlFor="dni">DNI</Label>
              <Input id="dni" name="dni" required />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="sector">Sector</Label>
              <Select name="sector" defaultValue="1">
                <SelectTrigger id="sector">
                  <SelectValue placeholder="Select sector" />
                </SelectTrigger>
                <SelectContent>
                  {mockSectors.map((sector) => (
                    <SelectItem key={sector.id} value={sector.id.toString()}>
                      {sector.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div className="grid gap-2">
                <Label htmlFor="phone">Phone Number</Label>
                <Input id="phone" name="phone" type="tel" />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="email">Email</Label>
                <Input id="email" name="email" type="email" />
              </div>
            </div>
          </div>
        </div>
      </form>
    </DelegateDialog>
  );
}
