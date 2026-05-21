import pytest
from fastapi import HTTPException
from unittest.mock import patch, ANY

from app.core.error_codes import ErrorCodes
from app.services.user_account_service import user_account_create_service


class TestUserAccountCreateService:
    """
    ユーザーアカウント作成 service テスト
    """

    @patch("app.services.user_account_service.user_account_create")
    @patch("app.services.user_account_service.hash_password")
    def test_user_account_create_service_success(
        self,
        mock_hash_password,
        mock_user_account_create,
    ):
        """
        ユーザー作成成功時、レスポンスが正常に返却されること
        """

        mock_user_account_create.return_value = {
            "user_id": "test_user",
            "handle_name": "あおき",
        }
        mock_hash_password.return_value = "hashed_password"

        result = user_account_create_service(
            user_id="test_user",
            user_password="password123",
            handle_name="あおき",
            greeting_message=None,
        )

        assert result == {
            "user_id": "test_user",
            "handle_name": "あおき",
            "is_success": True,
        }

        # このメソッドが、この引数で1回だけ呼ばれたか を検証している
        mock_hash_password.assert_called_once_with("password123")

        # このメソッドが、この引数で1回だけ呼ばれたか を検証している
        mock_user_account_create.assert_called_once_with(
            user_uuid=ANY,
            user_id="test_user",
            user_password="hashed_password",
            handle_name="あおき",
            greeting_message=None,
        )

    @patch("app.services.user_account_service.user_account_create")
    @patch("app.services.user_account_service.hash_password")
    def test_user_account_create_service_duplicate_user_id(
        self,
        mock_hash_password,
        mock_user_account_create,
    ):
        """
        duplicate user_id の場合、409エラーになること
        """

        mock_hash_password.return_value = "hashed_password"

        mock_user_account_create.side_effect = ValueError(ErrorCodes.DUPLICATE_USER_ID)

        with pytest.raises(HTTPException) as exc_info:
            user_account_create_service(
                user_id="test_user",
                user_password="password123",
                handle_name="あおき",
                greeting_message=None,
            )

        assert exc_info.value.status_code == 409
        assert exc_info.value.detail == ErrorCodes.DUPLICATE_USER_ID

    @patch("app.services.user_account_service.user_account_create")
    @patch("app.services.user_account_service.hash_password")
    def test_user_account_create_service_unexpected_error(
        self,
        mock_hash_password,
        mock_user_account_create,
    ):
        """
        想定外の例外はそのまま送出されること
        """

        mock_hash_password.return_value = "hashed_password"

        mock_user_account_create.side_effect = ValueError("UNKNOWN_ERROR")

        with pytest.raises(ValueError) as exc_info:
            user_account_create_service(
                user_id="test_user",
                user_password="password123",
                handle_name="あおき",
                greeting_message=None,
            )

        assert str(exc_info.value) == "UNKNOWN_ERROR"
