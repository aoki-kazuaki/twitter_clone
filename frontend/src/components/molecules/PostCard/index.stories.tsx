// Wrapper.stories.tsx
import type { PostResponse } from "@/types/post";
import { dateCurrentTimeStamp } from "@/utils/date";
import type { Meta, StoryObj } from "@storybook/react";
import { List } from "lucide-react";
import PostCard, { type PostCardProps } from ".";
import type { MenubarItems } from "../CMenuBar";

type WrapperProps = Partial<PostResponse> &
  PostCardProps & {
    menubarTriggerNode?: React.ReactNode;
    menubarItems?: MenubarItems[];
  };

//投稿内容のデフォルト値
const defaultPost: PostResponse = {
  postUuid: "uuid-123",
  userHandleId: "aoki123",
  userHandleName: "",
  userAvatarUrl: "https://placehold.jp/100x100.png",
  createdAt: dateCurrentTimeStamp(),
  updatedAt: dateCurrentTimeStamp(),
  postedMessage: "",
  postedFileUrls: [],
  likedCount: 0,
  isLikedByViewer: false,
  repliesCount: 0,
  isDeleted: 0
};

// デフォルトのメニューバーアイテム
const defaultMenubarItems: MenubarItems[] = [
  { menubarItemText: "編集", onClick: () => alert("編集をクリックしました"), itemHidden: false, disabled: false },
  { menubarItemText: "削除", onClick: () => alert("削除をクリックしました"), itemHidden: false, disabled: false },
  { menubarItemText: "無効なボタン", onClick: () => {}, itemHidden: false, disabled: true }
];

const Wrapper = ({ isActive, likeLoadingDisabled, menubarTriggerNode, menubarItems, ...args }: WrapperProps) => (
  <PostCard
    postResponse={{ ...defaultPost, ...args }}
    isActive={isActive}
    likeLoadingDisabled={likeLoadingDisabled}
    menubarTriggerNode={<List />}
    menubarItems={menubarItems ?? defaultMenubarItems}
  />
);

const meta = {
  title: "molecules/PostCard",
  component: Wrapper,
  argTypes: {
    userHandleId: { control: "text" },
    userHandleName: { control: "text" },
    createdAt: { control: "text" },
    postedMessage: { control: "text" },
    likedCount: { control: "number" },
    isLikedByViewer: { control: "boolean" },
    isActive: { control: "boolean" },
    likeLoadingDisabled: { control: "boolean" }
  }
} satisfies Meta<typeof Wrapper>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    userHandleId: "userHandleId",
    userHandleName: "ユーザー名",
    postedMessage:
      "よくあるTwitterクローンのようにですがここに投稿したメッセージが表示されるようになっているので特段問題なく使えるんじゃないかと思います。ただしプレミアム登録のような課金機能が存在しないため、一律で200文字程度までをPOSTのメッセージの制限として、バックエンドフロントエンドのバリデーションチェックに採用しています。また、未選択状態では表示される画像の件数は1枚ですが、ユーザーのクリックにより詳細画面が表示されている際などでは、画像が１枚だけ表示されます。",
    likedCount: 42,
    repliesCount: 1,
    postUuid: "uuid-123",
    userAvatarUrl: "https://placehold.jp/100x100.png",
    createdAt: dateCurrentTimeStamp(),
    updatedAt: dateCurrentTimeStamp(),
    postedFileUrls: [],
    isLikedByViewer: false,
    isActive: false,
    likeLoadingDisabled: false
  }
};

export const ImagePosts: Story = {
  args: {
    userHandleId: "userHandleId",
    userHandleName: "ユーザー名",
    postedMessage:
      "画像の投稿にも対応していますが、非アクティブモードの場合は一枚目が表示されます。2枚目が表示されるのは投稿が選択状態になっているときのみです",
    likedCount: 42,
    repliesCount: 1,
    postUuid: "uuid-123",
    userAvatarUrl: "https://placehold.jp/100x100.png",
    createdAt: dateCurrentTimeStamp(),
    updatedAt: dateCurrentTimeStamp(),
    postedFileUrls: ["https://picsum.photos/id/1018/600/400", "https://picsum.photos/id/1015/600/400", "https://picsum.photos/id/1025/600/400"],
    isLikedByViewer: false,
    isActive: true,
    likeLoadingDisabled: false
  }
};
