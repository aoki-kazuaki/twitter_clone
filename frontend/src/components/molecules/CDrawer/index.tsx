import { Drawer, DrawerContent, DrawerDescription, DrawerHeader, DrawerTitle, DrawerTrigger } from "@/components/zShadcnBase/drawer";
import type { ComponentPropsWithoutRef, FC, ReactNode } from "react";

type Props = ComponentPropsWithoutRef<"div"> & {
  openDrawerNode?: ReactNode;
  drawerTitle: string;
  description?: string;
  focusTargetId?: string;
};

const CDrawer: FC<Props> = ({ openDrawerNode, drawerTitle, description = "", focusTargetId = "", children }) => {
  const onOpenAutoFocus = (e: Event) => {
    if (!focusTargetId) return;
    e.preventDefault();
    document.getElementById(focusTargetId)?.focus();
  };

  return (
    <Drawer>
      <DrawerTrigger asChild>{openDrawerNode}</DrawerTrigger>
      <DrawerContent aria-describedby={undefined} onOpenAutoFocus={onOpenAutoFocus}>
        <div className="mx-auto w-full max-w-sm">
          <DrawerHeader>
            <DrawerTitle>{drawerTitle}</DrawerTitle>
            {description && <DrawerDescription>{description}</DrawerDescription>}
          </DrawerHeader>
          <div className="p-4">{children}</div>
        </div>
      </DrawerContent>
    </Drawer>
  );
};

export default CDrawer;
