import psycopg
from collections.abc import Callable

from app.core.error_codes import UserAccountCreateErrorCodes
from app.db.connection import get_connection
from app.schemas.repositories.user_account_repository import UserAccountCreateResult


def user_account_create(
    user_uuid: str,
    user_id: str,
    user_password: str,
    handle_name: str,
    greeting_message: str | None,
    connection_factory: Callable = get_connection,
) -> UserAccountCreateResult:
    sql_user_auth = """
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
    """

    sql_user_profile = """
        INSERT INTO user_profile (
            user_uuid,
            handle_name,
            greeting_message
        )
        VALUES (
            %(user_uuid)s,
            %(handle_name)s,
            %(greeting_message)s
        )
    """

    with connection_factory() as conn:
        try:
            with conn.cursor() as cur:
                cur.execute(
                    sql_user_auth,
                    {
                        "user_uuid": user_uuid,
                        "user_id": user_id,
                        "user_password": user_password,
                    },
                )

                cur.execute(
                    sql_user_profile,
                    {
                        "user_uuid": user_uuid,
                        "handle_name": handle_name,
                        "greeting_message": greeting_message,
                    },
                )

            conn.commit()

            return {
                "user_uuid": user_uuid,
                "user_id": user_id,
                "handle_name": handle_name,
                "greeting_message": greeting_message,
            }

        except psycopg.errors.UniqueViolation:
            conn.rollback()
            raise ValueError(
                UserAccountCreateErrorCodes.DUPLICATE_USER_ID,
            )

        except Exception:
            conn.rollback()
            raise
