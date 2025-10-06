import type { Meta, StoryObj } from "@storybook/react-vite";
import CAccordion from ".";

const meta = {
  title: "molecules/CAccordion",
  component: CAccordion,
  tags: ["autodocs"],
  argTypes: {
    accordionItems: {
      control: false
    }
  }
} satisfies Meta<typeof CAccordion>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    accordionItems: [
      { triggerText: "トリガーテキスト1", accordionContent: <p>アコーディオンコンテンツ1</p> },
      { triggerText: "トリガーテキスト2", accordionContent: <p>アコーディオンコンテンツ2</p> }
    ]
  }
};
