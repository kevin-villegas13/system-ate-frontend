import { Role } from "../../../../models/Role";

export type UserFormProps = {
  showPassword: boolean;
  setShowPassword: (val: boolean) => void;
  roles: Role[];
};

export type UserFormValues = {
  username: string;
  password: string;
  roleName: string;
};
