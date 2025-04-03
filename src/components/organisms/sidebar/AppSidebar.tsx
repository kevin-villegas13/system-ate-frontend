import { ComponentProps, useEffect, useState, useMemo } from "react";
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
import { User } from "../../../models/User";

export function AppSidebar(props: ComponentProps<typeof Sidebar>) {
  const { data: profileData } = useProfile<User>();
  const [userRole, setUserRole] = useState<string | null>(null);
  const [userName, setUserName] = useState<string | null>(null);

  useEffect(() => {
    setUserRole(profileData?.role?.roleName || null);
    setUserName(profileData?.username || null);
  }, [profileData]);

  const filteredNavMain = useMemo(() => {
    return sidebarData.navMain
      .map((item) => ({
        ...item,
        items: item.items?.filter((subItem) =>
          subItem.roles ? subItem.roles.includes(userRole!) : true
        ),
      }))
      .filter((item) =>
        item.roles ? item.roles.includes(userRole!) || item.items?.length : true
      );
  }, [userRole]);

  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <TeamSwitcher teams={sidebarData.teams} />
      </SidebarHeader>

      <SidebarContent>
        <NavMain items={filteredNavMain} />
      </SidebarContent>

      <SidebarFooter>
        <NavUser name={userName ?? "Usuario"} />
      </SidebarFooter>

      <SidebarRail />
    </Sidebar>
  );
}
