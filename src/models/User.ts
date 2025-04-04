import { Role } from "./Role";

export interface User {
  id?: string;
  username?: string;
  password?: string;
  role?: Role;
  isActive?: boolean;
}
