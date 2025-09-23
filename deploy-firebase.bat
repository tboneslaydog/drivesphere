@echo off
echo Deploying DriveSphere to Firebase...
echo.

echo Installing Firebase CLI...
npm install -g firebase-tools

echo.
echo Logging in to Firebase...
firebase login

echo.
echo Initializing Firebase project...
firebase init

echo.
echo Deploying to Firebase...
firebase deploy

echo.
echo Done! Your app is now live on Firebase!
echo Check the URL that was displayed above.
pause
