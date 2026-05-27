from fastapi import Cookie, HTTPException

from app.schemas.services.auth_context import AuthContext
from app.core.security import decode_access_token


def get_current_auth_context(access_token: str | None = Cookie(default=None, alias="accessToken")) -> AuthContext:
    """
    Cookieのアクセストークンを検証し、認証情報を返す
    """
    if access_token is None:
        raise HTTPException(status_code=401, detail="ACCESS_TOKEN_REQUIRED")

    payload = decode_access_token(access_token)

    if payload is None:
        raise HTTPException(status_code=401, detail="INVALID_ACCESS_TOKEN")

    user_uuid = payload.get("sub")

    if user_uuid is None:
        raise HTTPException(status_code=401, detail="INVALID_ACCESS_TOKEN")

    return {"user_uuid": user_uuid, "access_token": access_token}
