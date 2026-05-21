# Python / FastAPI 初回環境構築手順（Windows + Git Bash）

## 1. Python インストール
Windows に Python をインストールする。

インストール時に必ずチェックする。

```txt
Add Python to PATH
```

確認：

```bash
python --version
```

---

## 2. backend ディレクトリへ移動

```bash
cd backend
```

---

## 3. 仮想環境（venv）作成

Python のライブラリをプロジェクト単位で隔離するために作成。

```bash
python -m venv venv
```

作成後：

```txt
backend/
 └ venv/
```

---

## 4. 仮想環境を有効化

Git Bash：

```bash
source venv/Scripts/activate
```

成功するとプロンプトに表示される：

```bash
(venv)
```

---

## 5. 必要ライブラリをインストール

```bash
python -m pip install fastapi uvicorn psycopg[binary] python-dotenv pytest httpx
```

---

## 6. requirements.txt 作成

現在の依存関係を保存。

```bash
pip freeze > requirements.txt
```

---

## 7. VSCode の Python Interpreter を設定

コマンドパレット：

```txt
Ctrl + Shift + P
```

検索：

```txt
Python: Select Interpreter
```

選択：

```txt
backend/venv/Scripts/python
```

---

## 8. VSCode 設定（推奨）

`.vscode/settings.json`

```json
{
  "python.defaultInterpreterPath": "${workspaceFolder}/backend/venv/Scripts/python.exe"
}
```

※ 相対パス指定なので Git worktree でも使いやすい

---

## 9. run.sh 作成

`backend/run.sh`

```bash
#!/bin/bash

source venv/Scripts/activate
uvicorn app.main:app --reload
```

実行権限：

```bash
chmod +x run.sh
```

起動：

```bash
./run.sh
```

---

## 10. Git 管理対象外

`.gitignore`

```gitignore
venv/
__pycache__/
*.pyc
.env
.idea/
.vscode/
```

---

# Git Worktree を切った場合

worktree は別作業ディレクトリ扱いのため、毎回環境構築が必要。

```bash
cd backend
python -m venv venv
source venv/Scripts/activate
pip install -r requirements.txt
```

---

# 補足

## 仮想環境とは？
Python の依存ライブラリをプロジェクトごとに隔離する仕組み。

Node.js でいう：

```txt
venv ≒ node_modules + Node実行環境
```

---

## Docker 化した後
最終的には Docker で環境構築する想定。

```bash
docker compose up --build
```