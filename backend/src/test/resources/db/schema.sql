CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- =====================================
-- ユーザー認証マスタ
-- =====================================
CREATE TABLE user_auth_master (
    user_uuid UUID PRIMARY KEY,
    user_id VARCHAR(255) NOT NULL UNIQUE,
    user_password VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL,
    is_deleted INTEGER DEFAULT 0,
    deleted_at TIMESTAMP
);

-- =====================================
-- ユーザープロフィール
-- =====================================
CREATE TABLE user_profile (
    user_uuid UUID PRIMARY KEY
        REFERENCES user_auth_master(user_uuid)
        ON DELETE CASCADE,
    user_id VARCHAR(255) NOT NULL,
    handle_name VARCHAR(32) NOT NULL,
    greeting_message TEXT,
    profile_image_url TEXT,
    profile_background_image_url TEXT,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL
);

-- =====================================
-- 投稿内容管理テーブル
-- =====================================
CREATE TABLE posts_all (
    post_uuid UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_uuid UUID NOT NULL
        REFERENCES user_auth_master(user_uuid)
        ON DELETE CASCADE,
    post_main TEXT NOT NULL,
    post_child_flag INTEGER NOT NULL DEFAULT 0,
    post_parent_target_uuid UUID,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    is_deleted INTEGER NOT NULL DEFAULT 0,
    deleted_at TIMESTAMP
);

-- =====================================
-- 投稿画像関係テーブル
-- =====================================
CREATE TABLE posts_images_relationship (
    relation_uuid UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    post_uuid UUID NOT NULL
        REFERENCES posts_all(post_uuid)
        ON DELETE CASCADE,
    post_image_url TEXT NOT NULL,
    display_order INTEGER NOT NULL,
    is_main INTEGER NOT NULL DEFAULT 0,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- =====================================
-- フォロー関係テーブル
-- =====================================
CREATE TABLE users_follow_relationship (
    follow_from_user_uuid UUID NOT NULL
        REFERENCES user_auth_master(user_uuid)
        ON DELETE CASCADE,
    follow_to_user_uuid UUID NOT NULL
        REFERENCES user_auth_master(user_uuid)
        ON DELETE CASCADE,
    followed_at_timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL,
    PRIMARY KEY (follow_from_user_uuid, follow_to_user_uuid)
);

-- =====================================
-- いいね関係テーブル
-- =====================================
CREATE TABLE user_liked_relationship (
    like_from_user_uuid UUID NOT NULL
        REFERENCES user_auth_master(user_uuid)
        ON DELETE CASCADE,
    like_to_post_uuid UUID NOT NULL
        REFERENCES posts_all(post_uuid)
        ON DELETE CASCADE,
    liked_at_timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL,
    PRIMARY KEY (like_from_user_uuid, like_to_post_uuid)
);

-- =====================================
-- リフレッシュトークン管理テーブル
-- =====================================
CREATE TABLE auth_refresh_tokens (
    relation_uuid UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_uuid UUID NOT NULL
        REFERENCES user_auth_master(user_uuid)
        ON DELETE CASCADE,
    issued_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    expires_at TIMESTAMP,
    revoked INTEGER NOT NULL DEFAULT 0
);