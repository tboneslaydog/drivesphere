# GitHub Setup for DriveSphere

## Manual GitHub Setup Instructions

Since the terminal commands aren't working as expected, here's how to set up GitHub manually:

### 1. Create GitHub Repository

1. Go to [GitHub.com](https://github.com) and sign in
2. Click the "+" icon in the top right corner
3. Select "New repository"
4. Name it: `drivesphere`
5. Description: `Social GPS Tracking & Route Sharing App`
6. Make it **Public** (required for free Firebase hosting)
7. **Don't** initialize with README, .gitignore, or license (we already have files)
8. Click "Create repository"

### 2. Connect Local Repository to GitHub

Open Command Prompt or PowerShell in your project folder and run:

```bash
# Initialize git (if not already done)
git init

# Add all files
git add .

# Create initial commit
git commit -m "Initial commit: DriveSphere - Social GPS Tracking & Route Sharing App"

# Add GitHub remote (replace YOUR_USERNAME with your GitHub username)
git remote add origin https://github.com/YOUR_USERNAME/drivesphere.git

# Push to GitHub
git branch -M main
git push -u origin main
```

### 3. Set Up Firebase Auto-Deployment

1. Go to [Firebase Console](https://console.firebase.google.com)
2. Select your DriveSphere project
3. Go to "Hosting" in the left sidebar
4. Click "Get started" if not already set up
5. Click "Connect to GitHub" or "Set up GitHub integration"
6. Authorize Firebase to access your GitHub account
7. Select your `drivesphere` repository
8. Choose the `main` branch
9. Set the build command to: `npm run build` (or leave empty if using static files)
10. Set the publish directory to: `public`
11. Click "Save"

### 4. GitHub Actions Workflow (Optional)

Create `.github/workflows/firebase-deploy.yml`:

```yaml
name: Deploy to Firebase Hosting

on:
  push:
    branches: [ main ]
  pull_request:
    branches: [ main ]

jobs:
  build_and_deploy:
    runs-on: ubuntu-latest
    steps:
    - uses: actions/checkout@v2
    - name: Setup Node.js
      uses: actions/setup-node@v2
      with:
        node-version: '18'
    - name: Install dependencies
      run: npm install
    - name: Build
      run: npm run build
    - name: Deploy to Firebase
      uses: FirebaseExtended/action-hosting-deploy@v0
      with:
        repoToken: '${{ secrets.GITHUB_TOKEN }}'
        firebaseServiceAccount: '${{ secrets.FIREBASE_SERVICE_ACCOUNT }}'
        channelId: live
        projectId: your-firebase-project-id
```

### 5. Environment Variables

In your GitHub repository:
1. Go to Settings > Secrets and variables > Actions
2. Add these secrets:
   - `FIREBASE_SERVICE_ACCOUNT`: Your Firebase service account JSON
   - `FIREBASE_PROJECT_ID`: Your Firebase project ID

### 6. Manual Deployment (Current Method)

For now, you can continue using:
```bash
firebase deploy --only hosting
```

### 7. Files to Include in Git

Make sure these files are in your repository:
- `index.html` (main app file)
- `public/index.html` (deployed version)
- `firebase.json` (Firebase configuration)
- `package.json` (dependencies)
- `README.md` (project documentation)

### 8. .gitignore

Create a `.gitignore` file:
```
node_modules/
.env
.env.local
.env.production.local
.env.development.local
npm-debug.log*
yarn-debug.log*
yarn-error.log*
.DS_Store
.vscode/
.idea/
```

## Next Steps

1. Follow the manual setup above
2. Test the GitHub integration
3. Set up automatic deployment
4. Update the README with project information

## Benefits of GitHub Integration

- **Automatic deployment** when you push to main branch
- **Version control** for your code
- **Collaboration** with other developers
- **Backup** of your code
- **Issue tracking** and project management
- **Free hosting** with Firebase

## Troubleshooting

If you encounter issues:
1. Check that all files are committed to git
2. Verify the GitHub repository is public
3. Ensure Firebase project is properly configured
4. Check the Firebase console for deployment logs
