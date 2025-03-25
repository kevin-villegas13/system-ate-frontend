import { Fragment, useMemo } from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { getBreadcrumbItems } from "../../lib/utils/getBreadcrumbItems";
import { SidebarInset, SidebarProvider, SidebarTrigger } from "../ui/sidebar";
import { AppSidebar } from "../organisms/sidebar/AppSidebar";
import { Separator } from "../ui/separator";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "../ui/breadcrumb";
import BreadcrumbLinkItem from "../atoms/BreadcrumbLinkItem";

export default function DashboardLayout() {
  const { pathname } = useLocation();
  const navigate = useNavigate();

  const breadcrumbItems = useMemo(
    () => getBreadcrumbItems(pathname),
    [pathname]
  );

  const handleBreadcrumbClick = (
    e: React.MouseEvent,
    href: string | undefined
  ) => {
    e.preventDefault();
    if (href) navigate(href);
  };

  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <header className="flex h-16 items-center gap-2 px-4 transition-[width,height] ease-linear">
          <div className="flex items-center gap-2 px-4">
            <SidebarTrigger className="-ml-1" />
            <Separator orientation="vertical" className="mr-2 h-4" />
            <Breadcrumb aria-label="Ruta de navegación">
              <BreadcrumbList>
                {breadcrumbItems.map((item, index) => (
                  <Fragment key={item.href || item.title}>
                    <BreadcrumbItem>
                      {index === 0 && item.href === "/dashboard" ? (
                        <BreadcrumbLinkItem
                          href={item.href}
                          title={item.title}
                          onClick={(e) => handleBreadcrumbClick(e, item.href)}
                        />
                      ) : (
                        <BreadcrumbLinkItem
                          href={item.href}
                          title={item.title}
                          onClick={(e) => handleBreadcrumbClick(e, item.href)}
                        />
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

        <main className="flex flex-1 flex-col gap-4 p-4 pt-0">
          <div className="min-h-[100vh] flex-1 rounded-xl  md:min-h-min">
            <Outlet />
          </div>
        </main>
      </SidebarInset>
    </SidebarProvider>
  );
}
