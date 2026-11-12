#!/usr/bin/env bash
# ============================================================
# 將本網站推送到 GitHub（在你自己的電腦上執行，不是在 Accio 內）
# 用法：
#   1. 修改下面兩行（GitHub 帳號、repo 名稱）
#   2. bash push-to-github.sh
# 前置：已安裝 git；已在 GitHub 建立「空白」repo（不要勾選加 README）
# ============================================================
set -euo pipefail

GITHUB_USER="your-username"          # ← 改成你的 GitHub 帳號
REPO_NAME="coa-secondary"            # ← 改成你的 repo 名稱

REMOTE="https://github.com/${GITHUB_USER}/${REPO_NAME}.git"

cd "$(dirname "$0")"
[ -d .git ] || git init
git add -A
git -c user.name="Accio" -c user.email="accio@local" \
    commit -m "香港中學資助則例導讀：10 章靜態網站" || true
git branch -M main
git remote remove origin 2>/dev/null || true
git remote add origin "$REMOTE"
git push -u origin main

cat <<MSG

完成。接著開啟：
  https://github.com/${GITHUB_USER}/${REPO_NAME}/settings/pages
Source 選「Deploy from a branch」→ Branch: main → / (root) → Save
約一分鐘後網址為：
  https://${GITHUB_USER}.github.io/${REPO_NAME}/
MSG
