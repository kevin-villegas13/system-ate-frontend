import { Tabs, TabsList, TabsTrigger } from "@radix-ui/react-tabs";
import PageContainer from "../../../components/organisms/PageContainer";
import { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../../../components/ui/card";
import {
  ArrowUpRight,
  Building,
  Calendar,
  CheckCircle,
  Clock,
  Gift,
  Package,
  UserCheck,
  Users,
  XCircle,
} from "lucide-react";
import { Badge } from "../../../components/ui/badge";
import { Button } from "../../../components/ui/button";

// Mock data for sectors
const sectorData = [
  {
    id: 1,
    name: "Administration",
    affiliateCount: 32,
    delegateCount: 5,
    color: "bg-blue-500",
  },
  {
    id: 2,
    name: "Finance",
    affiliateCount: 18,
    delegateCount: 3,
    color: "bg-green-500",
  },
  {
    id: 3,
    name: "Human Resources",
    affiliateCount: 24,
    delegateCount: 4,
    color: "bg-purple-500",
  },
  {
    id: 4,
    name: "Information Technology",
    affiliateCount: 45,
    delegateCount: 7,
    color: "bg-amber-500",
  },
  {
    id: 5,
    name: "Marketing",
    affiliateCount: 15,
    delegateCount: 3,
    color: "bg-pink-500",
  },
  {
    id: 6,
    name: "Operations",
    affiliateCount: 22,
    delegateCount: 10,
    color: "bg-indigo-500",
  },
];

// Mock data for benefits
const benefitData = [
  {
    id: 1,
    name: "School Backpack",
    type: "School Supplies",
    stock: 150,
    distributed: 50,
    remaining: 100,
    isAvailable: true,
  },
  {
    id: 2,
    name: "Basic Food Basket",
    type: "Food",
    stock: 75,
    distributed: 25,
    remaining: 50,
    isAvailable: true,
  },
  {
    id: 3,
    name: "Winter Clothing Kit",
    type: "Clothing",
    stock: 100,
    distributed: 35,
    remaining: 65,
    isAvailable: true,
  },
  {
    id: 4,
    name: "Medical Check-up",
    type: "Health",
    stock: 200,
    distributed: 80,
    remaining: 120,
    isAvailable: true,
  },
  {
    id: 5,
    name: "Summer Camp",
    type: "Recreation",
    stock: 50,
    distributed: 0,
    remaining: 50,
    isAvailable: false,
  },
];

export default function DashboardHomePage() {
  // Mock data for statistics
  const statsData = {
    totalUsers: 245,
    activeUsers: 198,
    totalAffiliates: 156,
    activeDelegates: 32,
    benefitsDistributed: 320,
    upcomingEvents: 8,
    pendingRequests: 12,
  };
  // Calculate total affiliates and delegates
  const totalAffiliates = sectorData.reduce(
    (sum, sector) => sum + sector.affiliateCount,
    0
  );
  const totalDelegates = sectorData.reduce(
    (sum, sector) => sum + sector.delegateCount,
    0
  );

  const [timeRange, setTimeRange] = useState<"week" | "month" | "year">(
    "month"
  );

  return (
    <PageContainer>
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <h1 className="text-2xl font-bold tracking-tight text-gray-900">
          Dashboard
        </h1>

        <Tabs
          defaultValue="month"
          className="grid w-full sm:w-[400px]"
          onValueChange={(value) =>
            setTimeRange(value as "week" | "month" | "year")
          }
        >
          <TabsList className="grid w-full grid-cols-3 border-b border-gray-300">
            <TabsTrigger
              value="week"
              className="py-2 px-4 text-sm font-medium text-gray-600 hover:text-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              Esta semana
            </TabsTrigger>
            <TabsTrigger
              value="month"
              className="py-2 px-4 text-sm font-medium text-gray-600 hover:text-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              Este mes
            </TabsTrigger>
            <TabsTrigger
              value="year"
              className="py-2 px-4 text-sm font-medium text-gray-600 hover:text-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              Este año
            </TabsTrigger>
          </TabsList>
        </Tabs>
      </div>

      {/* Stats Overview */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Usuarios Totales
            </CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{statsData.totalUsers}</div>
            <p className="text-xs text-muted-foreground">
              <span className="text-green-500 inline-flex items-center">
                <ArrowUpRight className="mr-1 h-3 w-3" />
                +12%
              </span>{" "}
              desde el último{" "}
              {timeRange === "week"
                ? "semana"
                : timeRange === "month"
                ? "mes"
                : "año"}
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Afiliados</CardTitle>
            <UserCheck className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {statsData.totalAffiliates}
            </div>
            <p className="text-xs text-muted-foreground">
              <span className="text-green-500 inline-flex items-center">
                <ArrowUpRight className="mr-1 h-3 w-3" />
                +8%
              </span>{" "}
              desde el último{" "}
              {timeRange === "week"
                ? "semana"
                : timeRange === "month"
                ? "mes"
                : "año"}
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Beneficios Distribuidos
            </CardTitle>
            <Package className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {statsData.benefitsDistributed}
            </div>
            <p className="text-xs text-muted-foreground">
              <span className="text-green-500 inline-flex items-center">
                <ArrowUpRight className="mr-1 h-3 w-3" />
                +19%
              </span>{" "}
              desde el último{" "}
              {timeRange === "week"
                ? "semana"
                : timeRange === "month"
                ? "mes"
                : "año"}
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Eventos Próximos
            </CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{statsData.upcomingEvents}</div>
            <p className="text-xs text-muted-foreground">
              <span className="text-amber-500 inline-flex items-center">
                <Clock className="mr-1 h-3 w-3" />
                Próximo en 7 días
              </span>
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Sectors Overview */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        <Card className="lg:col-span-3">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Building className="h-5 w-5" />
              Distribución por Sectores
            </CardTitle>
            <CardDescription>
              Distribución de afiliados y delegados por sector
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {sectorData.map((sector) => (
                <div key={sector.id} className="flex items-center gap-4">
                  <div className={`h-4 w-4 rounded-full ${sector.color}`}></div>
                  <div className="flex-1 space-y-1">
                    <div className="flex items-center justify-between">
                      <p className="text-sm font-medium">{sector.name}</p>
                      <p className="text-sm font-medium">
                        {sector.affiliateCount}
                      </p>
                    </div>
                    <div className="h-2 w-full rounded-full bg-muted">
                      <div
                        className={`h-2 rounded-full ${sector.color}`}
                        style={{
                          width: `${
                            (sector.affiliateCount / totalAffiliates) * 100
                          }%`,
                        }}
                      ></div>
                    </div>
                    <div className="flex justify-between text-xs text-muted-foreground">
                      <span>
                        {Math.round(
                          (sector.affiliateCount / totalAffiliates) * 100
                        )}
                        % de afiliados
                      </span>
                      <span>{sector.delegateCount} delegados</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
          <CardFooter>
            <Button variant="outline" className="w-full">
              <Building className="mr-2 h-4 w-4" />
              Ver detalles de sectores
            </Button>
          </CardFooter>
        </Card>

        {/* Benefits Overview */}
        <Card className="lg:col-span-4">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Gift className="h-5 w-5" />
              Resumen de Beneficios
            </CardTitle>
            <CardDescription>
              Estado actual de los beneficios disponibles
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {benefitData.map((benefit) => (
                <div key={benefit.id} className="rounded-lg border p-3">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium">{benefit.name}</p>
                      <p className="text-xs text-muted-foreground">
                        {benefit.type}
                      </p>
                    </div>
                    {benefit.isAvailable ? (
                      <Badge
                        variant="secondary"
                        className="flex items-center gap-1 bg-green-500 hover:bg-green-600"
                      >
                        <CheckCircle className="h-3 w-3" />
                        <span>Disponible</span>
                      </Badge>
                    ) : (
                      <Badge
                        variant="destructive"
                        className="flex items-center gap-1"
                      >
                        <XCircle className="h-3 w-3" />
                        <span>No disponible</span>
                      </Badge>
                    )}
                  </div>
                  <div className="mt-2">
                    <div className="flex justify-between text-xs text-muted-foreground mb-1">
                      <span>Stock: {benefit.stock}</span>
                      <span>Distribuidos: {benefit.distributed}</span>
                      <span>Restantes: {benefit.remaining}</span>
                    </div>
                    <div className="h-2 w-full rounded-full bg-muted">
                      <div
                        className="h-2 rounded-full bg-primary"
                        style={{
                          width: `${
                            (benefit.remaining / benefit.stock) * 100
                          }%`,
                        }}
                      ></div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
          <CardFooter>
            <Button variant="outline" className="w-full">
              <Gift className="mr-2 h-4 w-4" />
              Gestionar beneficios
            </Button>
          </CardFooter>
        </Card>
      </div>
    </PageContainer>
  );
}
