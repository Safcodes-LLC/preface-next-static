# Google OAuth Troubleshooting Guide

## 🚨 Current Issue: "origin_mismatch" on Live Website

This error means your production URL is **NOT** added to Google Cloud Console.

---

## ✅ Step-by-Step Fix (Required)

### 1. Find Your Production URL

Open your live website and check the browser URL bar. It should be something like:
```
https://preface-next-static.vercel.app
```
or
```
https://your-custom-domain.com
```

### 2. Open Browser Console

1. Go to your live website's login page
2. Press `F12` or right-click → Inspect
3. Click on the **Console** tab
4. Look for this message:
```
🔍 GOOGLE OAUTH SETUP DEBUGGER
📍 Current Origin: https://your-actual-url.vercel.app
```

**Copy that exact URL!**

### 3. Add URL to Google Cloud Console

1. Go to: https://console.cloud.google.com/apis/credentials
2. Sign in if needed
3. Click on your OAuth 2.0 Client ID:
   ```
   280351122038-kjua2hto0jb0g3lksg2d19eov5qdcv3g.apps.googleusercontent.com
   ```

4. Scroll to **"Authorized JavaScript origins"**

5. Click **"+ ADD URI"**

6. Paste your production URL (the one from step 2), for example:
   ```
   https://preface-next-static.vercel.app
   ```

7. If you have multiple URLs (preview deployments), add each one:
   ```
   https://preface-next-static.vercel.app
   https://preface-next-static-git-main-safcodes-llc.vercel.app
   https://your-custom-domain.com
   ```

8. Click **SAVE** at the bottom

9. **Wait 5-10 minutes** for Google to propagate the changes

10. **Clear browser cache** or test in incognito/private mode

---

## 🔍 Common Mistakes

### ❌ Wrong Protocol
```
http://your-site.vercel.app   ← WRONG (http)
https://your-site.vercel.app  ← CORRECT (https)
```

### ❌ Trailing Slash
```
https://your-site.vercel.app/  ← WRONG (has trailing slash)
https://your-site.vercel.app   ← CORRECT (no trailing slash)
```

### ❌ Wrong URL
Make sure you're adding the **exact** URL from your browser console, not guessing.

---

## 📝 Verification Checklist

Before testing, make sure:

- [ ] Production URL is added to Google Cloud Console
- [ ] Using `https://` (not `http://`)
- [ ] No trailing slash in the URL
- [ ] Waited 5-10 minutes after saving
- [ ] Cleared browser cache / tested in incognito
- [ ] Environment variable `NEXT_PUBLIC_GOOGLE_CLIENT_ID` is set in Vercel
- [ ] Backend API allows CORS from your domain

---

## 🧪 Test After Setup

1. Open your live website in **incognito/private mode**
2. Go to the login page
3. Click "Sign in with Google"
4. Should now work!

---

## 🔧 Still Not Working?

### Check Browser Console

Look for error messages in the console (F12):

**If you see:** `origin_mismatch`
- **Fix:** URL not added to Google Cloud Console

**If you see:** `popup_blocked`
- **Fix:** Allow popups for your site

**If you see:** `CORS error`
- **Fix:** Backend needs to allow your domain

### Check Environment Variables in Vercel

1. Go to Vercel Dashboard
2. Select your project
3. Settings → Environment Variables
4. Verify `NEXT_PUBLIC_GOOGLE_CLIENT_ID` is set
5. If you just added it, **redeploy** the app

### Check Multiple Deployment URLs

Vercel creates multiple URLs:
- Production: `https://your-app.vercel.app`
- Branch: `https://your-app-git-branch-team.vercel.app`
- Preview: `https://your-app-abc123.vercel.app`

You might need to add the specific deployment URL you're testing.

---

## 📞 Quick Commands

### Get all your Vercel deployments:
```bash
vercel ls preface-next-static
```

### Check current environment variables:
```bash
vercel env ls
```

---

## ⚡ The Real Issue

**There is NO code bug.** The code is fine.

The issue is **configuration**: Your production URL must be registered in Google Cloud Console. Google's OAuth service blocks any URL that isn't explicitly whitelisted.

**This is a security feature by Google**, not a bug in your code.

---

## 📚 References

- [Google OAuth Documentation](https://developers.google.com/identity/protocols/oauth2)
- [Google Cloud Console](https://console.cloud.google.com/apis/credentials)
- [Vercel Environment Variables](https://vercel.com/docs/concepts/projects/environment-variables)
