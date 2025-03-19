"use client";

import PageHeader from "@/components/shared/page-header";
import { UserPlus } from "lucide-react";
import { useState } from "react";

export default function AffiliatePage() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div className="flex flex-col gap-8 p-8">
      <PageHeader
        title="Afiliados"
        buttonText="Nuevo Afiliado"
        buttonIcon={UserPlus}
        onButtonClick={() => setIsModalOpen(true)}
      />
    </div>
  );
}
