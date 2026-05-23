from enum import StrEnum


class UserAccountCreateErrorCodes(StrEnum):
    """
    UserAccountCreate エラーコードレスポンス
    """

    # 単: ユーザーID 空文字不可
    USER_ID_REQUIRED = "USER_ID_REQUIRED"
    # 単: ユーザーID 4文字以上16文字以下
    USER_ID_LENGTH_INVALID = "USER_ID_LENGTH_INVALID"
    # 単: ユーザーID 半角英数字
    USER_ID_FORMAT_INVALID = "USER_ID_FORMAT_INVALID"

    # 単: パスワード 空文字不可
    USER_PASSWORD_REQUIRED = "USER_PASSWORD_REQUIRED"
    # 単: パスワード 8文字以上
    USER_PASSWORD_LENGTH_INVALID = "USER_PASSWORD_LENGTH_INVALID"
    # 単: パスワード 半角英数字
    USER_PASSWORD_FORMAT_INVALID = "USER_PASSWORD_FORMAT_INVALID"

    # 単: ユーザー名 空文字不可
    HANDLE_NAME_REQUIRED = "HANDLE_NAME_REQUIRED"
    # 単: ユーザー名 最大30文字まで
    HANDLE_NAME_LENGTH_INVALID = "HANDLE_NAME_LENGTH_INVALID"

    # 単: 自己紹介文 最大200文字まで
    GREETING_MESSAGE_LENGTH_INVALID = "GREETING_MESSAGE_LENGTH_INVALID"

    # 業: 新規登録時に任意設定したIDが既に登録済み, 重複していた場合
    DUPLICATE_USER_ID = "DUPLICATE_USER_ID"


class UserAuthLoginErrorCodes(StrEnum):
    """
    UserAuthLogin エラーコードレスポンス
    """

    # 単: ユーザーID 空文字不可
    USER_ID_REQUIRED = "USER_ID_REQUIRED"

    # 単: パスワード 空文字不可
    USER_PASSWORD_REQUIRED = "USER_ID_REQUIRED"

    # 業: ログイン時に送信させたID,パスワードが登録内容と一致していない場合
    INVALID_USER_ID_OR_PASSWORD = "INVALID_USER_ID_OR_PASSWORD"
