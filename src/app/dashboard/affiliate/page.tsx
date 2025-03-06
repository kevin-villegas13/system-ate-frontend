"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

import { UserPlus, Filter, Search } from "lucide-react";

export default function AffiliatePage() {
  return (
    <div className="flex flex-col gap-8 p-8">
      {/* Encabezado */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <h1 className="text-4xl font-extrabold text-gray-900">Afiliados</h1>
        <Button className="flex items-center gap-2 px-5 py-3 text-white transition-colors rounded-lg bg-emerald-600 hover:bg-emerald-700">
          <UserPlus className="w-6 h-6" />
          Nuevo Afiliado
        </Button>
      </div>

      {/* Filtros y Buscador */}
      <div className="flex flex-wrap items-center gap-4 p-6 rounded-xl bg-white shadow-sm">
        <div className="relative flex-1 min-w-[200px]">
          <Input placeholder="Buscar por nombre..." className="pr-10" />
          <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
        </div>

        <Select>
          <SelectTrigger className="w-[200px]">
            <SelectValue placeholder="Seleccionar género" />
            <Filter />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Todos</SelectItem>
            <SelectItem value="male">Masculino</SelectItem>
            <SelectItem value="female">Femenino</SelectItem>
          </SelectContent>
        </Select>

        <Select>
          <SelectTrigger className="w-[200px]">
            <SelectValue placeholder="Seleccionar sector" />
            <Filter />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Todos</SelectItem>
            <SelectItem value="tech">Tecnología</SelectItem>
            <SelectItem value="health">Salud</SelectItem>
            <SelectItem value="education">Educación</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Tabla de Afiliados */}
      <div className="overflow-x-auto rounded-xl bg-white shadow-sm">
        <table className="w-full text-left border-collapse">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-4 text-gray-600">ID</th>
              <th className="p-4 text-gray-600">Nombre</th>
              <th className="p-4 text-gray-600">Género</th>
              <th className="p-4 text-gray-600">Sector</th>
              <th className="p-4 text-gray-600">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {[1, 2, 3].map((id) => (
              <tr key={id} className="hover:bg-gray-50">
                <td className="p-4">{id}</td>
                <td className="p-4">Afiliado {id}</td>
                <td className="p-4">Masculino</td>
                <td className="p-4">Tecnología</td>
                <td className="p-4">
                  <Button size="sm" variant="outline">
                    Editar
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <Pagination>
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious href="#" />
          </PaginationItem>
          <PaginationItem>
            <PaginationLink href="#">1</PaginationLink>
          </PaginationItem>
          <PaginationItem>
            <PaginationLink href="#" isActive>
              2
            </PaginationLink>
          </PaginationItem>
          <PaginationItem>
            <PaginationLink href="#">3</PaginationLink>
          </PaginationItem>
          <PaginationItem>
            <PaginationEllipsis />
          </PaginationItem>
          <PaginationItem>
            <PaginationNext href="#" />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </div>
  );
}
