import { TEST_TARGET_TEXT } from "@/constants/unitTest";
import { render, screen } from "@testing-library/react";
import { describe, expect, test } from "vitest";
import CButton from ".";

describe("components/atoms/CButtonテスト", () => {
  const viMockFn = vi.fn();
  test("childrenで与えられた文字列がCButton内で表示されていること", () => {
    render(<CButton>{TEST_TARGET_TEXT}</CButton>);
    const button = screen.getByRole("button");
    expect(button.textContent === TEST_TARGET_TEXT).toBeTruthy();
  });

  test("CButtonに与えられたクリックイベントが発生していること", () => {
    render(<CButton onClick={viMockFn}>ボタン</CButton>);
    expect(viMockFn).toHaveBeenCalledOnce;
  });
});
