import CInput from "@/components/atoms/CInput";
import type { Meta, StoryObj } from "@storybook/react-vite";
import FormItemGroup from ".";
import type { FormItemProps } from "../FormItem";

const meta = {
  title: "molecules/FormItemGroup",
  component: FormItemGroup,
  tags: ["autodocs"],
  argTypes: {
    thisFormItems: {
      control: false
    }
  }
} satisfies Meta<typeof FormItemGroup>;

export default meta;
type Story = StoryObj<typeof meta>;

const thisFormItems: FormItemProps[] = [
  {
    id: "username",
    labelText: "ユーザー名",
    formItem: <CInput id="username" placeholder="ユーザー名を入力" />,
    validationMessage: "IDは入力必須です"
  },
  {
    id: "password",
    labelText: "パスワード",
    formItem: <CInput id="password" type="password" placeholder="パスワードを入力" />
  }
];

export const Default: Story = {
  args: {
    thisFormItems: thisFormItems
  }
};
