from pydantic import ValidationError
import pytest

from app.core.error_codes import UserAuthLoginErrorCodes
from app.schemas.base_models.user_auth_schema import UserAuthLoginRequest


class TestUserAuthLoginRequest:
    """
    API名称(論理名): ユーザーログイン
    API名称(物理名): UserAuthLogin
    HTTPメソッド: POST
    """

    def test_success(self):
        """
        入力必須のID, パスワードを入力した際期待した状態のオブジェクトになること
        """
        request = UserAuthLoginRequest(userId="testuser01", userPassword="password123")

        assert request.user_id == "testuser01"
        assert request.user_password == "password123"

    def when_user_id_empty_error(self):
        """
        入力必須のIDに空文字を指定した場合、USER_ID_REQUIRED が返却されること
        """
        with pytest.raises(ValidationError) as error:
            UserAuthLoginRequest(userId="", userPassword="password123")
        assert UserAuthLoginErrorCodes.USER_ID_REQUIRED in str(error.value)

    def when_user_password_empty_error(self):
        """
        入力必須のパスワードに空文字を指定した場合、USER_PASSWORD_REQUIRED が返却されること
        """
        with pytest.raises(ValidationError) as error:
            UserAuthLoginRequest(userId="userId123", userPassword="")

        assert UserAuthLoginErrorCodes.USER_PASSWORD_REQUIRED in str(error.value)
