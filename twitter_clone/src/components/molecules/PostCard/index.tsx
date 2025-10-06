import CButton from "@/components/atoms/CButton";
import CImage from "@/components/atoms/CImage";
import type { PostResponse } from "@/types/post";
import { dateFormatRelative } from "@/utils/date";
import clsx from "clsx";
import dayjs from "dayjs";
import { Heart, MessageCircle } from "lucide-react";
import type { ComponentPropsWithoutRef, FC, ReactNode } from "react";
import CAvatar from "../CAvator";
import CMenuBar, { type MenubarItems } from "../CMenuBar";

/**非アクティブモードでは配列1個目の画像のみを表示する。index番号 */
const FILES_FIRST_INDEX = 0;
/** 非アクティブモードで参照可能なファイル数 */
const NOT_ACTIVE_CURRENT_VIEW_FILE_LENGTH = 1;

export type PostCardProps = {
  replyClickEvent?: () => void;
  likeButtonClickEvent?: () => void;
  isActive?: boolean;
  likeLoadingDisabled?: boolean;
};

type Props = PostCardProps & {
  postResponse: PostResponse;
  menubarTriggerNode: ReactNode;
  menubarItems: MenubarItems[];
} & ComponentPropsWithoutRef<"div">;

const PostCard: FC<Props> = ({
  postResponse,
  replyClickEvent,
  likeButtonClickEvent,
  isActive = false,
  likeLoadingDisabled = false,
  menubarTriggerNode,
  menubarItems,
  ...other
}) => {
  /** アップロードファイルが存在している場合*/
  const postFilesExists = Boolean(postResponse.postedFileUrls.length);

  /**非アクティブ状態でアップロードファイルが複数存在している場合、他~枚の画像と表示するテキストを返す */
  const viewOtherPostFilesLength: () => string = () => {
    if (postResponse.postedFileUrls.length <= NOT_ACTIVE_CURRENT_VIEW_FILE_LENGTH) return "";
    return `...その他${postResponse.postedFileUrls.length - NOT_ACTIVE_CURRENT_VIEW_FILE_LENGTH}件のファイルがあります`;
  };

  /**リプライ数が0件の場合はリプライ表示ボタンを非活性化 */
  const repliesExists = postResponse.repliesCount > 0;

  return (
    <div className="border-y-2 py-2" {...other}>
      <div className="flex gap-1">
        <div>
          <CAvatar size={"md"} src={postResponse.userAvatarUrl} />
        </div>
        <div className="flex-1">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-1">
              <p className="truncate text-lg font-bold">{postResponse.userHandleName}</p>
              <p className="truncate font-light">
                <span>@</span>
                {postResponse.userHandleId}
              </p>
              <p className="font-light">{dateFormatRelative(dayjs(postResponse.createdAt))}</p>
            </div>
            <div>
              <CMenuBar menubarTriggerNode={menubarTriggerNode} menubarItems={menubarItems} />
            </div>
          </div>
          <div className="flex flex-col gap-4">
            <p>{postResponse.postedMessage}</p>
            {postFilesExists && (
              <div>
                {isActive ? (
                  <ul className="flex flex-col items-center gap-3">
                    {postResponse.postedFileUrls.map((item) => (
                      <li key={item}>
                        <CImage src={item} />
                      </li>
                    ))}
                  </ul>
                ) : (
                  <div className="mx-auto flex w-10/12 flex-col gap-1">
                    <CImage className="w-full" src={postResponse.postedFileUrls[FILES_FIRST_INDEX]} />
                    <p className="text-right">{viewOtherPostFilesLength()}</p>
                  </div>
                )}
              </div>
            )}
            <div className="flex items-center gap-3">
              <CButton disabled={!repliesExists} variant={"ghost"} className="flex gap-1">
                <MessageCircle />
                <span>{postResponse.repliesCount}</span>
              </CButton>
              <CButton variant={"ghost"} className="flex gap-1" disabled={likeLoadingDisabled}>
                <Heart className={clsx("h-6 w-6", postResponse.isLikedByViewer && "fill-red-500 stroke-red-500")} />
                <span>{postResponse.likedCount}</span>
              </CButton>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PostCard;
