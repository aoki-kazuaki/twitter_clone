import CButton from "@/components/atoms/CButton";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, test, vi } from "vitest";
import CMenuBar, { type MenubarItems } from ".";

describe("components/molecules/CMenuBarテスト", () => {
  const TRIGGER_NODE_BUTTON_TEXT = "open";
  const shouldCalledMockFn = vi.fn();
  const shouldNotCalledMockFn = vi.fn();

  const menubarItems: MenubarItems[] = [
    { menubarItemText: "編集", onClick: shouldCalledMockFn, itemHidden: false, disabled: false },
    { menubarItemText: "削除", onClick: () => alert("削除をクリックしました"), itemHidden: false, disabled: false },
    { menubarItemText: "非表示項目", onClick: () => alert("表示されません"), itemHidden: true, disabled: false },
    { menubarItemText: "無効項目", onClick: shouldNotCalledMockFn, itemHidden: false, disabled: true }
  ];

  const setup = () => render(<CMenuBar menubarTriggerNode={<CButton>{TRIGGER_NODE_BUTTON_TEXT}</CButton>} menubarItems={menubarItems} />);

  test("トリガーをクリックすると Role='menu' の一覧が表示されること", async () => {
    setup();
    const triggerNode = screen.getByRole("menuitem", { name: TRIGGER_NODE_BUTTON_TEXT });
    await userEvent.click(triggerNode);
    const menu = await screen.findByRole("menu");
    expect(menu).toBeInTheDocument();
  });

  test("一覧内の '編集' をクリックするとモック関数が呼び出されること", async () => {
    setup();
    const triggerNode = screen.getByRole("menuitem", { name: TRIGGER_NODE_BUTTON_TEXT });
    await userEvent.click(triggerNode);
    const editButton = await screen.findByRole("menuitem", { name: "編集" });
    await userEvent.click(editButton);
    expect(shouldCalledMockFn).toHaveBeenCalledTimes(1);
  });

  test("非表示設定の項目（非表示項目）は描画されないこと", async () => {
    setup();
    const triggerNode = screen.getByRole("menuitem", { name: TRIGGER_NODE_BUTTON_TEXT });
    await userEvent.click(triggerNode);
    const hiddenItem = screen.queryByRole("menuitem", { name: "非表示項目" });
    expect(hiddenItem).toBeNull();
  });
});
