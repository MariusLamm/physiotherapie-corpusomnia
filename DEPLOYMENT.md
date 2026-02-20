# Deployment Guide

This guide will walk you through deploying your Physiotherapie Corpus Omnia website to Vercel.

## Prerequisites

- GitHub account
- Vercel account (free - sign up at vercel.com)
- Git installed on your computer

## Step 1: Initialize Git Repository

If not already done, initialize git in your project:

```bash
cd physiotherapie-corpusomnia
git init
git add .
git commit -m "Initial commit: Physiotherapie Corpus Omnia website"
```

## Step 2: Create GitHub Repository

1. Go to [github.com](https://github.com) and create a new repository
2. Name it `physiotherapie-corpusomnia` (or any name you prefer)
3. Don't initialize with README (we already have one)
4. Create the repository

## Step 3: Push to GitHub

```bash
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/physiotherapie-corpusomnia.git
git push -u origin main
```

Replace `YOUR_USERNAME` with your actual GitHub username.

## Step 4: Deploy to Vercel

### Option A: Deploy via Vercel Dashboard (Recommended)

1. Go to [vercel.com](https://vercel.com) and sign in
2. Click "Add New..." → "Project"
3. Import your GitHub repository
4. Vercel will auto-detect Next.js settings
5. Click "Deploy"

That's it! Your website will be live in 1-2 minutes.

### Option B: Deploy via Vercel CLI

```bash
# Install Vercel CLI
npm install -g vercel

# Login to Vercel
vercel login

# Deploy
vercel

# For production deployment
vercel --prod
```

## Step 5: Custom Domain (Optional)

To use your own domain (e.g., physiotherapie-corpusomnia.ch):

1. Go to your Vercel project dashboard
2. Click "Settings" → "Domains"
3. Add your custom domain
4. Follow the DNS configuration instructions
5. Wait for DNS propagation (can take up to 48 hours)

### DNS Configuration Example

Add these records to your domain DNS:

```
Type: A
Name: @
Value: 76.76.21.21

Type: CNAME
Name: www
Value: cname.vercel-dns.com
```

## Environment Variables

If you add environment variables in the future (API keys, etc.):

1. Go to Vercel dashboard → Settings → Environment Variables
2. Add your variables
3. Redeploy to apply changes

## Automatic Deployments

Vercel automatically deploys:
- **Production**: When you push to `main` branch
- **Preview**: When you create a pull request

## Post-Deployment Checklist

After deployment, verify:

- [ ] All pages load correctly (home, /agb, /datenschutz, /impressum)
- [ ] Dark mode toggle works
- [ ] Mobile menu works on mobile devices
- [ ] Contact form displays correctly (actual submission needs backend)
- [ ] All links work (including external links)
- [ ] Google Maps displays correctly
- [ ] Smooth scrolling navigation works
- [ ] All animations trigger properly

## Monitoring & Analytics

### Add Analytics (Optional)

1. **Vercel Analytics**: Enable in Vercel dashboard → Analytics
2. **Google Analytics**: Add tracking code to `app/layout.tsx`

### Performance Monitoring

Check your site performance:
- Use Vercel's built-in analytics
- Run Lighthouse audit in Chrome DevTools
- Check PageSpeed Insights: https://pagespeed.web.dev/

## Updating the Website

To make changes after deployment:

```bash
# Make your changes
# ...

# Commit changes
git add .
git commit -m "Description of changes"

# Push to GitHub (triggers automatic deployment)
git push
```

Vercel will automatically rebuild and deploy your changes.

## Rollback

If something goes wrong:

1. Go to Vercel dashboard → Deployments
2. Find a previous working deployment
3. Click "..." → "Promote to Production"

## Troubleshooting

### Build Fails

Check the build logs in Vercel dashboard. Common issues:
- TypeScript errors
- Missing dependencies
- Environment variables not set

### Site is Slow

- Check Vercel Analytics for performance bottlenecks
- Ensure images are optimized
- Check for console errors

### Domain Not Working

- Verify DNS records are correct
- Wait 24-48 hours for DNS propagation
- Check SSL certificate status in Vercel

## Support

- **Vercel Documentation**: https://vercel.com/docs
- **Next.js Documentation**: https://nextjs.org/docs
- **Vercel Support**: support@vercel.com

## Cost

Vercel's Hobby plan is **FREE** and includes:
- Unlimited deployments
- Automatic HTTPS
- Global CDN
- DDoS protection
- 100GB bandwidth per month

This is more than sufficient for a physiotherapy practice website.

---

Need help? Contact the developer or consult the README.md file.
