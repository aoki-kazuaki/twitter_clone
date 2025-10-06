import type { Meta, StoryObj } from "@storybook/react-vite";
import CInput from ".";

const meta = {
  title: "atoms/CInput",
  component: CInput,
  tags: ["autodocs"],
  argTypes: {
    value: {
      control: "text",
      description: "入力値"
    },
    disabled: {
      control: "boolean",
      description: "活性、非活性管理"
    },
    placeholder: {
      control: "text",
      description: "プレースホルダー"
    }
  }
} satisfies Meta<typeof CInput>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    value: "",
    placeholder: "プレースホルダー"
  }
};

export const Disabled: Story = {
  args: {
    value: "default",
    disabled: true
  }
};
