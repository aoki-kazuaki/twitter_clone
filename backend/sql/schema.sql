-- テーブルID: userAuthMaster
-- テーブル名（論理名）: ユーザー認証マスタ
-- テーブル名（物理名）: user_auth
-- 備考・説明: 登録済みユーザーID, ユーザーUUID, パスワードを管理する。
CREATE TABLE IF NOT EXISTS user_auth(
    user_uuid UUID PRIMARY KEY,
    user_id VARCHAR(255) NOT NULL UNIQUE,
    user_password VARCHAR(255) NOT NULL,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    is_deleted INTEGER NOT NULL DEFAULT 0,
    deleted_at TIMESTAMP NULL
);

-- テーブルID: userProfile
-- テーブル名（論理名）: ユーザープロフィール
-- テーブル名（物理名）: user_profile
-- 備考・説明: ユーザープロフィールを管理する, ユーザーUUID以外は公開情報
CREATE TABLE IF NOT EXISTS user_profile(
    user_uuid UUID PRIMARY KEY,
    handle_name VARCHAR(32) NOT NULL,
    greeting_message TEXT,
    profile_image_url TEXT,
    profile_background_image_url TEXT,
    updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);