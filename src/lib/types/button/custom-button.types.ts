import { ButtonHTMLAttributes, ElementType } from "react";

export interface CustomButtonProps
  extends ButtonHTMLAttributes<HTMLButtonElement> {
  icon?: ElementType;
  buttonText: string;
}
