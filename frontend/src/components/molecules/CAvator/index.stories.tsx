import type { Meta, StoryObj } from "@storybook/react-vite";
import CAvatar from ".";

const meta = {
  title: "molecules/CAvatar",
  component: CAvatar,
  tags: ["autodocs"],
  argTypes: {
    src: {
      control: "text",
      description: "表示したいアイコンのURL"
    },
    size: {
      control: "radio",
      description: "size調整",
      options: ["sm", "md", "lg"]
    }
  } // 自動ドキュメント生成用タグ
} satisfies Meta<typeof CAvatar>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    src: ""
  }
};

export const SrcValid: Story = {
  args: {
    src: "https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEi_KDuCUJ4SXPSs6ZVz2LFbkWyS4XTccFEfiizRuoUPM9PmR1Ob9P7IJpFG4hb2_wloVK6eMLvN8bwv8ILauUQWacxn7DzeHCvuQudsNZucMUTrzaMdHRzwjBJ5pDVJNTMhwAnDegyKBtAs6wEjFgsc2HY-9q4WoCHVuBzYIQ_Xv1KPBK8ZBHyx9EpGX3PA/s180-c/bucket_boy.png"
  }
};

export const SrcInvalid: Story = {
  args: {
    src: "InvalidUrl"
  }
};
