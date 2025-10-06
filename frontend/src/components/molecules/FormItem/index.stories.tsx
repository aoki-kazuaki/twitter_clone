import CInput from "@/components/atoms/CInput";
import type { Meta, StoryObj } from "@storybook/react-vite";
import FormItem from ".";

const meta = {
  title: "molecules/FormItem",
  component: FormItem,
  tags: ["autodocs"],
  argTypes: {
    // ユーザー操作で切り替え操作域
    labelText: {
      control: "text",
      description: "ラベル文字列"
    },
    validationMessage: {
      control: "text",
      description: "バリデーションメッセージ"
    },
    formItem: {
      control: false
    },
    id: {
      control: false
    }
  }
} satisfies Meta<typeof FormItem>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    // デフォルト値の設定
    labelText: "ラベル文字列",
    validationMessage: "バリデーションメッセージ",
    id: "thisFormItemId",
    formItem: <CInput id="thisFormItemId" />
  }
};
