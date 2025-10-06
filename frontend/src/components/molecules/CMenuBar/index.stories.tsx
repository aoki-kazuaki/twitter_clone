import type { Meta, StoryObj } from "@storybook/react";
import { MoreHorizontal } from "lucide-react";
import CMenuBar, { type MenubarItems } from "."; // index.tsx を指す

const meta: Meta<typeof CMenuBar> = {
  title: "molecules/CMenuBar",
  component: CMenuBar
};

export default meta;

type Story = StoryObj<typeof CMenuBar>;

//Props値
const menubarItems: MenubarItems[] = [
  { menubarItemText: "編集", onClick: () => alert("編集をクリックしました"), itemHidden: false, disabled: false },
  { menubarItemText: "削除", onClick: () => alert("削除をクリックしました"), itemHidden: false, disabled: false },
  { menubarItemText: "非表示項目", onClick: () => alert("表示されません"), itemHidden: true, disabled: false },
  { menubarItemText: "無効項目", onClick: () => alert("クリック不可です"), itemHidden: false, disabled: true }
];

export const Default: Story = {
  args: {
    menubarTriggerNode: (
      <div className="flex gap-1">
        <p>クリックするとメニューが表示される</p>
        <MoreHorizontal />
      </div>
    ),
    menubarItems: menubarItems
  }
};
