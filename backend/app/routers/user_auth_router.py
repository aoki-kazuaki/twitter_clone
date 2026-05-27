from fastapi import APIRouter, Depends, Response

from app.schemas.base_models.user_auth_schema import (
    UserAuthLoginRequest,
    UserAuthLoginResponse,
    UserAuthLogoutResponse,
    UserAuthTokenMeResponse,
)
from app.services.user_auth_service import user_auth_login_service, user_auth_logout_service
from app.core.auth_dependencies import get_current_auth_context
from app.schemas.services.auth_context import AuthContext

router = APIRouter()


@router.post("/user/auth/login", response_model=UserAuthLoginResponse)
def user_auth_login_api(request: UserAuthLoginRequest, response: Response):
    token_result = user_auth_login_service(
        user_id=request.user_id,
        user_password=request.user_password,
    )

    response.set_cookie(
        key="access_token",
        value=token_result["access_token"],
        httponly=True,
        secure=False,  # ローカル検証中。本番HTTPSでは True
        samesite="lax",
    )

    response.set_cookie(
        key="refresh_token",
        value=token_result["refresh_token"],
        httponly=True,
        secure=False,  # ローカル検証中。本番HTTPSでは True
        samesite="lax",
    )

    return {
        "is_success": True,
    }


@router.post("user/auth/logout", response_model=UserAuthLogoutResponse)
def user_auth_logout_api(
    response: Response,
    auth_context: AuthContext = Depends(get_current_auth_context),
) -> UserAuthLogoutResponse:
    user_auth_logout_service(auth_context["user_uuid"])

    response.delete_cookie("accessToken")
    response.delete_cookie("refreshToken")

    return {"is_success": True}


@router.get("user/auth/token/me")
def user_auth_token_me(
    auth_context: AuthContext = Depends(get_current_auth_context),
) -> UserAuthTokenMeResponse:
    return {"is_success": True}
