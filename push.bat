@echo off
cd /d C:\New2

echo Checking for changes...
git add .

git diff --cached --quiet
if %ERRORLEVEL% == 0 (
  echo No file changes - creating empty commit to trigger Render deploy...
  git commit --allow-empty -m "deploy: trigger redeploy"
) else (
  echo Changes found! Committing...
  git commit -m "update"
)

git push
echo.
echo Done! Render is redeploying...
echo Check: https://mymarshcodex.onrender.com
pause
