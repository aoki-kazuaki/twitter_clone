from fastapi import FastAPI

from app.routers import user_account_router
from app.routers import user_auth_router

app = FastAPI()

ROUTERS = [
    user_account_router.router,
    user_auth_router.router,
]

for router in ROUTERS:
    app.include_router(router)
