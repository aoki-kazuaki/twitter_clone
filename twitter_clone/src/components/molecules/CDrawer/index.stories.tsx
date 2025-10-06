import CButton from "@/components/atoms/CButton";
import type { Meta, StoryObj } from "@storybook/react-vite";
import CDrawer from ".";

const meta = {
  title: "molecules/CDrawer",
  component: CDrawer,
  tags: ["autodocs"],
  argTypes: {
    // ユーザー操作で切り替え操作域
    drawerTitle: {
      control: "text",
      description: "ドロワーメニュータイトル"
    },
    description: {
      control: "text",
      description: "ドロワーメニュー補足説明"
    },
    children: {
      control: "text",
      description: "コンテンツ"
    },
    openDrawerNode: {
      control: false
    }
  }
} satisfies Meta<typeof CDrawer>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    drawerTitle: "ドロワーメニュータイトル",
    description: "ドロワーメニュー補足説明",
    openDrawerNode: <CButton>開く</CButton>,
    children: "children内部コンテンツ"
  }
};
