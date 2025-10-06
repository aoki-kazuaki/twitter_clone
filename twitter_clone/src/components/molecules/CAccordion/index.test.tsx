import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, test } from "vitest";
import CAccordion, { type AccordionItem } from ".";

describe("components/molecules/CAccordionテスト", () => {
  /**トリガー1の情報を持つaccordionItemIndex */
  const ACCORDION_ITEM_FIRST_INDEX = 0;
  /**トリガー2の情報を持つaccordionItemIndex */
  const ACCORDION_ITEM_SECOND_INDEX = 1;

  /** accordionContent childrenが持つpタグ用文字列*/
  const ACCORDION_ITEM_CONTENTS_FIRST_TEXT = "コンテンツ1";
  /** accordionContent childrenが持つpタグ用文字列*/
  const ACCORDION_ITEM_CONTENTS_SECOND_TEXT = "コンテンツ2";

  const accordionItems: AccordionItem[] = [
    {
      triggerText: "トリガー1",
      accordionContent: <p>{ACCORDION_ITEM_CONTENTS_FIRST_TEXT}</p>
    },
    {
      triggerText: "トリガー2",
      accordionContent: <p>{ACCORDION_ITEM_CONTENTS_SECOND_TEXT}</p>
    }
  ];

  test("初回マウント時点では、内部コンテンツが表示されていないこと", () => {
    render(<CAccordion accordionItems={accordionItems} />);
    expect(screen.queryByText(ACCORDION_ITEM_CONTENTS_FIRST_TEXT)).not.toBeInTheDocument();
    expect(screen.queryByText(ACCORDION_ITEM_CONTENTS_SECOND_TEXT)).not.toBeInTheDocument();
  });

  test("アコーディオン切り替えのボタンが渡した配列のlength値分表示されていること", () => {
    render(<CAccordion accordionItems={accordionItems} />);
    const triggerButtons = screen.getAllByRole("button");
    //propsの値からトリガーテキストのみを文字列配列で出力
    const argsTriggerText = accordionItems.map((item) => item.triggerText);
    //コンポーネントから抽出したトリガーテキストのボタンが持つ文字列配列を出力
    const buttonsText = triggerButtons.map((item) => item.textContent);
    expect(buttonsText).toEqual(argsTriggerText);
  });

  test("トリガー1をクリックした際に、画面上でコンテンツ1の文字列が表示されること", async () => {
    render(<CAccordion accordionItems={accordionItems} />);
    const trigger1Button = screen.getByRole("button", {
      name: accordionItems[ACCORDION_ITEM_FIRST_INDEX].triggerText
    });
    await userEvent.click(trigger1Button);
    expect(screen.getByText(ACCORDION_ITEM_CONTENTS_FIRST_TEXT)).toBeInTheDocument();
  });

  test("トリガー1をクリック後にトリガー2をクリック ”コンテンツ1が非表示となりコンテンツ2が表示されていること", async () => {
    render(<CAccordion accordionItems={accordionItems} />);
    const trigger1Button = screen.getByRole("button", {
      name: accordionItems[ACCORDION_ITEM_FIRST_INDEX].triggerText
    });
    const trigger2Button = screen.getByRole("button", {
      name: accordionItems[ACCORDION_ITEM_SECOND_INDEX].triggerText
    });
    await userEvent.click(trigger1Button);
    expect(screen.getByText(ACCORDION_ITEM_CONTENTS_FIRST_TEXT)).toBeInTheDocument();
    await userEvent.click(trigger2Button);
    expect(screen.getByText(ACCORDION_ITEM_CONTENTS_SECOND_TEXT)).toBeInTheDocument();
    expect(screen.queryByText(ACCORDION_ITEM_CONTENTS_FIRST_TEXT)).not.toBeInTheDocument();
  });
});
