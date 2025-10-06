import type { Meta, StoryObj } from "@storybook/react-vite";
import CCard from ".";

const meta = {
  title: "molecules/CCard",
  component: CCard,
  tags: ["autodocs"],
  argTypes: {
    // ユーザー操作で切り替え操作域
    cardTitle: {
      control: "text",
      description: "カードタイトル"
    },
    description: {
      control: "text",
      description: "カード補足"
    },
    children: {
      control: "text",
      description: "表示される文字"
    }
  }
} satisfies Meta<typeof CCard>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    // デフォルト値の設定
    cardTitle: "カードタイトル",
    description: "カードの説明",
    children: "内部コンテンツをchildrenで挿入できます"
  }
};
