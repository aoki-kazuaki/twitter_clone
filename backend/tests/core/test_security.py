from app.core.security import create_access_token, create_refresh_token, decode_access_token, hash_password, verify_password


class TestSecurity:
    """
    セキュリティ関連ユーティリティ関数のテスト
    """

    def test_hash_password_success(self):
        """
        パスワードをハッシュ化した結果、とは入力値とは異なる文字列になること
        """
        password = "password123"

        hashed_password = hash_password(password)

        assert hashed_password != password
        assert isinstance(hashed_password, str)

    def test_verify_password_success(self):
        """
        パスワードとハッシュ済みパスワードが一致する場合, Trueが返却されること
        """
        password = "password123"
        hashed_password = hash_password(password)

        result = verify_password(password, hashed_password)
        assert result is True

    def test_verify_password_invalid(self):
        """
        "パスワードとハッシュ済みパスワードが一致しない場合, Falseが返却されること
        """
        password = "password123"
        hashed_password = hash_password(password)

        result = verify_password(
            "wrongPassword",
            hashed_password,
        )
        assert result is False

    """
    アクセストークン関連 utility テスト
    """

    def test_create_access_token_success(self):
        """
        アクセストークンを生成できること
        """
        user_uuid = "test-user-uuid"

        token = create_access_token(user_uuid)

        assert isinstance(token, str)
        assert token != ""

    def test_decode_access_token_success(self):
        """
        生成したアクセストークンをdecodeするとuser_uuidを取得できること
        """
        user_uuid = "test-user-uuid"

        token = create_access_token(user_uuid)
        payload = decode_access_token(token)

        assert payload is not None
        assert payload["sub"] == user_uuid
        assert "exp" in payload

    def test_create_refresh_token_success(self):
        """
        リフレッシュトークンを生成できること
        """
        user_uuid = "test-user-uuid"

        token = create_refresh_token(user_uuid)

        assert isinstance(token, str)
        assert token != ""

    def test_decode_access_token_invalid_token(self):
        """
        不正なアクセストークンの場合、Noneが返却されること
        """
        payload = decode_access_token("invalid-token")

        assert payload is None
