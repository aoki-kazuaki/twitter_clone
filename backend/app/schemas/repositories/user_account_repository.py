from typing import TypedDict


class UserAccountCreateResult(TypedDict):
    user_uuid: str
    user_id: str
    handle_name: str
    greeting_message: str
