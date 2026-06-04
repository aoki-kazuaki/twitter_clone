from collections.abc import Callable

from psycopg.rows import dict_row

from app.db.connection import get_connection
from app.schemas.repositories.user_auth_repository import (
    UserAuthFindUserAuthByUserIdResult,
)


def find_auth_user_by_user_id(
    user_id: str,
    connection_factory: Callable = get_connection,
) -> UserAuthFindUserAuthByUserIdResult | None:
    """
    登録済みのuser_idから認証情報を取得する
    """
    sql = """
        SELECT
            user_uuid,
            user_password
        FROM user_auth
        WHERE user_id = %(user_id)s
        AND is_deleted = 0
    """

    with connection_factory() as conn:
        with conn.cursor(row_factory=dict_row) as cur:
            cur.execute(
                sql,
                {"user_id": user_id},
            )

            result = cur.fetchone()

            if result is None:
                return None

            return {
                "user_uuid": str(result["user_uuid"]),
                "user_password": result["user_password"],
            }
