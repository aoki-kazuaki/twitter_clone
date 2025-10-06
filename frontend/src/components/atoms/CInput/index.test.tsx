import { TEST_TARGET_TEXT } from "@/constants/unitTest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, test } from "vitest";
import CInput from ".";

describe("components/atoms/CInputテスト", () => {
  const viMockFn = vi.fn();
  test("placeHolderが反映されていること", () => {
    render(<CInput placeholder={TEST_TARGET_TEXT} />);
    expect(screen.getByPlaceholderText(TEST_TARGET_TEXT)).toBeInTheDocument();
  });
  test("onChangeのモックイベントが文字列の回数分呼ばれ、かつ入力値が反映されていること", async () => {
    render(<CInput onChange={viMockFn} />);
    const input = screen.getByRole("textbox");
    await userEvent.type(input, TEST_TARGET_TEXT);
    expect(viMockFn).toHaveBeenCalledTimes(TEST_TARGET_TEXT.length);
    expect(input).toHaveValue(TEST_TARGET_TEXT);
  });
});
