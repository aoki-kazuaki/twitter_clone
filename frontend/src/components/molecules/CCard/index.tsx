import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/zShadcnBase/card";
import type { ComponentPropsWithoutRef, FC } from "react";

type Props = ComponentPropsWithoutRef<"div"> & {
  cardTitle: string;
  description?: string;
};

const CCard: FC<Props> = ({ cardTitle, description = "", children, ...other }) => {
  return (
    <Card className="w-full max-w-sm" {...other}>
      <CardHeader>
        <CardTitle className="text-center text-xl">{cardTitle}</CardTitle>
        {description && <CardDescription className="text-center">{description}</CardDescription>}
      </CardHeader>
      <CardContent>{children}</CardContent>
    </Card>
  );
};
export default CCard;
