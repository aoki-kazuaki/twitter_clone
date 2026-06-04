from typing import TypedDict


class AuthTokenFindValidRefreshTokenByRefreshTokenUuidResult(TypedDict):
    expires_at: str


class AuthTokenFindRefreshTokenByRefreshTokenUuidResult(TypedDict):
    user_uuid: str
    refresh_token_uuid: str
