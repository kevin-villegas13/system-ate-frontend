"use client";

import { AppSidebar } from "@/components/sidebar/app-sidebar";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Separator } from "@/components/ui/separator";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import React, { Fragment, ReactNode, useMemo } from "react";
import { usePathname } from "next/navigation";
import Providers from "../providers";

function getBreadcrumbItems(pathname: string) {
  const paths = pathname.split("/").filter(Boolean);
  return paths.map((path, index) => ({
    title: path.charAt(0).toUpperCase() + path.slice(1),
    href: `/${paths.slice(0, index + 1).join("/")}`,
  }));
}

export default function DashboardLayout({ children }: { children: ReactNode }) {
  const pathname = usePathname();

  // Memoiza el cálculo de las migas de pan para optimizar rendimiento
  const breadcrumbItems = useMemo(
    () => getBreadcrumbItems(pathname),
    [pathname]
  );

  return (
    <Providers>
      <SidebarProvider>
        <AppSidebar />
        <SidebarInset>
          <header className="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12">
            <div className="flex items-center gap-2 px-4">
              <SidebarTrigger className="-ml-1" />
              <Separator orientation="vertical" className="mr-2 h-4" />
              <Breadcrumb aria-label="Ruta de navegación">
                <BreadcrumbList>
                  {breadcrumbItems.map((item, index) => (
                    <Fragment key={item.href}>
                      <BreadcrumbItem>
                        {index === breadcrumbItems.length - 1 ? (
                          <BreadcrumbPage>{item.title}</BreadcrumbPage>
                        ) : (
                          <BreadcrumbLink href={item.href}>
                            {item.title}
                          </BreadcrumbLink>
                        )}
                      </BreadcrumbItem>
                      {index < breadcrumbItems.length - 1 && (
                        <BreadcrumbSeparator />
                      )}
                    </Fragment>
                  ))}
                </BreadcrumbList>
              </Breadcrumb>
            </div>
          </header>

          {/* Contenido principal */}
          <main className="flex flex-1 flex-col gap-4 p-4 pt-0">
            <div className="min-h-[100vh] flex-1 rounded-xl bg-muted/50 md:min-h-min">
              {children}
            </div>
          </main>
        </SidebarInset>
      </SidebarProvider>
    </Providers>
  );
}
