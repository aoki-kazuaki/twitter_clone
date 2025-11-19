package com.example.backend.entitiy;

import java.time.LocalDateTime;
import java.util.UUID;

/**
 * テーブル名(論理名):　投稿画像関係テーブル
 * 備考・説明: 中間テーブルで投稿と画像の相互関係を管理する
 */
public class PostImagesRelationship {
    private UUID relationUuid;
    private UUID postUuid;
    private String post_image_url;
    private Integer displayOrder;           //投稿表示順
    private Integer isMain;                 //0: メイン画像ではない, 1: メイン画像である
    private LocalDateTime createdAt;
}
