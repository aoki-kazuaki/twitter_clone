package com.example.backend.entitiy;

import java.time.LocalDateTime;
import java.util.UUID;

/**
 * テーブル名(論理名):　ユーザープロフィール
 * 備考・説明: ユーザープロフィールを管理する, ユーザーUUID以外は公開情報
 */
public class UserProfile {
    private UUID userUuid;
    private String userId;
    private String handleName;
    private String greetingMessage;
    private String profileImageUrl;
    private String profileBackGroundImageUrl;
    private LocalDateTime updatedAt;
}
