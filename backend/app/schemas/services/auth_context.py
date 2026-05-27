from typing import TypedDict


class AuthContext(TypedDict):
    user_uuid: str
    access_token: str
