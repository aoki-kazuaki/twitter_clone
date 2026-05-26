from typing import TypedDict


class FindAuthUserByUserIdResult(TypedDict):
    user_uuid: str
    user_password: str
