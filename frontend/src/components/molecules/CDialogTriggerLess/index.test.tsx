import { TEST_TARGET_TEXT } from "@/constants/unitTest";
import { render, screen } from "@testing-library/react";
import { describe, expect, test } from "vitest";
import CDialogTriggerLess from ".";

describe("components/molecules/CDialogTriggerLessテスト", () => {
  test("", () => {
    render(<CDialogTriggerLess dialogTitle={TEST_TARGET_TEXT} />);
    expect(screen.getByText(TEST_TARGET_TEXT)).toBeInTheDocument();
  });
  test("descriptionで渡したテキストが表示されていること", () => {
    render(<CDialogTriggerLess dialogTitle="ダイアログタイトル" description={TEST_TARGET_TEXT} />);
    expect(screen.getByText(TEST_TARGET_TEXT)).toBeInTheDocument();
  });
  test("", () => {
    render(
      <CDialogTriggerLess dialogTitle="ダイアログタイトル">
        <p>{TEST_TARGET_TEXT}</p>
      </CDialogTriggerLess>
    );
    expect(screen.getByText(TEST_TARGET_TEXT)).toBeInTheDocument();
  });
});
