import { TEST_TARGET_TEXT } from "@/constants/unitTest";
import { render, screen } from "@testing-library/react";
import { describe, expect, test } from "vitest";
import CCard from ".";

describe("components/molecules/CCardテスト", () => {
  test("cardTitleで渡したテキストが表示されていること", () => {
    render(<CCard cardTitle={TEST_TARGET_TEXT} />);
    expect(screen.getByText(TEST_TARGET_TEXT)).toBeInTheDocument();
  });

  test("descriptionで渡したテキストが表示されていること", () => {
    render(<CCard cardTitle="カードタイトル" description={TEST_TARGET_TEXT} />);
    expect(screen.getByText(TEST_TARGET_TEXT)).toBeInTheDocument();
  });

  test("childrenで渡したテキストがコンテンツとして表示されていること", () => {
    render(
      <CCard cardTitle="カードタイトル">
        <p>{TEST_TARGET_TEXT}</p>
      </CCard>
    );
    expect(screen.getByText(TEST_TARGET_TEXT)).toBeInTheDocument();
  });
});
