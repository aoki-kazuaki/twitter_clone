from passlib.context import CryptContext


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
