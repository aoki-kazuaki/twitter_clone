package com.example.backend.entitiy;

import java.time.LocalDateTime;
import java.util.UUID;

/**
 * テーブル名(論理名):　投稿内容管理テーブル
 * 備考・説明: ユーザーが投稿した内容を一元管理する
 */
public class PostsAll {
    private UUID userUuid;
    private UUID postUuid;
    private String postMain;                //投稿内容文字列
    private Integer postChildFlag;          //0: 子投稿ではない, 1:子投稿である
    private UUID post_parent_target_uuid;   //他投稿への紐づけ、対象親ポスト
    private LocalDateTime createdAt;
    private Integer is_deleted;             //0: 削除未実施, 1: 削除済み
    private LocalDateTime deleted_at;       //削除フラグが1になった日付情報
}
