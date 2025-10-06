import CButton from "@/components/atoms/CButton";
import { TEST_TARGET_TEXT } from "@/constants/unitTest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, test } from "vitest";
import CDrawer from ".";

describe("components/molecules/CDrawerテスト", () => {
  const OPEN_DRAWER_NODE_BUTTON_TEXT = "ドロワー開閉ボタン";

  test("初回マウント時はopenDrawerNodeのみが表示されており、ドロワーコンテンツに該当するタイトル表示がされていないこと", () => {
    render(<CDrawer drawerTitle={TEST_TARGET_TEXT} openDrawerNode={<CButton>{OPEN_DRAWER_NODE_BUTTON_TEXT}</CButton>} />);
    expect(screen.getByRole("button", { name: OPEN_DRAWER_NODE_BUTTON_TEXT })).toBeInTheDocument();
    expect(screen.queryByText(TEST_TARGET_TEXT)).not.toBeInTheDocument();
  });
  test("openDrawerNodeをクリックした際に、ドロワーコンテンツに該当するタイトルが表示されていること", async () => {
    render(<CDrawer drawerTitle={TEST_TARGET_TEXT} openDrawerNode={<CButton>{OPEN_DRAWER_NODE_BUTTON_TEXT}</CButton>} focusTargetId="mockId" />);
    const openDrawerNodeButton = screen.getByRole("button", { name: OPEN_DRAWER_NODE_BUTTON_TEXT });
    await userEvent.click(openDrawerNodeButton);
    expect(await screen.findByText(TEST_TARGET_TEXT)).toBeInTheDocument();
  });

  test("openDrawerNodeをクリックした際に、ドロワーコンテンツに該当するdescriptionが表示されていること", async () => {
    render(<CDrawer drawerTitle={"ドロワータイトル"} description={TEST_TARGET_TEXT} openDrawerNode={<CButton>{OPEN_DRAWER_NODE_BUTTON_TEXT}</CButton>} />);
    const openDrawerNodeButton = screen.getByRole("button", { name: OPEN_DRAWER_NODE_BUTTON_TEXT });
    await userEvent.click(openDrawerNodeButton);
    expect(await screen.findByText(TEST_TARGET_TEXT)).toBeInTheDocument();
  });

  test("openDrawerNodeをクリックした際に、childrenに指定したドロワーコンテンツの文字列が表示されていること", async () => {
    render(
      <CDrawer drawerTitle={"ドロワータイトル"} openDrawerNode={<CButton>{OPEN_DRAWER_NODE_BUTTON_TEXT}</CButton>} focusTargetId="mockId">
        <p>{TEST_TARGET_TEXT}</p>
      </CDrawer>
    );
    const openDrawerNodeButton = screen.getByRole("button", { name: OPEN_DRAWER_NODE_BUTTON_TEXT });
    await userEvent.click(openDrawerNodeButton);
    expect(await screen.findByText(TEST_TARGET_TEXT)).toBeInTheDocument();
  });
});
