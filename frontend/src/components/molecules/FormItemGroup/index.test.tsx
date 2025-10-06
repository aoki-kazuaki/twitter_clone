import CInput from "@/components/atoms/CInput";
import { render, screen } from "@testing-library/react";
import { describe, test } from "vitest";
import FormItemGroup from ".";
import type { FormItemProps } from "../FormItem";

describe("components/molecules/FormItemGroupテスト", () => {
  const FORM_ITEM_ID_USER_ID = "userId";
  const FORM_ITEM_ID_PASSWORD = "password";
  const VALIDATION_MESSAGE_ID_REQUIRED = "IDは入力必須です";

  const thisFormItems: FormItemProps[] = [
    {
      id: FORM_ITEM_ID_USER_ID,
      labelText: "ユーザーID",
      formItem: <CInput id={FORM_ITEM_ID_USER_ID} placeholder="ユーザーIDを入力" />,
      validationMessage: VALIDATION_MESSAGE_ID_REQUIRED
    },
    {
      id: FORM_ITEM_ID_PASSWORD,
      labelText: "パスワード",
      formItem: <CInput id={FORM_ITEM_ID_PASSWORD} type="password" placeholder="パスワードを入力" />
    }
  ];
  test("thisFormItemで定義したid属性を持つinput要素が存在していること", () => {
    render(<FormItemGroup thisFormItems={thisFormItems} />);
    const inputIdElement = document.getElementById(FORM_ITEM_ID_USER_ID);
    const inputPasswordElement = document.getElementById(FORM_ITEM_ID_PASSWORD);
    expect(inputIdElement).toBeInTheDocument();
    expect(inputPasswordElement).toBeInTheDocument();
  });
  test("validationMessageとして渡されている文字列が表示されていること", () => {
    render(<FormItemGroup thisFormItems={thisFormItems} />);
    expect(screen.getByText(VALIDATION_MESSAGE_ID_REQUIRED)).toBeInTheDocument();
  });
});
