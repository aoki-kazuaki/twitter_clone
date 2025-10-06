import type { Meta, StoryObj } from "@storybook/react-vite"; // Storybook 7 + Vite
import CButton from ".";

// メタ情報
const meta = {
  title: "atoms/CButton",
  component: CButton,
  tags: ["autodocs"],
  argTypes: {
    children: {
      control: "text",
      description: "表示される文字"
    },
    variant: {
      control: { type: "radio" },
      options: ["default", "destructive", "ghost", "link", "outline", "secondary"]
    },
    size: {
      control: { type: "radio" },
      options: ["default", "sm", "lg", "icon"]
    }
  } // 自動ドキュメント生成用タグ
} satisfies Meta<typeof CButton>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: "default"
  }
};

export const Destructive: Story = {
  args: {
    variant: "destructive",
    children: "destructive"
  }
};
export const Ghost: Story = {
  args: {
    variant: "ghost",
    children: "ghost"
  }
};
export const Link: Story = {
  args: {
    variant: "link",
    children: "link"
  }
};
export const Outline: Story = {
  args: {
    variant: "outline",
    children: "outline"
  }
};
export const Secondary: Story = {
  args: {
    variant: "secondary",
    children: "secondary"
  }
};

export const Disabled: Story = {
  args: {
    children: "disabled",
    disabled: true
  }
};
