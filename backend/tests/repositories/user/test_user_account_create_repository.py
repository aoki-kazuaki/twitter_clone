import uuid

import pytest

from app.core.error_codes import UserAccountCreateErrorCodes
from app.repositories.user_account_repository import user_account_create
from app.db.test_connection import get_test_connection


@pytest.fixture(autouse=True)  # テストの実行前と実行後で自動的に実行される
def cleanup_user_tables():
    """
    各テスト実行前後で user 系テーブルを初期化すること
    """
    with get_test_connection() as conn:
        with conn.cursor() as cur:
            # TRUNCATE -> テーブルの中身を全部消す
            # RESTART IDENTITY -> AUTO_INCREMENT(連番の生成)をリセットする。
            # CASCADE FK制約がある関連テーブルもまとめて消す
            cur.execute("""
                TRUNCATE TABLE
                    user_profile,
                    user_auth
                RESTART IDENTITY CASCADE
                """)
        conn.commit()

    yield

    with get_test_connection() as conn:
        with conn.cursor() as cur:
            cur.execute("""
                TRUNCATE TABLE
                    user_profile,
                    user_auth
                RESTART IDENTITY CASCADE
                """)
        conn.commit()


class TestUserAccountCreateRepository:
    """
    API名称(論理名): ユーザーアカウント作成
    API名称(物理名): UserAccountCreate
    HTTPメソッド: POST
    """

    def test_create_user_success(self):
        """
        ユーザー情報が正常に登録されること
        """
        user_uuid = str(uuid.uuid4())
        test_user_id = "TEST_USER_001"

        user_account_create(
            user_uuid=user_uuid,
            user_id=test_user_id,
            user_password="password123",
            handle_name="ユーザー名",
            greeting_message="こんにちは！",
        )

        with get_test_connection() as conn:
            with conn.cursor() as cur:
                cur.execute(
                    """
                    SELECT user_id
                    FROM user_auth
                    WHERE user_uuid = %s
                    """,
                    (user_uuid,),
                )
                user_auth_result = cur.fetchone()

                cur.execute(
                    """
                    SELECT handle_name, greeting_message
                    FROM user_profile
                    WHERE user_uuid = %s
                    """,
                    (user_uuid,),
                )
                user_profile_result = cur.fetchone()

        assert user_auth_result is not None
        assert user_auth_result[0] == test_user_id

        assert user_profile_result is not None
        assert user_profile_result[0] == "ユーザー名"
        assert user_profile_result[1] == "こんにちは！"

    def test_create_user_duplicate(self):
        """
        同一ユーザーIDが既に存在する場合、
        DUPLICATE_USER_ID が返却されること
        """
        test_user_id = "TEST_USER_001"

        user_account_create(
            user_uuid=str(uuid.uuid4()),
            user_id=test_user_id,
            user_password="password123",
            handle_name="ユーザー名",
            greeting_message="こんにちは！",
        )

        with pytest.raises(ValueError) as error:
            user_account_create(
                user_uuid=str(uuid.uuid4()),
                user_id=test_user_id,
                user_password="password123",
                handle_name="別ユーザー",
                greeting_message="重複テスト",
            )

        assert str(error.value) == UserAccountCreateErrorCodes.DUPLICATE_USER_ID
