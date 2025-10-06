import CAccordion from "@/components/molecules/CAccordion";
import Container from "@/components/molecules/Container";
import type { FC } from "react";

type Props = {};

const HomeAccordionProfileArea: FC<Props> = () => {
  return (
    <>
      <CAccordion
        accordionItems={[
          {
            triggerText: "MyProfile",
            accordionContent: (
              <div className="flex flex-col gap-1">
                <p>
                  <strong>氏名:</strong> K. Aoki
                </p>
                <p>
                  <strong>年齢:</strong> 33歳
                </p>
                <p>
                  <strong>所在地:</strong> 東京都 多摩の西側
                </p>
                <p>
                  <strong>エンジニア歴:</strong> 2023年8月(3年目)
                </p>
                <p>
                  <strong>専門分野:</strong> フロントエンド開発(React /Vue.js)
                </p>
                <p>
                  <strong>経験分野:</strong> python(FastAPI), Java(SpringBoot)
                </p>
                <p>
                  <strong>コーディングする際に気を付けていること:</strong>
                  <br />
                  - tsxファイルの記述量を増やしすぎないこと
                  <br />
                  - 命名から推測が難しい場合必ずコメントを入れること(JsDoc)
                  <br />- ロジックは上から必ず上から下へ順に読めるように記入
                </p>
                <p>
                  <strong>生活と趣味:</strong> 水槽、家庭菜園、読書、子育て
                </p>
              </div>
            )
          },
          {
            triggerText: "Why I Created This Application",
            accordionContent: (
              <div>
                <p>
                  実務で培ったフロントエンドの基本実装スキル（UI構成、ルーティング管理、テスト、Atomic
                  Design構成）と、バックエンド・クラウド連携経験を総合的に示すために制作しました。
                </p>
              </div>
            )
          },
          {
            triggerText: "This App Frontend Tech Stack Selection",
            accordionContent: (
              <div className="flex flex-col gap-1">
                <p>
                  <strong>フレームワーク:</strong> React 19 + Vite
                </p>
                <p>
                  <strong>ルーティング:</strong> React Router DOM v7
                </p>
                <p>
                  <strong>UIコンポーネント:</strong> Radix UI + Shadcn/UI
                </p>
                <p>
                  <strong>スタイリング:</strong> Tailwind CSS
                </p>
                <p>
                  <strong>フォーム管理:</strong> react-hook-form
                </p>
                <p>
                  <strong>状態管理:</strong> Jotai
                </p>
                <p>
                  <strong>日付管理:</strong> dayjs
                </p>
                <p>
                  <strong>バリデーション:</strong> Zod
                </p>
                <p>
                  <strong>API通信</strong> Axios
                </p>
                <p>
                  <strong>開発環境:</strong> TypeScript + ESLint + Prettier
                </p>
              </div>
            )
          },
          { triggerText: "This App Backend Tech Stack Selection", accordionContent: <Container>still</Container> },
          { triggerText: "This App Cloud Tech Selection", accordionContent: <Container>still</Container> },
          {
            triggerText: "Other Technologies I Have Experience With",
            accordionContent: (
              <div className="flex flex-col gap-1">
                <p>
                  <strong>フレームワーク:</strong> Vue 3
                </p>
                <p>
                  <strong>UIコンポーネント:</strong> MUI (Material-UI)
                </p>
                <p>
                  <strong>スタイリング:</strong> styled-components, Emotion
                </p>
                <p>
                  <strong>状態管理:</strong> Redux Toolkit
                </p>
                <p>
                  <strong>バリデーション:</strong> Yup, VeeValidate
                </p>
                <p>
                  <strong>テスト:</strong> Jest, Vitest, Playwright
                </p>
              </div>
            )
          },
          {
            triggerText: "Additional Experience",
            accordionContent: (
              <div className="flex flex-col gap-1">
                <p>
                  <strong>コーディングガイドライン:</strong> 作成・運用(README)
                </p>
                <p>
                  <strong>テスト:</strong> 単体テストおよびE2Eテスト（Playwright）によるリグレッションテストケース作成
                </p>
                <p>
                  <strong>コードレビュー:</strong> フロントエンド知見者が少ないチームでのレビュー経験（品質維持と改善提案）
                </p>
                <p>
                  <strong>UIカタログ:</strong> StorybookによるUIコンポーネントカタログの作成
                </p>
              </div>
            )
          },
          {
            triggerText: "Output",
            accordionContent: (
              <Container>
                <div className="flex flex-col gap-2">
                  <a href="https://github.com/aoki-kazuaki/twitter_clone/tree/develop" target="_blank" rel="noopener noreferrer">
                    <strong>Go To My Github Account</strong>
                  </a>
                  <a href="https://qiita.com/nuhaha_2023" target="_blank" rel="noopener noreferrer">
                    <strong>Go To My QiitaAccount</strong>
                  </a>
                </div>
              </Container>
            )
          }
        ]}
      />
    </>
  );
};
export default HomeAccordionProfileArea;
