package com.example.backend.entitiy;

import java.time.LocalDateTime;
import java.util.UUID;

/**
 * テーブル名(論理名):　リフレッシュトークン管理テーブル
 * 備考・説明: ログイン認証リフレッシュトークン管理テーブル
 */
public class AuthRefreshTokens {
    private UUID refreshTokenUuid;
    private UUID userUuid;
    private LocalDateTime issuedAt;     //発行日時
    private LocalDateTime expiresAt;    //有効期限
    private Integer revoked;            //無効化フラグ　0:無効化されていない, 1: 無効化されている
}
