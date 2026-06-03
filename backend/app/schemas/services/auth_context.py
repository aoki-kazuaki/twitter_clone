from typing import TypedDict


class AuthContext(TypedDict):
    user_uuid: str
    access_token: str


class AuthRefreshContext(TypedDict):
    user_uuid: str
    refresh_token_uuid: str
    refresh_token: str
