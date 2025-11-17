CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- =====================================
-- ユーザー認証マスタ
-- =====================================
INSERT INTO user_auth_master (user_uuid, user_id, user_password)
VALUES
    (gen_random_uuid(), 'test_user_1', 'hashed_password_1'),
    (gen_random_uuid(), 'test_user_2', 'hashed_password_2'),
    (gen_random_uuid(), 'test_user_3', 'hashed_password_3');

-- =====================================
-- ユーザープロフィール
-- =====================================
INSERT INTO user_profile(user_uuid, user_id, handle_name, greeting_message, profile_image_url)
SELECT user_uuid, user_id,
    CASE user_id
        WHEN 'test_user_1' THEN 'あおき'
        ELSE 'ゲストユーザー'
    END,
    'こんにちは！これはモックデータです！',
    'https://example.com/profile.jpg'
FROM user_auth_master;

-- =====================================
-- 投稿内容管理テーブル
-- =====================================
WITH parent AS (
    INSERT INTO posts_all (user_uuid, post_main, post_child_flag)
    SELECT
        user_auth_master.user_uuid,
        CONCAT(user_auth_master.user_uuid, 'の親投稿'),
        0
    FROM user_auth_master
    RETURNING post_uuid, user_uuid
)
INSERT INTO posts_all (user_uuid, post_main, post_child_flag, post_parent_target_uuid)
SELECT
    parent.user_uuid,
    CONCAT('子投稿', p.i),
    1,
    parent.post_uuid
FROM parent
CROSS JOIN generate_series(1, 3);

-- =====================================
-- 投稿画像関係テーブル
-- =====================================
WITH post_list AS (
    SELECT
        posts_all.post_uuid,
        ROW_NUMBER() OVER (ORDER BY posts_all.created_at) AS row_no
    FROM posts_all
)
INSERT INTO post_images (
    post_uuid,
    post_image_url,
    display_order,
    is_main
)
SELECT
    post_list.post_uuid,
    CONCAT('https://example.com/image_', post_list.row_no, '_', generate_series),
    generate_series,
    CASE WHEN generate_series = 1 THEN 1 ELSE 0 END
FROM post_list
CROSS JOIN LATERAL (
    SELECT
        CASE
            WHEN post_list.row_no = 1 THEN generate_series(1,1)   -- 1番目 → 1枚
            WHEN post_list.row_no = 2 THEN generate_series(1,3)   -- 2番目 → 3枚
            ELSE generate_series(1,0)                             -- 3番目 → 0枚（生成なし）
        END
) AS t(generate_series);
-- =====================================
-- フォロー関係テーブル
-- =====================================
WITH target_users AS (
    SELECT user_uuid
    FROM user_auth_master
)
INSERT INTO users_follow_relationship (
    follow_from_user_uuid,
    follow_to_user_uuid
)
SELECT
    u1.user_uuid AS follow_from,
    u2.user_uuid AS follow_to
FROM user_auth_master u1
CROSS JOIN user_auth_master u2
WHERE u1.user_uuid <> u2.user_uuid;
-- =====================================
-- いいね関係テーブル
-- =====================================
WITH two_posts AS (
    SELECT post_uuid
    FROM posts_all
    ORDER BY post_uuid
    LIMIT 2
)
INSERT INTO user_liked_relationship (
    like_from_user_uuid,
    like_to_post_uuid
)
SELECT
    u.user_uuid,
    p.post_uuid
FROM user_auth_master u
CROSS JOIN two_posts p;
-- =====================================
-- リフレッシュトークン管理テーブル
-- =====================================

-- test_user_1 → 期限内
INSERT INTO auth_refresh_tokens (
    user_uuid,
    issued_at,
    expires_at,
    revoked
)
SELECT
    u.user_uuid,
    CURRENT_TIMESTAMP - INTERVAL '1 hour',   -- 発行から1時間経過
    CURRENT_TIMESTAMP + INTERVAL '30 days',  -- 有効
    0
FROM user_auth_master u
WHERE u.user_id = 'test_user_1';


-- test_user_2 → 期限切れ
INSERT INTO auth_refresh_tokens (
    user_uuid,
    issued_at,
    expires_at,
    revoked
)
SELECT
    u.user_uuid,
    CURRENT_TIMESTAMP - INTERVAL '40 days',  -- かなり前に発行
    CURRENT_TIMESTAMP - INTERVAL '1 day',    -- 前日に切れている
    0
FROM user_auth_master u
WHERE u.user_id = 'test_user_2';


-- test_user_3 → revoked（手動無効化）
INSERT INTO auth_refresh_tokens (
    user_uuid,
    issued_at,
    expires_at,
    revoked
)
SELECT
    u.user_uuid,
    CURRENT_TIMESTAMP - INTERVAL '1 day',
    CURRENT_TIMESTAMP + INTERVAL '30 days',  -- 有効期限まだ先
    1                                       -- 手動無効化済
FROM user_auth_master u
WHERE u.user_id = 'test_user_3';






