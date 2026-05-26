from datetime import datetime, timedelta, timezone
from uuid import uuid4

from app.db.test_connection import get_test_connection
from app.repositories.auth_token_repository import (
    find_valid_refresh_token_by_uuid,
    insert_refresh_token,
    revoke_refresh_token_by_user_uuid,
)


class TestAuthTokenRepository:
    # setup_method / teardown_methodはfastAPIの自動実行の特別名称
    def setup_method(self):
        self.user_uuid = str(uuid4())
        self.refresh_token_uuid = str(uuid4())
        self.expires_at = datetime.now(timezone.utc) + timedelta(hours=12)

        with get_test_connection() as conn:
            with conn.cursor() as cur:
                cur.execute(
                    """
                    INSERT INTO user_auth (
                        user_uuid,
                        user_id,
                        user_password
                    )
                    VALUES (
                        %(user_uuid)s,
                        %(user_id)s,
                        %(user_password)s
                    )
                    """,
                    {
                        "user_uuid": self.user_uuid,
                        "user_id": f"test-user-{self.user_uuid}",
                        "user_password": "hashed-password",
                    },
                )

            conn.commit()

    def teardown_method(self):
        with get_test_connection() as conn:
            with conn.cursor() as cur:
                cur.execute(
                    """
                    DELETE FROM auth_refresh_tokens
                    WHERE user_uuid = %(user_uuid)s
                    """,
                    {"user_uuid": self.user_uuid},
                )

                cur.execute(
                    """
                    DELETE FROM user_auth
                    WHERE user_uuid = %(user_uuid)s
                    """,
                    {"user_uuid": self.user_uuid},
                )

            conn.commit()

    def test_insert_refresh_token_success(self):
        insert_refresh_token(
            self.refresh_token_uuid,
            self.user_uuid,
            self.expires_at,
        )

        result = find_valid_refresh_token_by_uuid(self.refresh_token_uuid, get_test_connection)

        assert result is not None
        assert result["expires_at"] is not None

    def test_revoke_refresh_token_by_user_uuid_success(self):
        insert_refresh_token(
            self.refresh_token_uuid,
            self.user_uuid,
            self.expires_at,
        )

        revoke_refresh_token_by_user_uuid(self.user_uuid, get_test_connection)

        result = find_valid_refresh_token_by_uuid(
            self.refresh_token_uuid,
        )

        assert result is None
