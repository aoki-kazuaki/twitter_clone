import RedirectLoginDialog from "@/components/organisms/Redirect/LoginDialog";
import RedirectRegisterDialog from "@/components/organisms/Redirect/RegisterDialog";
import Home from "@/components/pages/Home";
import Posts from "@/components/pages/Posts";
import Redirect from "@/components/pages/Redirect";
import { createBrowserRouter, type RouteObject } from "react-router-dom";

type CustomRouteObject = RouteObject & {
  pageTitle: string;
  description: string;
  loginRequired?: boolean;
  children?: CustomRouteObject[];
};

const routes: CustomRouteObject[] = [
  {
    path: "/",
    element: <Home />,
    pageTitle: "トップページ",
    description: "ポートフォリオ紹介プロフィールページ",
    loginRequired: false
  },
  {
    path: "/redirect",
    element: <Redirect />,
    pageTitle: "リダイレクトページ",
    description: "招待パスワード入力後に遷移ユーザー認証に失敗した場合は登録フォーム or ログイン画面を開く",
    loginRequired: false,
    children: [
      {
        path: "register",
        element: <RedirectRegisterDialog />,
        pageTitle: "",
        description: "リダイレクト -> パス遷移表示ダイアログ 新規ユーザー登録フォーム",
        loginRequired: false
      },
      {
        path: "login",
        element: <RedirectLoginDialog />,
        pageTitle: "",
        description: "リダイレクト -> パス遷移表示ダイアログ 既存ユーザーログインフォーム",
        loginRequired: false
      }
    ]
  },
  {
    path: "/posts",
    element: <Posts />,
    pageTitle: "投稿管理ページ",
    description: "投稿内容を表示するページ",
    loginRequired: true
  }
];

export const router = createBrowserRouter(routes);
