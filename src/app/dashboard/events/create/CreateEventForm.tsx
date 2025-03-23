import { useState } from "react";
import { toast } from "sonner";
import DelegateDialog from "../../../../components/shared/DelegateDialog";
import { Button } from "../../../../components/ui/button";
import { Input } from "../../../../components/ui/input";
import { Label } from "../../../../components/ui/label";
import { Textarea } from "../../../../components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../../../components/ui/select";
import { UserCheck } from "lucide-react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "../../../../components/ui/popover";
import { Calendar } from "../../../../components/ui/calendar"; // import Calendar component
import { format } from "date-fns";

const eventTypes = [
  { id: 1, name: "Meeting" },
  { id: 2, name: "Workshop" },
  { id: 3, name: "Conference" },
];

const mockUsers = [
  { id: 1, name: "John Doe", role: "Organizer" },
  { id: 2, name: "Jane Smith", role: "Speaker" },
];

interface CrearAfiliadoProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function CreateEventForm({
  isOpen,
  onClose,
}: CrearAfiliadoProps) {
  const [formData, setFormData] = useState({
    title: "",
    type: "1",
    responsibleUser: "1",
    date: "",
    time: "",
    location: "",
    description: "",
    startDate: "",
    endDate: "",
  });

  const [formError, setFormError] = useState<string | null>(null);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSelectChange = (name: string, value: string) => {
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.title || !formData.date || !formData.time) {
      setFormError("Please fill out all required fields.");
    } else {
      toast.success("Affiliate registered successfully!");
      onClose();
    }
  };

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
      <form id="affiliate-form" onSubmit={handleSubmit}>
        <div className="grid gap-4 py-4">
          <div className="grid gap-2">
            <Label htmlFor="title">Event Title</Label>
            <Input
              id="title"
              name="title"
              value={formData.title}
              onChange={handleChange}
              placeholder="Enter event title"
              required
            />
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div className="grid gap-2">
              <Label htmlFor="type">Event Type</Label>
              <Select
                name="type"
                value={formData.type}
                onValueChange={(value) => handleSelectChange("type", value)}
              >
                <SelectTrigger id="type">
                  <SelectValue placeholder="Select event type" />
                </SelectTrigger>
                <SelectContent>
                  {eventTypes.map((type) => (
                    <SelectItem key={type.id} value={String(type.id)}>
                      {type.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="grid gap-2">
              <Label htmlFor="responsibleUser">Responsible User</Label>
              <Select
                name="responsibleUser"
                value={formData.responsibleUser}
                onValueChange={(value) =>
                  handleSelectChange("responsibleUser", value)
                }
              >
                <SelectTrigger id="responsibleUser">
                  <SelectValue placeholder="Select responsible user" />
                </SelectTrigger>
                <SelectContent>
                  {mockUsers.map((user) => (
                    <SelectItem key={user.id} value={String(user.id)}>
                      {user.name} ({user.role})
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div className="grid gap-2">
              <Label htmlFor="startDate">Event Start Date</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Input
                    type="text"
                    id="startDate"
                    name="startDate"
                    value={
                      formData.startDate
                        ? format(new Date(formData.startDate), "PPP")
                        : ""
                    }
                    onChange={(e) => handleChange(e)}
                    required
                    placeholder="Select start date"
                    readOnly
                  />
                </PopoverTrigger>
                <PopoverContent align="start" className="p-0">
                  <Calendar
                    mode="single"
                    selected={
                      formData.startDate
                        ? new Date(formData.startDate)
                        : undefined
                    }
                    onSelect={(selectedDate) =>
                      setFormData({
                        ...formData,
                        startDate: selectedDate
                          ? selectedDate.toISOString()
                          : "",
                      })
                    }
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
            </div>

            <div className="grid gap-2">
              <Label htmlFor="endDate">Event End Date</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Input
                    type="text"
                    id="endDate"
                    name="endDate"
                    value={
                      formData.endDate
                        ? format(new Date(formData.endDate), "PPP")
                        : ""
                    }
                    onChange={(e) => handleChange(e)}
                    required
                    placeholder="Select end date"
                    readOnly
                  />
                </PopoverTrigger>
                <PopoverContent align="start" className="p-0">
                  <Calendar
                    mode="single"
                    selected={
                      formData.endDate ? new Date(formData.endDate) : undefined
                    }
                    onSelect={(selectedDate) =>
                      setFormData({
                        ...formData,
                        endDate: selectedDate ? selectedDate.toISOString() : "",
                      })
                    }
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
            </div>
          </div>

          <div className="grid gap-2">
            <Label htmlFor="location">Event Location</Label>
            <Input
              id="location"
              name="location"
              value={formData.location}
              onChange={handleChange}
              placeholder="Enter event location"
              required
            />
          </div>

          <div className="grid gap-2">
            <Label htmlFor="description">Event Description</Label>
            <Textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              placeholder="Enter event description"
              required
            />
          </div>
        </div>
      </form>
    </DelegateDialog>
  );
}
