# 🚀 Deployment Guide - JanSanrakshak AI

This guide covers different deployment strategies for the React-based Rainwater Harvesting Assessment Tool.

## 📋 Prerequisites

- Node.js 18+ or Docker
- Git for version control
- Environment variables configured
- Backend API endpoints available

## 🏗️ Build Process

### Local Development Build
```bash
# Install dependencies
npm install

# Create environment file
cp .env.example .env.local
# Edit .env.local with your API endpoints

# Build for production
npm run build

# Test production build locally
npm run preview
```

## 🐳 Docker Deployment

### Single Container
```bash
# Build the Docker image
docker build -t jansanrakshak-ai .

# Run the container
docker run -p 3000:80 \
  -e VITE_API_BASE_URL=https://your-api.com \
  jansanrakshak-ai
```

### Docker Compose (Full Stack)
```bash
# Start all services
docker-compose up -d

# View logs
docker-compose logs -f frontend

# Stop all services
docker-compose down
```

## ☁️ Cloud Deployment Options

### 1. Vercel (Recommended for Static Deployment)

#### Automatic Deployment
1. Connect your GitHub repository to Vercel
2. Configure environment variables in Vercel dashboard:
   - `VITE_API_BASE_URL`
   - `VITE_GOOGLE_MAPS_API_KEY`
3. Deploy automatically on git push

#### Manual Deployment
```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel --prod
```

### 2. Netlify

#### Using Netlify CLI
```bash
# Install Netlify CLI
npm install -g netlify-cli

# Build and deploy
npm run build
netlify deploy --prod --dir=dist
```

#### Build Configuration (netlify.toml)
```toml
[build]
  publish = "dist"
  command = "npm run build"

[build.environment]
  VITE_API_BASE_URL = "https://your-api.com"

[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200
```

### 3. AWS S3 + CloudFront

```bash
# Build the application
npm run build

# Install AWS CLI
pip install awscli

# Configure AWS credentials
aws configure

# Sync to S3 bucket
aws s3 sync dist/ s3://your-bucket-name --delete

# Invalidate CloudFront cache
aws cloudfront create-invalidation --distribution-id YOUR_DIST_ID --paths "/*"
```

### 4. Google Cloud Platform

#### App Engine
```yaml
# app.yaml
runtime: nodejs18

handlers:
  - url: /static/(.*)
    static_files: dist/\1
    upload: dist/(.*)

  - url: /.*
    static_files: dist/index.html
    upload: dist/index.html

env_variables:
  VITE_API_BASE_URL: "https://your-api.com"
```

```bash
# Deploy to App Engine
gcloud app deploy
```

### 5. Azure Static Web Apps

#### GitHub Actions Deployment
```yaml
# .github/workflows/azure-static-web-apps.yml
name: Azure Static Web Apps CI/CD

on:
  push:
    branches: [ main ]
  pull_request:
    types: [opened, synchronize, reopened, closed]
    branches: [ main ]

jobs:
  build_and_deploy_job:
    runs-on: ubuntu-latest
    name: Build and Deploy Job
    steps:
    - uses: actions/checkout@v3
      with:
        submodules: true

    - name: Build And Deploy
      uses: Azure/static-web-apps-deploy@v1
      with:
        azure_static_web_apps_api_token: ${{ secrets.AZURE_STATIC_WEB_APPS_API_TOKEN }}
        repo_token: ${{ secrets.GITHUB_TOKEN }}
        action: "upload"
        app_location: "/"
        api_location: ""
        output_location: "dist"
      env:
        VITE_API_BASE_URL: ${{ secrets.VITE_API_BASE_URL }}
```

## 🔧 Environment Configuration

### Production Environment Variables
```env
# API Configuration
VITE_API_BASE_URL=https://api.jansanrakshak.ai

# Google Services
VITE_GOOGLE_MAPS_API_KEY=your_google_maps_api_key

# Application Settings
VITE_APP_NAME=JanSanrakshak AI
VITE_APP_VERSION=1.0.0
VITE_ENABLE_ANALYTICS=true

# Error Reporting
VITE_SENTRY_DSN=your_sentry_dsn
```

## 🔒 Security Configuration

### Content Security Policy
```nginx
add_header Content-Security-Policy "
  default-src 'self';
  script-src 'self' 'unsafe-inline' https://cdn.plot.ly;
  style-src 'self' 'unsafe-inline' https://fonts.googleapis.com;
  font-src 'self' https://fonts.gstatic.com;
  img-src 'self' data: https:;
  connect-src 'self' https://api.jansanrakshak.ai;
";
```

