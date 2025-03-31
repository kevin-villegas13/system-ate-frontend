import { ComponentProps, useEffect, useState } from "react";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "../../ui/sidebar";
import { TeamSwitcher } from "./TeamSwitcher";
import { NavMain } from "./NavMain";
import { NavUser } from "./NavUser";
import { data as sidebarData } from "../../../config/dashboard-sidebar";
import { useProfile } from "../../../services/auth/authService";

interface UserProfile {
  id: string;
  createdAt: string;
  updatedAt: string;
  username: string;
  role: {
    id: number;
    roleName: string;
  };
  isActive: boolean;
}

export function AppSidebar({ ...props }: ComponentProps<typeof Sidebar>) {
  const { data: profileData, error, isLoading } = useProfile<UserProfile>();
  const [userRole, setUserRole] = useState<string | null>(null);
  const [userName, setUserName] = useState<string | null>(null);

  useEffect(() => {
    if (profileData?.role) setUserRole(profileData.role.roleName);

    if (profileData?.username) setUserName(profileData.username);
  }, [profileData, error]);

  if (isLoading) {
    return <div>Cargando...</div>;
  }

  if (!userRole) {
    return <div>Error: no se pudo obtener el rol del usuario.</div>;
  }

  // Filtrar los elementos principales y subelementos
  const filteredNavMain = sidebarData.navMain.filter((item) => {
    const hasRoles = Array.isArray(item.roles) && item.roles.length > 0;
    const isValidItem = hasRoles ? item.roles?.includes(userRole) : false;

    // Filtrar subitems si existen
    if (item.items) {
      item.items = item.items.filter((subItem) => {
        const hasSubItemRoles =
          Array.isArray(subItem.roles) && subItem.roles.length > 0;
        return hasSubItemRoles ? subItem.roles.includes(userRole) : false;
      });
    }

    // Solo devolver el item si es válido o tiene subitems válidos
    return isValidItem || (item.items?.length ?? 0) > 0;
  });

  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <TeamSwitcher teams={sidebarData.teams} />
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={filteredNavMain} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser name={userName!} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
