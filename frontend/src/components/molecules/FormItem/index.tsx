import { Label } from "@/components/zShadcnBase/label";
import type { ComponentPropsWithoutRef, FC, ReactNode } from "react";

export type FormItemProps = {
  id: string;
  labelText: string;
  formItem: ReactNode;
  validationMessage?: string;
  isRequired?: boolean;
  isRequiredMessage?: string;
};

type Props = ComponentPropsWithoutRef<"div"> & FormItemProps;

const FormItem: FC<Props> = ({ id, labelText, formItem, validationMessage, isRequired, isRequiredMessage, ...other }) => {
  /**必須の文字列のデフォルト値 */
  const DEFAULT_REQUIRED_MESSAGE = "※必須";
  /** 任意入力の必須文字列が存在する場合、メッセージをデフォルト表示の文字列(※必須)より切り替える*/
  const viewRequiredMessage = isRequiredMessage ? isRequiredMessage : DEFAULT_REQUIRED_MESSAGE;

  return (
    <>
      <div className="grid w-full items-center gap-2" {...other}>
        <div className="flex items-center gap-1">
          <Label htmlFor={id}>{labelText}</Label>
          {isRequired && <span className="text-red-400">{viewRequiredMessage}</span>}
        </div>
        {formItem}
        {validationMessage && <p className="text-destructive text-center">{validationMessage}</p>}
      </div>
    </>
  );
};
export default FormItem;
