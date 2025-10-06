import type { Meta, StoryObj } from "@storybook/react-vite";
import Container from ".";

const meta = {
  title: "molecules/Container",
  component: Container,
  tags: ["autodocs"],
  argTypes: {
    // ユーザー操作で切り替え操作域
    children: {
      control: false
    }
  }
} satisfies Meta<typeof Container>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    // デフォルト値の設定
    children: "mx-auto w-11/12 max-w-[1200px]を持つラッパーコンポーネント"
  }
};
