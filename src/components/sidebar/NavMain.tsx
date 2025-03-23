import { ChevronRight } from "lucide-react";

import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "../ui/collapsible";
import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
} from "../ui/sidebar";
import { NavMainProps, SidebarMenuLinkProps } from "./types/nav-main.type";

export function NavMain({ items }: NavMainProps) {
  const SidebarMenuLink = ({
    title,
    icon: Icon,
    url,
  }: SidebarMenuLinkProps) => {
    return (
      <>
        <SidebarMenuButton tooltip={title}>
          {Icon && <Icon />}
          <span>{title}</span>
          {url && <a href={url}>{title}</a>}
        </SidebarMenuButton>
      </>
    );
  };

  return (
    <SidebarGroup>
      <SidebarGroupLabel>Platform</SidebarGroupLabel>
      <SidebarMenu>
        {items.map((item, index) => (
          <Collapsible
            key={`${item.title}-${index}`}
            asChild
            defaultOpen={item.isActive}
            className="group/collapsible"
          >
            {item.items?.length ? (
              <SidebarMenuItem>
                <CollapsibleTrigger asChild>
                  <div>
                    <SidebarMenuButton tooltip={item.title}>
                      {item.icon && <item.icon />}
                      <span>{item.title}</span>
                      <ChevronRight className="ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" />
                    </SidebarMenuButton>
                  </div>
                </CollapsibleTrigger>
                <CollapsibleContent>
                  <SidebarMenuSub>
                    {item.items?.map((subItem) => (
                      <SidebarMenuSubItem key={subItem.title}>
                        <SidebarMenuSubButton asChild>
                          <a href={subItem.url}>
                            {subItem.icon && <subItem.icon />}
                            <span
                              className="truncate max-w-[150px]"
                              title={subItem.title}
                            >
                              {subItem.title}
                            </span>
                          </a>
                        </SidebarMenuSubButton>
                      </SidebarMenuSubItem>
                    ))}
                  </SidebarMenuSub>
                </CollapsibleContent>
              </SidebarMenuItem>
            ) : (
              <SidebarMenuLink
                title={item.title}
                icon={item.icon}
                url={item.url}
              />
            )}
          </Collapsible>
        ))}
      </SidebarMenu>
    </SidebarGroup>
  );
}
