from pydantic import BaseModel, ConfigDict, Field, field_validator

from app.core.error_codes import UserAuthLoginErrorCodes


class CamelResponseModel(BaseModel):
    model_config = ConfigDict(
        populate_by_name=True,
        serialize_by_alias=True,
    )


class UserAuthLoginRequest(BaseModel):
    """
    API名称(論理名): ユーザーログイン
    API名称(物理名): UserAuthLogin
    HTTPメソッド: POST
    """

    user_id: str = Field(description="ユーザーID", alias="userId")
    user_password: str = Field(description="パスワード", alias="userPassword")

    @field_validator("user_id")
    @classmethod
    def validate_user_id(cls, value: str):
        if value == "":
            raise ValueError(UserAuthLoginErrorCodes.USER_ID_REQUIRED)
        return value

    @field_validator("user_password")
    @classmethod
    def validate_user_password(cls, value: str):
        if value == "":
            raise ValueError(UserAuthLoginErrorCodes.USER_PASSWORD_REQUIRED)
        return value


class UserAuthLoginResponse(CamelResponseModel):
    """
    API名称(論理名): ユーザーログイン
    API名称(物理名): UserAuthLogin
    HTTPメソッド: POST
    """

    is_success: bool = Field(description="ログイン判定", alias="isSuccess")


class UserAuthLogoutResponse(CamelResponseModel):
    """
    API名称(論理名): ユーザーログアウト
    API名称(物理名): UserAuthLogout
    HTTPメソッド: POST
    """

    is_success: bool = Field(description="ログアウト判定", alias="isSuccess")


class UserAuthTokenMeResponse(CamelResponseModel):
    """
    API名称(論理名): アクセストークン有効期限確認
    API名称(物理名): UserAuthTokenMe
    HTTPメソッド: GET
    """

    is_success: bool = Field(description="アクセストークン有効判定", alias="isSuccess")


class UserAuthTokenUpdateResponse(CamelResponseModel):
    """
    API名称(論理名): アクセストークン更新
    API名称(物理名): UserAuthTokenUpdate
    HTTPメソッド: GET
    """

    is_success: bool = Field(description="アクセストークン有効判定", alias="isSuccess")
