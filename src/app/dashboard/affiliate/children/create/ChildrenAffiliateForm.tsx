import { useState } from "react";
import { toast } from "sonner";
import { Baby } from "lucide-react";
import DelegateDialog from "../../../../../components/shared/DelegateDialog";
import { Button } from "../../../../../components/ui/button";
import { Label } from "@radix-ui/react-dropdown-menu";
import { Input } from "../../../../../components/ui/input";

interface CreateChildFormProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function CreateChildForm({
  isOpen,
  onClose,
}: CreateChildFormProps) {
  const [childData, setChildData] = useState({
    name: "",
    birthDate: "",
    dni: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setChildData({ ...childData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulación de registro
    toast.success("Child added successfully!");
    onClose();
  };

  return (
    <DelegateDialog
      isOpen={isOpen}
      onClose={onClose}
      title="Add New Child"
      description="Enter the details of the child you want to register."
      footerButtons={
        <Button type="submit" form="child-form">
          <Baby className="mr-2 h-4 w-4" />
          Add Child
        </Button>
      }
    >
      <form id="child-form" onSubmit={handleSubmit}>
        <div className="grid gap-4 py-4">
          <div className="grid gap-2">
            <Label>Full Name</Label>
            <Input
              id="child-name"
              name="name"
              value={childData.name}
              onChange={handleChange}
              required
            />
          </div>
          <div className="grid gap-2">
            <Label>Birth Date</Label>
            <Input
              id="child-birthDate"
              name="birthDate"
              type="date"
              value={childData.birthDate}
              onChange={handleChange}
              required
              max={new Date().toISOString().split("T")[0]}
            />
          </div>
          <div className="grid gap-2">
            <Label>DNI</Label>
            <Input
              id="child-dni"
              name="dni"
              value={childData.dni}
              onChange={handleChange}
              required
            />
          </div>
        </div>
      </form>
    </DelegateDialog>
  );
}
