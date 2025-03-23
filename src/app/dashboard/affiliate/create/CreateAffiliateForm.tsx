import { useState } from "react";
import { toast } from "sonner";
import DelegateDialog from "../../../../components/shared/DelegateDialog";
import { Button } from "../../../../components/ui/button";
import { Input } from "../../../../components/ui/input";
import { Label } from "../../../../components/ui/label";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "../../../../components/ui/tabs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../../../components/ui/select";
import { Checkbox } from "../../../../components/ui/checkbox";
import { UserCheck } from "lucide-react";

interface CrearAfiliadoProps {
  isOpen: boolean;
  onClose: () => void;
}

const mockSectors = [
  { id: 1, name: "Technology" },
  { id: 2, name: "Health" },
  { id: 3, name: "Education" },
];

export default function CreateAffiliateForm({
  isOpen,
  onClose,
}: CrearAfiliadoProps) {
  const [formData, setFormData] = useState({
    name: "",
    dni: "",
    gender: "Male",
    sector: "1",
    phone: "",
    email: "",
    address: "",
    hasChildren: false,
    hasDisability: false,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSelectChange = (name: string, value: string) => {
    setFormData({ ...formData, [name]: value });
  };

  const handleCheckboxChange = (name: string) => {
    setFormData({
      ...formData,
      [name]: !formData[name as keyof typeof formData],
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success("Affiliate registered successfully!");
    onClose();
  };

  return (
    <DelegateDialog
      isOpen={isOpen}
      onClose={onClose}
      title="Register New Affiliate"
      description="Add a new affiliate with their personal information."
      footerButtons={
        <Button type="submit" form="affiliate-form">
          <UserCheck className="mr-2 h-4 w-4" />
          Register Affiliate
        </Button>
      }
    >
      <form id="affiliate-form" onSubmit={handleSubmit} className="grid gap-4">
        <Tabs defaultValue="personal" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="personal">Personal Information</TabsTrigger>
            <TabsTrigger value="additional">Additional Details</TabsTrigger>
          </TabsList>

          {/* Personal Information */}
          <TabsContent value="personal" className="mt-4">
            <div className="grid gap-4">
              <div className="grid gap-2">
                <Label htmlFor="name">Full Name</Label>
                <Input
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div className="grid gap-2">
                  <Label htmlFor="dni">DNI</Label>
                  <Input
                    id="dni"
                    name="dni"
                    value={formData.dni}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="gender">Gender</Label>
                  <Select
                    name="gender"
                    defaultValue={formData.gender}
                    onValueChange={(value) =>
                      handleSelectChange("gender", value)
                    }
                  >
                    <SelectTrigger id="gender">
                      <SelectValue placeholder="Select gender" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Male">Male</SelectItem>
                      <SelectItem value="Female">Female</SelectItem>
                      <SelectItem value="Other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="sector">Sector</Label>
                <Select
                  name="sector"
                  defaultValue={formData.sector}
                  onValueChange={(value) => handleSelectChange("sector", value)}
                >
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
            </div>
          </TabsContent>

          {/* Additional Details */}
          <TabsContent value="additional" className="mt-4">
            <div className="grid gap-4">
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div className="grid gap-2">
                  <Label htmlFor="phone">Phone Number</Label>
                  <Input
                    id="phone"
                    name="phone"
                    type="tel"
                    value={formData.phone}
                    onChange={handleChange}
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                  />
                </div>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="address">Address</Label>
                <Input
                  id="address"
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                />
              </div>
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="hasChildren"
                    name="hasChildren"
                    checked={formData.hasChildren}
                    onCheckedChange={() => handleCheckboxChange("hasChildren")}
                  />
                  <Label htmlFor="hasChildren" className="text-sm font-normal">
                    Has Children
                  </Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="hasDisability"
                    name="hasDisability"
                    checked={formData.hasDisability}
                    onCheckedChange={() =>
                      handleCheckboxChange("hasDisability")
                    }
                  />
                  <Label
                    htmlFor="hasDisability"
                    className="text-sm font-normal"
                  >
                    Has Disability
                  </Label>
                </div>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </form>
    </DelegateDialog>
  );
}
