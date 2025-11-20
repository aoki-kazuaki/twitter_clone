package com.example.backend.entitiy;

import java.time.LocalDateTime;
import java.util.UUID;

/**
 * テーブル名(論理名):　フォロー関係テーブル
 * 備考・説明: 中間テーブルでユーザー間フォローフォロワー関係を管理する
 */
public class UserFollowRelationship {
    private UUID followFromUserUuid;            //フォロー元ユーザーUUID
    private UUID followToUserUuid;              //フォロー先ユーザーUUID　
    private LocalDateTime followedAtTimestamp;  //フォローした日時情報
}
