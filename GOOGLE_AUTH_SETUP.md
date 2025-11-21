# Google OAuth Setup Guide

## Current Configuration
- **Google Client ID:** `280351122038-kjua2hto0jb0g3lksg2d19eov5qdcv3g.apps.googleusercontent.com`
- **Backend API:** `https://king-prawn-app-x9z27.ondigitalocean.app`

## ⚠️ CRITICAL: Add Your URLs to Google Cloud Console

### Step 1: Access Google Cloud Console
1. Go to [Google Cloud Console](https://console.cloud.google.com/apis/credentials)
2. Sign in with your Google account
3. Select your project

### Step 2: Configure OAuth Client
1. Click on your OAuth 2.0 Client ID: `280351122038-kjua2hto0jb0g3lksg2d19eov5qdcv3g.apps.googleusercontent.com`
2. Find the section **"Authorized JavaScript origins"**

### Step 3: Add ALL These URLs

#### Development URLs
```
http://localhost:3000
http://localhost:4000
```

#### Production URLs (ADD YOUR ACTUAL VERCEL URLs HERE)
```
https://your-app-name.vercel.app
https://your-app-name-git-main-your-team.vercel.app
https://your-custom-domain.com
https://www.your-custom-domain.com
```

#### Example for this project:
```
https://preface-next-static.vercel.app
https://preface-next-static-git-main-safcodes-llc.vercel.app
https://prefaceislam.com (if this is your domain)
https://www.prefaceislam.com
```

### Step 4: Add Redirect URIs (Optional)
In **"Authorized redirect URIs"** section, add:
```
http://localhost:3000
https://your-production-url.vercel.app
https://your-custom-domain.com
```

### Step 5: Save Changes
1. Click **SAVE** at the bottom
2. Wait 5-10 minutes for changes to propagate
3. Clear browser cache or test in incognito mode

---

## Vercel Environment Variables

Make sure these are set in your Vercel project:

1. Go to [Vercel Dashboard](https://vercel.com/dashboard)
2. Select your project: `preface-next-static`
3. Go to **Settings** → **Environment Variables**
4. Add:
   - **Name:** `NEXT_PUBLIC_GOOGLE_CLIENT_ID`
   - **Value:** `280351122038-kjua2hto0jb0g3lksg2d19eov5qdcv3g.apps.googleusercontent.com`
   - **Environments:** Check all (Production, Preview, Development)
5. Click **Save**
6. **Redeploy** your application

---

## Backend CORS Configuration

Your backend at `https://king-prawn-app-x9z27.ondigitalocean.app` must allow CORS from:
- `http://localhost:3000`
- `http://localhost:4000`
- All your Vercel deployment URLs
- Your custom domain (if any)

Contact your backend developer to add these origins to the CORS whitelist.

---

## Troubleshooting

### Error: "origin_mismatch"
**Cause:** Your current URL is not in Google's authorized origins list.

**Solution:**
1. Open browser console (F12)
2. Look for log: `[Google Auth] Current Origin: https://...`
3. Copy that exact URL
4. Add it to Google Cloud Console as shown above
5. Wait 5-10 minutes and try again

### Error: "popup_failed_to_open"
**Cause:** Browser is blocking popups.

**Solution:** Allow popups for your site in browser settings.

### Error: "CORS error"
**Cause:** Backend is not allowing requests from your domain.

**Solution:** Update backend CORS configuration to include your domain.

---

## Testing

### Local Testing
```bash
npm run dev
# Open http://localhost:3000
# Try Google Sign-In
```

### Check Console Logs
When you click "Sign in with Google", check browser console (F12) for:
```
[Google Auth] Current Origin: https://your-url.com
[Google Auth] Make sure this origin is added to Google Cloud Console
```

Copy the "Current Origin" URL and add it to Google Cloud Console.

---

## Need Help?

If Google Sign-In still doesn't work after following these steps:

1. Check browser console for error messages
2. Verify the URL in the error matches what you added to Google Cloud Console
3. Make sure you waited 5-10 minutes after saving changes
4. Try in incognito/private mode to avoid cache issues
5. Verify environment variable is set in Vercel
