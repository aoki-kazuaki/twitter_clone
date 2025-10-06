import { TEST_TARGET_TEXT } from "@/constants/unitTest";
import { render, screen } from "@testing-library/react";
import { describe, expect, test } from "vitest";
import CContainer from ".";

describe("components/molecules/CContainerテスト", () => {
  test("ラッパーコンポーネント childrenに与えられた文字列が表示されていることの検証", () => {
    render(
      <CContainer>
        <p>{TEST_TARGET_TEXT}</p>
      </CContainer>
    );
    expect(screen.getByText(TEST_TARGET_TEXT)).toBeInTheDocument();
  });
});
