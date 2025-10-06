import clsx from "clsx";
import type { ComponentPropsWithoutRef, FC } from "react";

type Props = ComponentPropsWithoutRef<"div">;

const Container: FC<Props> = ({ className, children, ...other }) => {
  return (
    <div className={clsx("mx-auto w-11/12 max-w-[1200px]", className)} {...other}>
      {children}
    </div>
  );
};
export default Container;
