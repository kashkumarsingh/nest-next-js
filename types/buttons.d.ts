// types/buttons.d.ts
export type ButtonSize = "xs" | "sm" | "md" | "lg";
export type ButtonVariant = "primary" | "secondary";
export type ButtonType = "button" | "submit";

export interface ButtonProps {
  type?: ButtonType;
  size?: ButtonSize;
  variant?: ButtonVariant;
  href?: string;
  onClick?: () => void;
  children: React.ReactNode;
  className?: string;
}
