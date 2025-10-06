import { Menubar, MenubarContent, MenubarItem, MenubarMenu, MenubarTrigger } from "@/components/zShadcnBase/menubar";
import type { FC, ReactNode } from "react";

/**
 * menuBarを呼び出すコンポーネント上で定義し、配列定義でpropsを引き渡す
 * menubarItemText -> 表示される文字列
 * onClick -> クリック時に実行される関数
 * itemHidden -> 常時表示はfalse, 条件付き切り替えではtrue時に非表示
 * disabled -> 常時クリック可能なものはfalse, 条件付き切り替えではtrueでクリック不可とする
 */
export type MenubarItems = {
  menubarItemText: string | number;
  onClick: () => void;
  itemHidden: boolean;
  disabled: boolean;
};

type Props = {
  menubarTriggerNode: ReactNode;
  menubarItems: MenubarItems[];
};

const CMenuBar: FC<Props> = ({ menubarTriggerNode, menubarItems }) => {
  /**itemHiddenの値がtrue(非表示)となっている選択肢を除外した配列を返す */
  const filteredHiddenItems: MenubarItems[] = menubarItems.filter((item) => !item.itemHidden);

  return (
    <Menubar>
      <MenubarMenu>
        <MenubarTrigger className="border-0">{menubarTriggerNode}</MenubarTrigger>
        <MenubarContent>
          {filteredHiddenItems.map((detail) => (
            <MenubarItem inset key={detail.menubarItemText} onClick={detail.onClick} disabled={detail.disabled}>
              {detail.menubarItemText}
            </MenubarItem>
          ))}
        </MenubarContent>
      </MenubarMenu>
    </Menubar>
  );
};
export default CMenuBar;
