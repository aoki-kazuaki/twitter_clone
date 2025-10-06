import type { Meta, StoryObj } from "@storybook/react-vite";
import CDialogTriggerLess from ".";

const meta = {
  title: "molecules/CDialogTriggerLess",
  component: CDialogTriggerLess,
  // tags: ["autodocs"],
  argTypes: {
    // ユーザー操作で切り替え操作域
    dialogTitle: {
      control: "text",
      description: "ダイアログタイトル"
    },
    description: {
      control: "text",
      description: "ダイアログ補足説明"
    },
    children: {
      control: "text",
      description: "表示される文字"
    }
  }
} satisfies Meta<typeof CDialogTriggerLess>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    // デフォルト値の設定
    dialogTitle: "ダイアログタイトル",
    description: "ダイアログ補足説明",
    children: "ダイアログコンテンツ"
  }
};
