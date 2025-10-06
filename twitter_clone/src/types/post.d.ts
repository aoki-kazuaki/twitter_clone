/**
 * 投稿済み内容の型情報管理
 */
export type PostResponse = {
  /** 投稿識別UUID */
  postUuid: string;
  /** 投稿者のユニークなハンドルID（@username） */
  userHandleId: string;
  /** 投稿者の表示名（プロフィールに設定された名前） */
  userHandleName: string;
  /** 投稿者のアバター画像URL */
  userAvatarUrl: string;
  /** 投稿作成日時（ISO8601 timestamp） */
  createdAt: string;
  /** 投稿最終更新日時（ISO8601 timestamp） */
  updatedAt: string;
  /** 投稿本文メッセージ */
  postedMessage: string;
  /** 添付ファイル（画像/動画など）のURLリスト */
  postedFileUrls: string[];
  /** いいね数 */
  likedCount: number;
  /** 現在ログインしているユーザーが「いいね」しているかどうか */
  isLikedByViewer: boolean;
  /**「いいね」を有効化した時刻 （ISO8601 timestamp） */
  likedAt?: string | null;
  /** リプライ数 */
  repliesCount: number;
  /** 投稿が削除フラグ(論理削除) 0->未削除, 1→削除済み */
  isDeleted: number;
  /** 削除された日時（isDeleted = true のときのみセットされる） */
  deletedAt?: string;
};
