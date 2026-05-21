from app.core.security import hash_password, verify_password


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