### HTTPS Configuration
```nginx
server {
    listen 443 ssl http2;
    ssl_certificate /path/to/certificate.crt;
    ssl_certificate_key /path/to/private.key;
    
    ssl_protocols TLSv1.2 TLSv1.3;
    ssl_ciphers ECDHE-RSA-AES256-GCM-SHA512:DHE-RSA-AES256-GCM-SHA512;
    ssl_prefer_server_ciphers off;
    ssl_session_cache shared:SSL:10m;
}
```

## 📊 Performance Optimization

### Build Optimizations
```javascript
// vite.config.js
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom'],
          charts: ['plotly.js', 'react-plotly.js'],
          ui: ['@mui/material', '@emotion/react', '@emotion/styled']
        }
      }
    },
    chunkSizeWarningLimit: 1000
  }
})
```

### CDN Configuration
```html
<!-- Preload critical resources -->
<link rel="preload" href="/fonts/roboto.woff2" as="font" type="font/woff2" crossorigin>
<link rel="preload" href="https://cdn.plot.ly/plotly-2.26.0.min.js" as="script">

<!-- DNS prefetch for external domains -->
<link rel="dns-prefetch" href="//fonts.googleapis.com">
<link rel="dns-prefetch" href="//cdn.plot.ly">
```

## 📈 Monitoring & Analytics

### Error Monitoring (Sentry)
```javascript
// src/utils/monitoring.js
import * as Sentry from "@sentry/react";

Sentry.init({
  dsn: import.meta.env.VITE_SENTRY_DSN,
  environment: import.meta.env.MODE,
  tracesSampleRate: 1.0,
});
```

### Performance Monitoring
```javascript
// src/utils/analytics.js
export const trackPageView = (page) => {
  if (typeof gtag !== 'undefined') {
    gtag('config', 'GA_TRACKING_ID', {
      page_path: page
    });
  }
};

export const trackEvent = (action, category, label, value) => {
  if (typeof gtag !== 'undefined') {
    gtag('event', action, {
      event_category: category,
      event_label: label,
      value: value
    });
  }
};
```

## 🚨 Troubleshooting

### Common Issues

1. **Blank page after deployment**
   - Check browser console for errors
   - Verify environment variables are set
   - Ensure API endpoints are accessible

2. **Charts not loading**
   - Check if Plotly.js is properly bundled
   - Verify Content Security Policy allows external scripts
   - Check network tab for failed requests

3. **API connection errors**
   - Verify CORS configuration on backend
   - Check API URL format (https vs http)
   - Ensure proper error handling in API service

### Debug Commands
```bash
# Check build output
npm run build && ls -la dist/

# Test production build locally
npm run preview

# Check for unused dependencies
npx depcheck

# Analyze bundle size
npx vite-bundle-analyzer
```

## 🔄 CI/CD Pipeline

### GitHub Actions Example
```yaml
# .github/workflows/deploy.yml
name: Deploy to Production

on:
  push:
    branches: [ main ]

jobs:
  build-and-deploy:
    runs-on: ubuntu-latest
    
    steps:
    - name: Checkout code
      uses: actions/checkout@v3
    
    - name: Setup Node.js
      uses: actions/setup-node@v3
      with:
        node-version: '18'
        cache: 'npm'
    
    - name: Install dependencies
      run: npm ci
    
    - name: Run linter
      run: npm run lint
    
    - name: Build application
      run: npm run build
      env:
        VITE_API_BASE_URL: ${{ secrets.VITE_API_BASE_URL }}
    
    - name: Deploy to S3
      run: |
        aws s3 sync dist/ s3://${{ secrets.S3_BUCKET }} --delete
      env:
        AWS_ACCESS_KEY_ID: ${{ secrets.AWS_ACCESS_KEY_ID }}
        AWS_SECRET_ACCESS_KEY: ${{ secrets.AWS_SECRET_ACCESS_KEY }}
```

## 📝 Post-Deployment Checklist

- [ ] Application loads correctly on all major browsers
- [ ] All API endpoints are responding
- [ ] Charts and visualizations render properly
- [ ] Form validation works as expected
- [ ] PDF generation functions correctly
- [ ] Mobile responsiveness verified
- [ ] Performance metrics are acceptable
- [ ] Error monitoring is active
- [ ] SSL certificate is valid
- [ ] SEO meta tags are present

## 🆘 Support

For deployment issues:
1. Check the application logs
2. Verify environment configuration
3. Test API endpoints manually
4. Review browser console errors
5. Contact the development team

---

**Happy Deploying! 🚀**
