# Deployment Guide for CarPit Garage

## ✅ Issues Fixed

### 1. ESLint Warnings - Fixed
- Replaced all `any` types with proper `unknown` types in `src/lib/getPageData.ts`
- Added type guards for safer type assertions

### 2. Metadata Warnings - Fixed
- Added `metadataBase` configuration in `src/app/(frontend)/layout.tsx`
- Moved `viewport` to separate export as required by Next.js 15
- Uses `NEXT_PUBLIC_URL` environment variable or defaults to `https://carpitgarage.hu`

### 3. PAYLOAD_SECRET - Partially Fixed
- Added build-time fallback in `src/payload.config.ts`
- **IMPORTANT**: You MUST set the real `PAYLOAD_SECRET` in Cloudflare Pages

## 🔧 Required Cloudflare Configuration

### Environment Variables to Set in Cloudflare Pages

1. Go to your Cloudflare Pages project
2. Navigate to **Settings** → **Environment variables**
3. Add the following variables for **Production** and **Preview**:

#### Production Environment
```
PAYLOAD_SECRET=256db4ee15d271ca51d9eaa6fdb2b39dc0d24d8ce34ba125b7973cd3716002e8
NEXT_PUBLIC_URL=https://carpitgarage.hu
NODE_ENV=production
```

#### Preview/Development Environment
```
PAYLOAD_SECRET=256db4ee15d271ca51d9eaa6fdb2b39dc0d24d8ce34ba125b7973cd3716002e8
NEXT_PUBLIC_URL=https://your-preview-url.pages.dev
```

### R2 Storage Configuration

The application uses Cloudflare R2 for storing uploaded images (JPEGs, PNGs, etc.). The configuration is already set up in the code, but you need to ensure:

1. **R2 Bucket Binding**: Your Cloudflare Pages project should have the R2 bucket bound with the name `R2`
2. **D1 Database Binding**: Your D1 database should be bound with the name `D1`
3. **Server URL**: The `NEXT_PUBLIC_URL` environment variable is used to generate proper image URLs

#### How Images Work

- **SVG/Static Files**: Served from `/public` directory (e.g., `/logo.svg`)
- **Uploaded Images**: Served through Payload's built-in file serving at `/api/media/file/{filename}`
- **URL Structure**: Images uploaded to R2 will have URLs like `https://carpitgarage.hu/api/media/file/image.jpg`

#### Troubleshooting Image Loading

If images aren't loading:

1. **Check serverURL**: Make sure `NEXT_PUBLIC_URL` is set correctly in Cloudflare Pages
2. **Verify R2 Binding**: In Cloudflare Pages settings, check that R2 bucket is properly bound
3. **Check Image URLs**: In the Payload admin (`/admin`), view a media item and check the generated URL
4. **Browser Console**: Check for CORS or 404 errors in the browser developer tools

## 📋 Build Configuration

The build command in Cloudflare Pages should be:
```bash
bun run build
```

Output directory:
```
.open-next/worker
```

## ⚠️ Important Notes

1. **PAYLOAD_SECRET**: The secret shown above is from your local `.env` file. For production, you should generate a new secure secret:
   ```bash
   openssl rand -hex 32
   ```

2. **Database Connection**: The build will use fallback data if it can't connect to the database during static generation. This is normal and expected.

3. **Environment Variables**: After setting environment variables in Cloudflare, trigger a new deployment for them to take effect.

## 🚀 Deployment Checklist

- [x] Fix TypeScript `any` types
- [x] Add `metadataBase` configuration
- [x] Move viewport to separate export
- [x] Add PAYLOAD_SECRET fallback
- [ ] Set PAYLOAD_SECRET in Cloudflare Pages
- [ ] Set NEXT_PUBLIC_URL in Cloudflare Pages
- [ ] Trigger new deployment
- [ ] Verify site loads correctly
- [ ] Test dynamic routes (/services/[slug], /portfolio/[slug], /pricing/[slug])

## 🔍 Verification

After deployment, check:
1. Homepage loads without errors
2. Services/Portfolio/Pricing pages load
3. Dynamic routes work (click on cards)
4. Admin panel is accessible at `/admin`
5. No console errors in browser

## 📝 Next Steps

1. Set environment variables in Cloudflare Pages dashboard
2. Redeploy the application
3. Monitor the build logs for any errors
4. Test all functionality on the live site
