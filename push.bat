@echo off
cd /d C:\New2

echo Checking for changes...
git add .

git diff --cached --quiet
if %ERRORLEVEL% == 0 (
  echo No changes to commit. Pushing anyway...
) else (
  echo Changes found! Committing...
  git commit -m "update"
)

git push
echo.
echo Done! Check https://mymarshcodex.onrender.com
pause
