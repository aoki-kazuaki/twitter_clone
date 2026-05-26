from fastapi import APIRouter, Response

from app.schemas.base_models.user_auth_schema import (
    UserAuthLoginRequest,
    UserAuthLoginResponse,
)
from app.services.user_auth_service import user_auth_login_service

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
