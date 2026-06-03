from fastapi import HTTPException
from app.core.security import create_access_token, create_refresh_token, create_refresh_token_expires_at, decode_refresh_token, verify_password
from app.repositories.user_auth_repository import find_auth_refresh_token_by_refresh_token_uuid, find_auth_user_by_user_id
from app.schemas.services.user_auth import UserAuthLoginServiceResult, UserAuthTokenUpdateServiceResult
from app.core.error_codes import UserAuthLoginErrorCodes
from app.repositories.auth_token_repository import find_valid_refresh_token_by_uuid, insert_refresh_token, revoke_refresh_token_by_user_uuid


def user_auth_login_service(user_id: str, user_password: str) -> UserAuthLoginServiceResult:
    auth_user = find_auth_user_by_user_id(user_id)

    if auth_user is None:
        raise HTTPException(status_code=401, detail=UserAuthLoginErrorCodes.INVALID_USER_ID_OR_PASSWORD)

    is_password_valid = verify_password(user_password, auth_user["user_password"])

    if is_password_valid is False:
        raise HTTPException(status_code=401, detail=UserAuthLoginErrorCodes.INVALID_USER_ID_OR_PASSWORD)

    access_token = create_access_token(auth_user["user_uuid"])
    refresh_token = create_refresh_token(auth_user["user_uuid"])
    expires_at = create_refresh_token_expires_at()

    insert_refresh_token(refresh_token, auth_user["user_uuid"], expires_at)

    return {"access_token": access_token, "refresh_token": refresh_token}


def user_auth_logout_service(user_uuid: str) -> None:
    revoke_refresh_token_by_user_uuid(user_uuid)


def user_auth_token_update_service(
    user_uuid: str,
    refresh_token_uuid: str,
) -> UserAuthTokenUpdateServiceResult:
    result_context = find_auth_refresh_token_by_refresh_token_uuid(
        refresh_token_uuid=refresh_token_uuid,
    )

    if result_context is None:
        raise HTTPException(status_code=401, detail="INVALID_REFRESH_TOKEN")

    if result_context["user_uuid"] != user_uuid:
        raise HTTPException(status_code=401, detail="INVALID_REFRESH_TOKEN_USER")

    access_token = create_access_token(user_uuid)
    new_refresh_token = create_refresh_token(user_uuid)
    refresh_token_expires_at = create_refresh_token_expires_at()

    insert_refresh_token(
        new_refresh_token,
        user_uuid,
        refresh_token_expires_at,
    )

    return {
        "access_token": access_token,
        "refresh_token": new_refresh_token,
    }
