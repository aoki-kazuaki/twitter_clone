import re

from pydantic import BaseModel, ConfigDict, Field, field_validator

from app.core.error_codes import UserAccountCreateErrorCodes


class CamelResponseModel(BaseModel):
    model_config = ConfigDict(
        populate_by_name=True,
        serialize_by_alias=True,
    )


class UserAccountCreateRequest(BaseModel):
    """
    API名称(論理名): ユーザーアカウント作成
    API名称(物理名): UserAccountCreate
    HTTPメソッド: POST
    """

    user_id: str = Field(description="ユーザーID", alias="userId")
    user_password: str = Field(description="パスワード", alias="userPassword")
    handle_name: str = Field(description="ユーザー名", alias="handleName")
    greeting_message: str = Field(
        description="自己紹介文",
        alias="greetingMessage",
        default="",
    )

    @field_validator("user_id")
    @classmethod
    def validate_user_id(cls, value: str):
        if value == "":
            raise ValueError(UserAccountCreateErrorCodes.USER_ID_REQUIRED)
        if len(value) < 4 or len(value) > 16:
            raise ValueError(UserAccountCreateErrorCodes.USER_ID_LENGTH_INVALID)
        if not re.fullmatch(r"[a-zA-Z0-9]+", value):
            raise ValueError(UserAccountCreateErrorCodes.USER_ID_FORMAT_INVALID)

        return value

    @field_validator("user_password")
    @classmethod
    def validate_user_password(cls, value: str):
        if value == "":
            raise ValueError(UserAccountCreateErrorCodes.USER_PASSWORD_REQUIRED)
        if len(value) < 8:
            raise ValueError(UserAccountCreateErrorCodes.USER_PASSWORD_LENGTH_INVALID)
        if not re.fullmatch(r"[a-zA-Z0-9]+", value):
            raise ValueError(UserAccountCreateErrorCodes.USER_PASSWORD_FORMAT_INVALID)

        return value

    @field_validator("handle_name")
    @classmethod
    def validate_handle_name(cls, value: str):
        if value == "":
            raise ValueError(UserAccountCreateErrorCodes.HANDLE_NAME_REQUIRED)
        if len(value) > 30:
            raise ValueError(UserAccountCreateErrorCodes.HANDLE_NAME_LENGTH_INVALID)

        return value

    @field_validator("greeting_message")
    @classmethod
    def validate_greeting_message(cls, value: str):
        if len(value) > 200:
            raise ValueError(UserAccountCreateErrorCodes.GREETING_MESSAGE_LENGTH_INVALID)

        return value


class UserAccountCreateResponse(CamelResponseModel):
    """
    API名称(論理名): ユーザーアカウント作成
    API名称(物理名): UserAccountCreate
    HTTPメソッド: POST
    """

    user_id: str = Field(description="ユーザーID", alias="userId")
    handle_name: str = Field(description="ユーザー名", alias="handleName")
    is_success: bool = Field(description="成功判定", alias="isSuccess")
