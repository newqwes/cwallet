import { ReactNode } from "react";

export interface INavButton {
  path: string;
  title: string;
  icon: ReactNode;
  isActive: boolean;
}

export interface IButtonLink {
  isActive: boolean;
  disabled?: boolean;
}
