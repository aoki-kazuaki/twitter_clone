import CInput from "@/components/atoms/CInput";
import { TEST_TARGET_TEXT } from "@/constants/unitTest";
import { render, screen } from "@testing-library/react";
import { describe, expect, test } from "vitest";
import FormItem from ".";

describe("components/molecules/FormITemテスト", () => {
  const itemTargetId = "itemTargetId";
  test("formItemとして渡されたidを持つInput要素が出力されていること", () => {
    render(<FormItem id={itemTargetId} labelText="ラベルテキスト" formItem={<CInput id={itemTargetId} />} />);
    const inputElement = document.getElementById(itemTargetId);
    expect(inputElement).toBeInTheDocument();
  });
  test("labelTextとして与えられた文字列が出力されていること", () => {
    render(<FormItem id={itemTargetId} labelText={TEST_TARGET_TEXT} formItem={<CInput id={itemTargetId} />} />);
    expect(screen.getByText(TEST_TARGET_TEXT)).toBeInTheDocument();
  });
  test("validationMessageとして与えられた文字列が出力されていること", () => {
    render(<FormItem id={itemTargetId} labelText="ラベルテキスト" formItem={<CInput id={itemTargetId} />} validationMessage={TEST_TARGET_TEXT} />);
    expect(screen.getByText(TEST_TARGET_TEXT)).toBeInTheDocument();
  });
});
