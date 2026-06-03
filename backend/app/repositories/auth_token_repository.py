from collections.abc import Callable
from datetime import datetime

from app.db.connection import get_connection
from psycopg.rows import dict_row

from app.schemas.repositories.user_auth_login_repository import FindAuthRefreshTokenByRefreshTokenUuidResult


def insert_refresh_token(
    refresh_token_uuid: str,
    user_uuid: str,
    expires_at: datetime,
    connection_factory: Callable = get_connection,
) -> None:
    """
    user_uuidに対応したリフレッシュトークンをDB保存する
    """
    sql = """
        INSERT INTO auth_refresh_tokens (
            refresh_token_uuid,
            user_uuid,
            expires_at
        )
        VALUES (
            %(refresh_token_uuid)s,
            %(user_uuid)s,
            %(expires_at)s
        )
    """

    with connection_factory() as conn:
        try:
            with conn.cursor() as cur:
                cur.execute(
                    sql,
                    {
                        "refresh_token_uuid": refresh_token_uuid,
                        "user_uuid": user_uuid,
                        "expires_at": expires_at,
                    },
                )

            conn.commit()

        except Exception:
            conn.rollback()
            raise


def find_valid_refresh_token_by_uuid(
    refresh_token_uuid: str,
    connection_factory: Callable = get_connection,
) -> dict | None:
    """
    保存済みのリフレッシュトークンを抽出する。
    無効化されている場合は非対象とする。
    """
    sql = """
        SELECT
            expires_at
        FROM auth_refresh_tokens
        WHERE refresh_token_uuid = %(refresh_token_uuid)s
        AND revoked = 0
    """

    with connection_factory() as conn:
        with conn.cursor(row_factory=dict_row) as cur:
            cur.execute(sql, {"refresh_token_uuid": refresh_token_uuid})

            result = cur.fetchone()

            if result is None:
                return None

            return {"expires_at": result["expires_at"]}


def revoke_refresh_token_by_user_uuid(
    user_uuid: str,
    connection_factory: Callable = get_connection,
) -> None:
    """
    user_uuidに紐づく有効なrefresh_tokenを無効化する
    """
    sql = """
        UPDATE auth_refresh_tokens
        SET revoked = 1
        WHERE user_uuid = %(user_uuid)s
        AND revoked = 0
    """

    with connection_factory() as conn:
        try:
            with conn.cursor() as cur:
                cur.execute(
                    sql,
                    {"user_uuid": user_uuid},
                )

            conn.commit()

        except Exception:
            conn.rollback()
            raise


def find_auth_refresh_token_by_refresh_token_uuid(
    refresh_token_uuid: str,
    connection_factory: Callable = get_connection,
) -> FindAuthRefreshTokenByRefreshTokenUuidResult | None:
    """
    登録済みのrefresh_token_uuidを取得する
    """
    sql = """
    SELECT 
        user_uuid,
        refresh_token_uuid
    FROM auth_refresh_tokens
    WHERE refresh_token_uuid = %(refresh_token_uuid)s
    AND revoked = 0
    """

    with connection_factory() as conn:
        with conn.cursor(row_factory=dict_row) as cur:
            cur.execute(
                sql,
                {"refresh_token_uuid": refresh_token_uuid},
            )

            result = cur.fetchone()

            if result is None:
                return None

            return {
                "user_uuid": str(result["user_uuid"]),
                "refresh_token_uuid": str(result["refresh_token_uuid"]),
            }
