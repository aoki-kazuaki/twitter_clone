import clsx from "clsx";
import type { ComponentPropsWithoutRef, FC } from "react";
import type { FormItemProps } from "../FormItem";
import FormItem from "../FormItem";

type Props = ComponentPropsWithoutRef<"div"> & {
  thisFormItems: FormItemProps[];
};

const FormItemGroup: FC<Props> = ({ thisFormItems, className, ...other }) => {
  return (
    <div className={clsx("flex flex-col gap-4", className)} {...other}>
      {thisFormItems.map((item) => (
        <FormItem key={item.id} id={item.id} labelText={item.labelText} formItem={item.formItem} validationMessage={item.validationMessage} />
      ))}
    </div>
  );
};
export default FormItemGroup;
