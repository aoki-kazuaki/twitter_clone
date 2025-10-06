import { Input } from "@/components/zShadcnBase/input";
import type { ComponentPropsWithoutRef, FC } from "react";

type Props = ComponentPropsWithoutRef<"input">;

const CInput: FC<Props> = ({ ...other }) => {
  return <Input {...other} />;
};
export default CInput;
