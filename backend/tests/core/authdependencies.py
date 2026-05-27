import pytest
from fastapi import HTTPException

from app.core.auth_dependencies import get_current_auth_context


class TestGetCurrentAuthContext:

    def test_access_token_required(self):
        with pytest.raises(HTTPException) as error:
            get_current_auth_context(None)

        assert error.value.status_code == 401
        assert error.value.detail == "ACCESS_TOKEN_REQUIRED"

    def test_invalid_access_token(self, monkeypatch):
        monkeypatch.setattr(
            "app.core.auth_dependency.decode_access_token",
            lambda token: None,
        )

        with pytest.raises(HTTPException) as error:
            get_current_auth_context("invalid-token")

        assert error.value.status_code == 401
        assert error.value.detail == "INVALID_ACCESS_TOKEN"

    def test_sub_not_found(self, monkeypatch):
        monkeypatch.setattr(
            "app.core.auth_dependency.decode_access_token",
            lambda token: {},
        )

        with pytest.raises(HTTPException) as error:
            get_current_auth_context("test-token")

        assert error.value.status_code == 401

    def test_success(self, monkeypatch):
        monkeypatch.setattr(
            "app.core.auth_dependency.decode_access_token",
            lambda token: {
                "sub": "user-uuid-001",
            },
        )

        result = get_current_auth_context("test-token")

        assert result == {
            "user_uuid": "user-uuid-001",
            "access_token": "test-token",
        }
