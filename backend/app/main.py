from fastapi import FastAPI

from app.routers import user_account_router

app = FastAPI()

app.include_router(user_account_router.router)
