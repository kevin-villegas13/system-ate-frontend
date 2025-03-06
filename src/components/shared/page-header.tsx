import { LucideIcon } from "lucide-react";
import { Button } from "../ui/button";

interface PageProps {
  title: string;
  buttonText: string;
  buttonIcon: LucideIcon; // Aquí está bien tipado
  onButtonClick: () => void;
}

export default function PageHeader({
  title,
  buttonText,
  buttonIcon: Icon,
  onButtonClick,
}: PageProps) {
  return (
    <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
      <h1 className="text-4xl font-extrabold text-gray-900">{title}</h1>
      <Button
        onClick={onButtonClick}
        className="flex items-center gap-2 px-5 py-3 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg"
      >
        <Icon className="w-6 h-6" />
        {buttonText}
      </Button>
    </div>
  );
}
