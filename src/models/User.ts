import { Role } from "./Role";

export class User {
  id?: string;
  username?: string;
  password?: string;
  role?: Role;
  isActive?: boolean;
}
