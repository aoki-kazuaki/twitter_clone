import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/zShadcnBase/accordion";
import type { ComponentPropsWithoutRef, FC, ReactNode } from "react";

export type AccordionItem = {
  triggerText: string;
  accordionContent: ReactNode;
};

type Props = ComponentPropsWithoutRef<"div"> & {
  accordionItems: AccordionItem[];
};

const CAccordion: FC<Props> = ({ accordionItems }) => {
  return (
    <Accordion type="single" collapsible className="w-full">
      {accordionItems.map((content) => (
        <AccordionItem key={content.triggerText} value={content.triggerText}>
          <AccordionTrigger className="cursor-pointer">{content.triggerText}</AccordionTrigger>
          <AccordionContent>{content.accordionContent}</AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  );
};
export default CAccordion;
