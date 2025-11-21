# ⚠️ IMPORTANT: Google OAuth Cannot Be Fixed in Code

## Why You're Seeing This Error

The error `origin_mismatch` means:
- Google is blocking your website
- Your website URL is NOT in their allowed list
- This is a **SECURITY FEATURE** by Google

## What This Means

**You CANNOT fix this with code changes.**

This is like:
- Having a key (your code) ✅
- But the lock is on a different door ❌
- You need to tell Google which door to unlock

## The Only Solution

You must **manually add your website URL** to Google Cloud Console.

Think of it like:
1. You own a building (your code)
2. Google is the security guard
3. You need to give the guard a list of allowed visitors (authorized URLs)
4. The guard won't let anyone in without being on the list

## Step-by-Step Instructions

### 1. Find Your Website URL
Your production site is at: **`https://preface-beta.vercel.app`**

### 2. Open Google Cloud Console
Click here: [Google Cloud Console](https://console.cloud.google.com/apis/credentials)

### 3. Find Your OAuth Client
Look for this ID:
```
280351122038-kjua2hto0jb0g3lksg2d19eov5qdcv3g.apps.googleusercontent.com
```
Click on it.

### 4. Add Your URL
- Scroll to "Authorized JavaScript origins"
- Click "+ ADD URI"
- Type: `https://preface-beta.vercel.app`
- Click SAVE

### 5. Wait
Google takes 5-10 minutes to update their servers.

### 6. Test
- Open incognito/private window
- Go to your login page
- Try Google Sign-In
- It should work! ✅

## Screenshots Needed

When you're in Google Cloud Console, you should see a section that looks like:

```
Authorized JavaScript origins
  http://localhost:3000          [existing]
  https://preface-beta.vercel.app  [← ADD THIS]
```

## What I've Done in the Code

I've added helpful error messages that will:
1. ✅ Show a yellow warning banner on production if URL not configured
2. ✅ Log detailed instructions in the browser console
3. ✅ Show the exact URL you need to add
4. ✅ Give you a link to Google Cloud Console

But these are just **helpers** - they don't fix the actual problem.

## Analogy

Imagine:
- Your code is a car 🚗
- Google OAuth is a gated community 🏘️
- The error is the guard saying "You're not on the list" 🚫
- You need to call the office (Google Cloud Console) and add your name to the list 📝

No amount of car modifications will get you past the gate. You need to be added to the list.

## Why Can't Code Fix This?

Because:
1. Google runs the OAuth service (not you)
2. Google checks their servers (not your code)
3. Google's servers have a list of allowed URLs
4. You need to update THEIR list, not your code

## Next Steps

1. **Go to Google Cloud Console** (link above)
2. **Add the URL** (instructions above)
3. **Wait 10 minutes**
4. **Test** in incognito mode
5. **Come back** if still not working

## Need Help?

If you've added the URL and it's still not working after 10 minutes:
1. Double-check you added the EXACT URL: `https://preface-beta.vercel.app`
2. Make sure NO trailing slash: ❌ `https://preface-beta.vercel.app/`
3. Make sure HTTPS (not HTTP): ❌ `http://preface-beta.vercel.app`
4. Clear browser cache or use incognito mode
5. Check if you clicked SAVE in Google Cloud Console

---

**This is 100% normal setup for OAuth.** Every developer using Google Sign-In must do this. It's not a bug - it's required configuration.
