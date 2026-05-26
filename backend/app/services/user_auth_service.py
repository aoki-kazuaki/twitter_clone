from fastapi import HTTPException
from app.core.security import create_access_token, create_refresh_token, create_refresh_token_expires_at, verify_password
from backend.app.repositories.user_auth_repository import find_auth_user_by_user_id
from app.schemas.services.user_auth import UserAuthLoginServiceResult
from app.core.error_codes import UserAuthLoginErrorCodes
from app.repositories.auth_token_repository import insert_refresh_token


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
