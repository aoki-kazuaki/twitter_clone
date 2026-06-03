from fastapi import Cookie, Depends, HTTPException

from app.schemas.services.auth_context import AuthContext, AuthRefreshContext
from app.core.security import decode_access_token, decode_refresh_token


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


def get_current_refresh_context(
    refresh_token: str | None = Cookie(default=None, alias="refreshToken"),
) -> AuthRefreshContext:
    """
    Cookieのリフレッシュトークンを検証し。認証更新用の情報を返す
    """
    if refresh_token is None:
        raise HTTPException(status_code=401, detail="REFRESH_TOKEN_REQUIRED")

    payload = decode_refresh_token(refresh_token)

    if payload is None:
        raise HTTPException(status_code=401, detail="INVALID_REFRESH_TOKEN")

    user_uuid = payload.get("sub")
    refresh_token_uuid = payload.get("jti")

    if user_uuid is None or refresh_token_uuid is None:
        raise HTTPException(status_code=401, detail="INVALID_REFRESH_TOKEN")

    return {
        "user_uuid": user_uuid,
        "refresh_token_uuid": refresh_token_uuid,
    }
