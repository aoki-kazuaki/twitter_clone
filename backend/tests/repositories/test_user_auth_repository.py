from uuid import uuid4

from app.db.test_connection import get_test_connection
from app.repositories.user_auth_repository import find_auth_user_by_user_id


class TestAuthLoginRepository:
    def setup_method(self):
        self.user_uuid = str(uuid4())
        self.user_id = f"testUser-{self.user_uuid}"
        self.user_password = "password"

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
                        "user_id": self.user_id,
                        "user_password": self.user_password,
                    },
                )

            conn.commit()

    def teardown_method(self):
        with get_test_connection() as conn:
            with conn.cursor() as cur:
                cur.execute(
                    """
                    DELETE FROM user_auth
                    WHERE user_uuid = %(user_uuid)s
                    """,
                    {"user_uuid": self.user_uuid},
                )

            conn.commit()

    def test_find_auth_user_by_user_id_success(self):
        result = find_auth_user_by_user_id(self.user_id, get_test_connection)

        assert result is not None
        assert result["user_uuid"] == self.user_uuid
        assert result["user_password"] == self.user_password

    def test_find_auth_user_by_user_id_none(self):
        result = find_auth_user_by_user_id("not-exists-user")

        assert result is None
