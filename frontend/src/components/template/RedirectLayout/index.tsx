import Container from "@/components/molecules/Container";
import RedirectGuideCard from "@/components/organisms/Redirect/GuideCard";
import type { FC } from "react";
import { Outlet } from "react-router-dom";

type Props = {};

const RedirectLayout: FC<Props> = () => {
  // 認証切れを起こしていた際は「認証が切れたため再度ログインが必要です」
  // 認証自体が存在しないない場合「何も表示しない」
  //認証自体が成功した場合は、強制的にタイムラインに遷移する。

  //ログイン画面とアカウント作成画面はOutletでポップアップ表示
  return (
    <>
      <Container className="flex items-center justify-center py-7">
        <RedirectGuideCard />
      </Container>
      <Outlet />
    </>
  );
};
export default RedirectLayout;
