from typing import TypedDict


class UserAuthLoginServiceResult(TypedDict):
    access_token: str
    refresh_token: str
