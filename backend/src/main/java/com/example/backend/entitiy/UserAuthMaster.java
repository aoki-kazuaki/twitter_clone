package com.example.backend.entitiy;

import java.time.LocalDateTime;
import java.util.UUID;

/**
 * テーブル名(論理名):　ユーザー認証マスタ
 * 備考・説明: 登録済みユーザーID, ユーザーUUID, パスワードを管理する
 */
public class UserAuthMaster {
    private UUID userUuid;                  //ユーザーUUID(PK)
    private String userId;                  //ログインID
    private String userPassword;            //ハッシュ化済パスワード
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
    private Integer is_deleted;             //0: 現役　/ 1:削除済
    private LocalDateTime is_deleted_at;    //論理削除実行日時
}

