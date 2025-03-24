import { ElementType } from "react";

export interface TeamSwitcherProps {
  teams: Team[];
}

interface Team {
  name: string;
  logo: ElementType;
  plan: string;
}
