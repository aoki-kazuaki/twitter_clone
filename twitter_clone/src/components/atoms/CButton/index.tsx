import { Button, buttonVariants } from "@/components/zShadcnBase/button";
import type { VariantProps } from "class-variance-authority";
import type { ComponentPropsWithoutRef, FC } from "react";
type Props = ComponentPropsWithoutRef<"button"> & VariantProps<typeof buttonVariants>;

const CButton: FC<Props> = ({ children, ...other }) => {
  return <Button {...other}>{children}</Button>;
};
export default CButton;
