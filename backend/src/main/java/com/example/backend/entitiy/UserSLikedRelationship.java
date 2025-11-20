package com.example.backend.entitiy;

import java.time.LocalDateTime;
import java.util.UUID;

/**
 * テーブル名(論理名):　いいね関係テーブル
 * 備考・説明: 中間テーブルでユーザー間いいね相互関係を管理する
 */
public class UserSLikedRelationship {
    private UUID likeFromUserUuid;              //いいねを選択したユーザーUUID
    private UUID likedToPostUuid;               //ユーザーがいいね選択した投稿UUID
    private LocalDateTime likedAtTimeStamp;
}
