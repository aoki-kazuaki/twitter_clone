import uuid

from fastapi import HTTPException

from app.core.security import hash_password
from app.core.error_codes import UserAccountCreateErrorCodes
from app.repositories.user_account_repository import user_account_create


def user_account_create_service(
    user_id: str,
    user_password: str,
    handle_name: str,
    greeting_message: str | None,
):
    user_uuid = str(uuid.uuid4())
    hashed_user_password = hash_password(user_password)

    try:
        created_user = user_account_create(
            user_uuid=user_uuid,
            user_id=user_id,
            user_password=hashed_user_password,
            handle_name=handle_name,
            greeting_message=greeting_message,
        )

        return {
            "user_id": created_user["user_id"],
            "handle_name": created_user["handle_name"],
            "is_success": True,
        }

    except ValueError as e:
        if str(e) == UserAccountCreateErrorCodes.DUPLICATE_USER_ID:
            raise HTTPException(
                status_code=409,
                detail=UserAccountCreateErrorCodes.DUPLICATE_USER_ID,
            ) from e
        raise
