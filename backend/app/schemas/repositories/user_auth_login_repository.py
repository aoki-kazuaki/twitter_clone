from typing import TypedDict


class FindAuthUserByUserIdResult(TypedDict):
    user_uuid: str
    user_password: str


class FindAuthRefreshTokenByRefreshTokenUuidResult(TypedDict):
    user_uuid: str
    refresh_token_uuid: str
