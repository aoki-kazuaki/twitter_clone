from fastapi import APIRouter

from app.schemas.base_models.user_account_schema import (
    UserAccountCreateRequest,
    UserAccountCreateResponse,
)
from app.services.user_account_service import user_account_create_service

router = APIRouter()


@router.post(
    "/user/account/create",
    response_model=UserAccountCreateResponse,
)
def user_account_create_api(request: UserAccountCreateRequest):
    return user_account_create_service(
        user_id=request.user_id,
        user_password=request.user_password,
        handle_name=request.handle_name,
        greeting_message=request.greeting_message,
    )
