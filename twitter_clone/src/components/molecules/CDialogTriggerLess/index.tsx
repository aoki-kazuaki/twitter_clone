import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/zShadcnBase/dialog";
import type { ComponentPropsWithoutRef, FC } from "react";

type Props = ComponentPropsWithoutRef<"div"> & {
  dialogTitle: string;
  description?: string;
};

/**表示制御を呼びだし側のコンポーネント内で記述するダイアログコンポーネント */
const CDialogTriggerLess: FC<Props> = ({ dialogTitle, description = "", children, ...other }) => {
  return (
    <Dialog open={true} {...other}>
      <DialogContent aria-describedby={undefined} showCloseButton={false}>
        <DialogHeader>
          <DialogTitle className="text-center">{dialogTitle}</DialogTitle>
          {description && <DialogDescription className="text-center">{description}</DialogDescription>}
        </DialogHeader>
        {children}
      </DialogContent>
    </Dialog>
  );
};
export default CDialogTriggerLess;
