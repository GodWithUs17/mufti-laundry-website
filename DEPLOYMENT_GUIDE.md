# Vercel Deployment Guide

## Prerequisites
- Vercel account (https://vercel.com)
- Git repository (GitHub, GitLab, or Bitbucket)
- Backend API running (for production URL)

## Step 1: Prepare Your Repository

```bash
# Make sure all changes are committed
git add .
git commit -m "Setup Vercel deployment configuration"
git push origin main
```

## Step 2: Deploy to Vercel

### Option A: Using Vercel CLI (Recommended for First Deployment)

```bash
# 1. Install Vercel CLI globally
npm i -g vercel

# 2. Deploy from your project directory
vercel

# 3. Follow the prompts:
#    - Link to Vercel account
#    - Select/create project
#    - Confirm build settings (should auto-detect Vite)
```

### Option B: Using Vercel Dashboard (Easiest)

1. Go to https://vercel.com/dashboard
2. Click "Add New" → "Project"
3. Select your Git repository
4. Vercel will auto-detect settings
5. Click "Deploy"

## Step 3: Configure Environment Variables

1. Go to your **Vercel Dashboard** → Select your project
2. Go to **Settings** → **Environment Variables**
3. Add production variables:
   - **VITE_API_BASE_URL**: Your production backend URL (e.g., `https://api.yourdomain.com/api`)
4. Click "Save"

**Important:** Environment variables should be set for:
- Production (main/master branch)
- Preview (staging/develop branch)
- Development (optional, for local testing)

## Step 4: Commit and Auto-Deploy

Once connected, any push to your repository will trigger automatic deployments:

```bash
git push origin main  # Deploys to production
git push origin develop  # Deploys to preview
```

## Deployment Checklist

### Before Deploying
- [ ] `.env.local` is in `.gitignore` (sensitive data protection)
- [ ] `vercel.json` is configured correctly
- [ ] `package.json` has build scripts
- [ ] All branches pushed to Git

### Environment Variables to Set in Vercel
- [ ] `VITE_API_BASE_URL` (production backend URL)

### Post-Deployment Verification
- [ ] Frontend loads successfully
- [ ] API calls connect to production backend
- [ ] Authentication tokens work correctly
- [ ] All pages are accessible
- [ ] No console errors

## Useful Vercel Commands

```bash
# List all deployments
vercel list

# View deployment logs
vercel logs [deployment-url]

# Remove a deployment
vercel remove [deployment-url]

# Pull environment variables from Vercel to local .env
vercel env pull

# Deploy specific branch
vercel --prod
```

## Troubleshooting

### Build Fails
- Check `npm run build` locally
- Verify Node version compatibility
- Check build logs in Vercel dashboard

### API Calls Fail After Deployment
- Verify `VITE_API_BASE_URL` environment variable is set in Vercel
- Check CORS settings on backend
- Ensure backend URL is accessible from Vercel

### Pages Show 404 (SPA Routing Issue)
- Verify `vercel.json` rewrites are configured
- Should be included in this setup

### Environment Variables Not Applied
- Rebuild: Go to **Deployments** → Select latest → Click "Redeploy"
- Or push new commit to trigger auto-redeploy

## Performance Optimization Tips

1. **Enable Caching**
   - Set Cache-Control headers in vercel.json
   - Vercel automatically caches build outputs

2. **Monitor Performance**
   - Use Vercel Analytics (free tier available)
   - Check Core Web Vitals

3. **Use Preview Deployments**
   - Create PRs for testing before merging to main
   - Each PR gets automatic preview URL

4. **Enable HTTPS**
   - Automatic with Vercel domains
   - Custom domains: 1-click SSL setup

## CI/CD Integration

### GitHub Actions Example (Optional)
If you want additional checks before deployment:

```yaml
name: Deploy
on: [push]
jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: 18
      - run: npm install
      - run: npm run build
      - run: npm run lint
```

## Support

- Vercel Docs: https://vercel.com/docs
- Vite Deployment: https://vitejs.dev/guide/static-deploy.html#vercel
- Contact Vercel Support: https://vercel.com/support
