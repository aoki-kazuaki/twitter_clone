import CButton from "@/components/atoms/CButton";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, test } from "vitest";
import CMenuBar, { type MenubarItems } from ".";

describe("components/molecules/CMenuBarテスト", () => {
  /**トリガーノードのテキスト */
  const TRIGGER_NODE_BUTTON_TEXT = "open";
  /**表示されている要素のクリックイベント検証で使用 */
  const shouldCalledMockFn = vi.fn();
  /**非表示要素のクリックイベント検証で使用(呼び出されないこと) */
  const shouldNotCalledMockFn = vi.fn();

  //Props値
  const menubarItems: MenubarItems[] = [
    { menubarItemText: "編集", onClick: shouldCalledMockFn, itemHidden: false, disabled: false },
    { menubarItemText: "削除", onClick: () => alert("削除をクリックしました"), itemHidden: false, disabled: false },
    { menubarItemText: "非表示項目", onClick: () => alert("表示されません"), itemHidden: true, disabled: false },
    { menubarItemText: "無効項目", onClick: shouldNotCalledMockFn, itemHidden: false, disabled: true }
  ];

  test("トリガーノードをクリックした際に一覧としてRole「menu」が表示されていること, ", async () => {
    render(<CMenuBar menubarTriggerNode={<CButton>{TRIGGER_NODE_BUTTON_TEXT}</CButton>} menubarItems={menubarItems} />);
    const triggerNode = screen.getByRole("button", { name: TRIGGER_NODE_BUTTON_TEXT });
    await userEvent.click(triggerNode);
    const menu = await screen.findByRole("menu");
    expect(menu).toBeInTheDocument();
  });

  test("一覧表示されるrole, 「menuitem」で編集をクリックした際にイベントが事前定義したモックイベントが呼びだされていること", async () => {
    render(<CMenuBar menubarTriggerNode={<CButton>{TRIGGER_NODE_BUTTON_TEXT}</CButton>} menubarItems={menubarItems} />);
    const triggerNode = screen.getByRole("button", { name: TRIGGER_NODE_BUTTON_TEXT });
    await userEvent.click(triggerNode);
    const menu = await screen.findByRole("menu");
    expect(menu).toBeInTheDocument();
    const editButton = await screen.findByRole("menuitem", { name: "編集" });
    await userEvent.click(editButton);
    expect(shouldCalledMockFn).toBeCalled();
  });

  test("一覧表示されるrole, 「menuitem」で無効項目がクリック不可のdisabled属性を持っていること ", async () => {
    render(<CMenuBar menubarTriggerNode={<CButton>{TRIGGER_NODE_BUTTON_TEXT}</CButton>} menubarItems={menubarItems} />);
    const triggerNode = screen.getByRole("button", { name: TRIGGER_NODE_BUTTON_TEXT });
    await userEvent.click(triggerNode);
    const menu = await screen.findByRole("menu");
    expect(menu).toBeInTheDocument();
    const disabledItem = await screen.findByRole("menuitem", { name: "無効項目" });
    expect(disabledItem).toBeDisabled();
  });

  test("一覧表示されるrole, 「menuitem」で非表示要素の「非表示項目」が存在しないこと ", async () => {
    render(<CMenuBar menubarTriggerNode={<CButton>{TRIGGER_NODE_BUTTON_TEXT}</CButton>} menubarItems={menubarItems} />);
    const triggerNode = screen.getByRole("button", { name: TRIGGER_NODE_BUTTON_TEXT });
    await userEvent.click(triggerNode);
    const menu = await screen.findByRole("menu");
    expect(menu).toBeInTheDocument();
  });
});
