import { Label } from "@/components/zShadcnBase/label";
import type { ComponentPropsWithoutRef, FC, ReactNode } from "react";

export type FormItemProps = {
  id: string;
  labelText: string;
  formItem: ReactNode;
  validationMessage?: string;
};

type Props = ComponentPropsWithoutRef<"div"> & FormItemProps;

const FormItem: FC<Props> = ({ id, labelText, formItem, validationMessage = "", ...other }) => {
  return (
    <>
      <div className="grid w-full items-center gap-2" {...other}>
        <Label htmlFor={id}>{labelText}</Label>
        {formItem}
        {validationMessage && (
          <p className="text-destructive text-center">
            <span>※</span>
            {validationMessage}
          </p>
        )}
      </div>
    </>
  );
};
export default FormItem;
