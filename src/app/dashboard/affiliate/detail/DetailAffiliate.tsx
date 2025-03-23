import { useEffect, useState } from "react";
import { Building, Baby, Accessibility, Phone, Mail } from "lucide-react";
import DelegateDialog from "../../../../components/shared/DelegateDialog";
import { Button } from "../../../../components/ui/button";
import { Badge } from "../../../../components/ui/badge"; // Asegúrate de importar Badge

interface DetailAfiliadoProps {
  isOpen: boolean;
  onClose: () => void;
  affiliate: Affiliate | null;
}

interface Affiliate {
  name: string;
  joinDate: string;
  dni: string;
  gender: string;
  sectorId: number;
  hasChildren: boolean;
  hasDisability: boolean;
  phone: string;
  email: string;
  address: string;
}

// Simula una función para obtener el nombre del sector basado en el ID
const getSectorName = (sectorId: number) => {
  const sectors: { [key: number]: string } = {
    1: "Technology",
    2: "Finance",
    3: "Healthcare",
  };
  return sectors[sectorId] || "Unknown";
};

export default function DetailAffiliate({
  isOpen,
  onClose,
  affiliate,
}: DetailAfiliadoProps) {
  const [currentAffiliate, setCurrentAffiliate] = useState<Affiliate | null>(
    null
  );

  useEffect(() => {
    if (isOpen && affiliate) {
      setCurrentAffiliate(affiliate);
    }
  }, [isOpen, affiliate]);

  return (
    <DelegateDialog
      isOpen={isOpen}
      onClose={onClose}
      title="Affiliate Details"
      description="View the details of the selected affiliate."
    >
      {currentAffiliate ? (
        <div className="grid gap-6 py-4">
          {/* Header */}
          <div className="flex flex-col gap-1">
            <h3 className="text-lg font-semibold">{currentAffiliate.name}</h3>
            <p className="text-sm text-muted-foreground">
              Joined on {currentAffiliate.joinDate}
            </p>
          </div>

          {/* DNI & Gender */}
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div className="space-y-1">
              <p className="text-sm font-medium">DNI</p>
              <p>{currentAffiliate.dni}</p>
            </div>
            <div className="space-y-1">
              <p className="text-sm font-medium">Gender</p>
              <p>{currentAffiliate.gender}</p>
            </div>
          </div>

          {/* Sector */}
          <div className="space-y-1">
            <p className="text-sm font-medium">Sector</p>
            <div className="flex items-center gap-2">
              <Building className="h-4 w-4 text-muted-foreground" />
              <p>{getSectorName(currentAffiliate.sectorId)}</p>
            </div>
          </div>

          {/* Status */}
          <div className="space-y-2">
            <p className="text-sm font-medium">Status</p>
            <div className="flex flex-wrap gap-2">
              {currentAffiliate.hasChildren && (
                <Badge variant="secondary" className="flex items-center gap-1">
                  <Baby className="h-3 w-3" />
                  <span>Has Children</span>
                </Badge>
              )}
              {currentAffiliate.hasDisability && (
                <Badge variant="secondary" className="flex items-center gap-1">
                  <Accessibility className="h-3 w-3" />
                  <span>Has Disability</span>
                </Badge>
              )}
              {!currentAffiliate.hasChildren &&
                !currentAffiliate.hasDisability && (
                  <span className="text-muted-foreground">
                    No special status
                  </span>
                )}
            </div>
          </div>

          {/* Contact Information */}
          <div className="space-y-2">
            <p className="text-sm font-medium">Contact Information</p>
            <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
              <div className="flex items-center gap-2">
                <Phone className="h-4 w-4 text-muted-foreground" />
                <p>{currentAffiliate.phone}</p>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="h-4 w-4 text-muted-foreground" />
                <p>{currentAffiliate.email}</p>
              </div>
            </div>
          </div>

          {/* Address */}
          <div className="space-y-1">
            <p className="text-sm font-medium">Address</p>
            <p>{currentAffiliate.address}</p>
          </div>
        </div>
      ) : (
        <p className="text-center text-muted-foreground">
          No affiliate selected
        </p>
      )}
    </DelegateDialog>
  );
}
