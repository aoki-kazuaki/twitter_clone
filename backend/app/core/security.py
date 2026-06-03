import os
from datetime import datetime, timedelta, timezone

from jose import JWTError, jwt
from passlib.context import CryptContext

SECRET_KEY = os.getenv("SECRET_KEY", "local-secret-key")
if not SECRET_KEY:
    raise ValueError("SECRET_KEY is not set")
# 暗号方式
ALGORITHM = "HS256"
ACCESS_TOKEN_EXPIRE_MINUTES = 30
REFRESH_TOKEN_EXPIRE_HOURS = 12


def hash_password(password: str) -> str:
    """
    パスワードをハッシュ化する
    """
    password_context = CryptContext(
        schemes=["bcrypt"],
        deprecated="auto",
    )
    return password_context.hash(password)


def verify_password(
    plain_password: str,
    hashed_password: str,
) -> bool:
    """
    平文パスワードとハッシュ済みパスワードを照合する
    """
    password_context = CryptContext(
        schemes=["bcrypt"],
        deprecated="auto",
    )
    return password_context.verify(
        plain_password,
        hashed_password,
    )


def create_access_token(user_uuid: str) -> str:
    """
    アクセストークンを生成する
    """
    expire = datetime.now(timezone.utc) + timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)

    payload = {"sub": user_uuid, "exp": expire}

    # 変換して詰める
    return jwt.encode(payload, SECRET_KEY, algorithm=ALGORITHM)


def create_refresh_token(user_uuid: str) -> str:
    """
    リフレッシュトークンを作成する
    """
    expire = datetime.now(timezone.utc) + timedelta(hours=REFRESH_TOKEN_EXPIRE_HOURS)

    payload = {
        "sub": user_uuid,
        "exp": expire,
        "type": "refresh",
    }

    return jwt.encode(
        payload,
        SECRET_KEY,
        algorithm=ALGORITHM,
    )


def decode_access_token(token: str) -> dict | None:
    """
    アクセストークンを検証しpayloadを返却する
    """
    try:
        payload = jwt.decode(
            token,
            SECRET_KEY,
            algorithms=[ALGORITHM],
        )
        return payload

    except JWTError:
        return None


def decode_refresh_token(token: str) -> dict | None:
    """
    リフレッシュトークンを検証しpayloadを返却する
    """
    try:
        payload = jwt.decode(
            token,
            SECRET_KEY,
            algorithms=[ALGORITHM],
        )
        return payload

    except JWTError:
        return None


def create_refresh_token_expires_at() -> datetime:
    """
    リフレッシュトークンの有効期限日時を生成する
    """
    return datetime.now(timezone.utc) + timedelta(hours=REFRESH_TOKEN_EXPIRE_HOURS)
