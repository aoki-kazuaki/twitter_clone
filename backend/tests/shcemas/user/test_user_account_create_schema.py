from pydantic import ValidationError
import pytest

from app.schemas.base_models.user_account_schema import UserAccountCreateRequest
from app.core.error_codes import UserAccountCreateErrorCodes


class TestUserAccountCreateRequest:
    """
    API名称(論理名): ユーザーアカウント作成
    API名称(物理名): UserAccountCreate
    HTTPメソッド: POST
    """

    def test_success(self):
        """
        BaseModelに値を渡した結果、期待した状態のオブジェクトになること
        """
        request = UserAccountCreateRequest(
            userId="testuser01",
            userPassword="password123",
            handleName="テストユーザー",
            greetingMessage="よろしくお願いします",
        )
        assert request.user_id == "testuser01"
        assert request.user_password == "password123"
        assert request.handle_name == "テストユーザー"
        assert request.greeting_message == "よろしくお願いします"

    def test_user_id_required(self):
        """
        ユーザーIDが空文字の場合、バリデーションエラーにより USER_ID_REQUIRED が返却されること
        """
        with pytest.raises(ValidationError) as error:
            UserAccountCreateRequest(
                userId="",
                userPassword="password123",
                handleName="テストユーザー",
                greetingMessage="",
            )

        assert UserAccountCreateErrorCodes.USER_ID_REQUIRED in str(error.value)

    def test_user_id_length_min_invalid(self):
        """
        "ユーザーIDが4文字以下(3文字)の場合、バリデーションエラーにより USER_ID_LENGTH_INVALID が返却されること
        """
        with pytest.raises(ValidationError) as error:
            UserAccountCreateRequest(
                userId="abc",
                userPassword="password123",
                handleName="テストユーザー",
                greetingMessage="",
            )

        assert UserAccountCreateErrorCodes.USER_ID_LENGTH_INVALID in str(error.value)

    def test_user_id_length_max_invalid(self):
        """
        "ユーザーIDが16文字以上(17文字)の場合、バリデーションエラーにより USER_ID_LENGTH_INVALID が返却されること
        """
        with pytest.raises(ValidationError) as error:
            UserAccountCreateRequest(
                userId="1234567890123456a",
                userPassword="password123",
                handleName="テストユーザー",
                greetingMessage="",
            )

        assert UserAccountCreateErrorCodes.USER_ID_LENGTH_INVALID in str(error.value)

    def test_user_id_format_invalid(self):
        """
        ユーザーIDに全角ひらがなが入力されていた場合、バリデーションエラーにより USER_ID_FORMAT_INVALID が返却されること
        """
        with pytest.raises(ValidationError) as error:
            UserAccountCreateRequest(
                userId="1234あかさたな",
                userPassword="password123",
                handleName="テストユーザー",
                greetingMessage="",
            )
        assert UserAccountCreateErrorCodes.USER_ID_FORMAT_INVALID in str(error.value)

    def test_user_password_required(self):
        """パスワードが空文字で入力されていた場合、バリデーションエラーにより USER_PASSWORD_REQUIRED が返却されること"""
        with pytest.raises(ValidationError) as error:
            UserAccountCreateRequest(
                userId="testuser01",
                userPassword="",
                handleName="テストユーザー",
                greetingMessage="",
            )
        assert UserAccountCreateErrorCodes.USER_PASSWORD_REQUIRED in str(error.value)

    def test_user_password_length_min_invalid(self):
        """
        パスワードが8文字以下(7文字)で入力されていた場合、バリデーションエラーにより USER_PASSWORD_LENGTH_INVALID が返却されること
        """
        with pytest.raises(ValidationError) as error:
            UserAccountCreateRequest(
                userId="testuser01",
                userPassword="aaaaaaa",
                handleName="テストユーザー",
                greetingMessage="",
            )

        assert UserAccountCreateErrorCodes.USER_PASSWORD_LENGTH_INVALID in str(error.value)

    def test_user_password_format_invalid(self):
        """
        パスワードに全角ひらがなが入力されていた場合、バリデーションエラーにより USER_PASSWORD_FORMAT_INVALID が返却されること
        """
        with pytest.raises(ValidationError) as error:
            UserAccountCreateRequest(
                userId="testuser01",
                userPassword="ぱすわーどぱすわーど",
                handleName="テストユーザー",
                greetingMessage="",
            )
        assert UserAccountCreateErrorCodes.USER_PASSWORD_FORMAT_INVALID in str(error.value)

    def test_handle_name_required(self):
        """
        ユーザー名が空文字で入力されていた場合。バリデーションエラーにより HANDLE_NAME_REQUIRED が返却されること
        """
        with pytest.raises(ValidationError) as error:
            UserAccountCreateRequest(
                userId="testuser01",
                userPassword="password123",
                handleName="",
                greetingMessage="よろしくお願いします",
            )
        assert UserAccountCreateErrorCodes.HANDLE_NAME_REQUIRED in str(error.value)

    def test_handle_name_length_max_invalid(self):
        """
        ユーザー名が30文字以上(31文字)で入力されていた場合。バリデーションエラーにより HANDLE_NAME_LENGTH_INVALID が返却されること
        """
        with pytest.raises(ValidationError) as error:
            UserAccountCreateRequest(
                userId="testuser01",
                userPassword="password123",
                handleName="123456789012345678901234567890a",
                greetingMessage="よろしくお願いします",
            )
        assert UserAccountCreateErrorCodes.HANDLE_NAME_LENGTH_INVALID in str(error.value)

    def test_greeting_message_length_max_invalid(self):
        """
        自己紹介文が200文字以上(201文字)で入力されていた場合、バリデーションエラーにより GREETING_MESSAGE_LENGTH_INVALID が返却されること
        """
        with pytest.raises(ValidationError) as error:
            UserAccountCreateRequest(
                userId="testuser01",
                userPassword="password123",
                handleName="テストユーザー",
                greetingMessage="あ" * 201,
            )

        assert UserAccountCreateErrorCodes.GREETING_MESSAGE_LENGTH_INVALID in str(error.value)
