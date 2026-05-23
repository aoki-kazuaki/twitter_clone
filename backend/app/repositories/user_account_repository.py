import psycopg

from app.db.connection import get_connection
from app.core.error_codes import UserAccountCreateErrorCodes


def user_account_create(
    user_uuid: str,
    user_id: str,
    user_password: str,
    handle_name: str,
    greeting_message: str | None,
):
    sql_user_auth = """
        INSERT INTO user_auth (
            user_uuid,
            user_id,
            user_password
        )
        VALUES (
            %s,
            %s,
            %s
        );
    """

    sql_user_profile = """
        INSERT INTO user_profile (
            user_uuid,
            handle_name,
            greeting_message
        )
        VALUES (
            %s,
            %s,
            %s
        );
    """

    with get_connection() as conn:
        try:
            with conn.cursor() as cur:
                cur.execute(
                    sql_user_auth,
                    (user_uuid, user_id, user_password),
                )

                cur.execute(
                    sql_user_profile,
                    (user_uuid, handle_name, greeting_message),
                )

            conn.commit()

            return {
                "user_uuid": user_uuid,
                "user_id": user_id,
                "handle_name": handle_name,
                "greeting_message": greeting_message,
            }

        except psycopg.errors.UniqueViolation:
            #  任意入力のユーザーIDがすでに登録されている場合、409エラーを発生させる
            conn.rollback()
            raise ValueError(UserAccountCreateErrorCodes.DUPLICATE_USER_ID)

        except Exception:
            conn.rollback()
            raise
