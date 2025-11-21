# Google OAuth 2.0 Setup Guide

## Issue Fixed
Replaced Google Identity Services (GIS) with `@react-oauth/google` library to resolve the `origin_mismatch` error in production.

## What Changed

### 1. **Dependencies Added**
```json
"@react-oauth/google": "^0.12.1",
"jwt-decode": "^4.0.0"
```

### 2. **SocialLogin.tsx Refactored**
- Removed Google Identity Services (GIS) Script loading
- Implemented `@react-oauth/google` with `GoogleOAuthProvider` and `GoogleLogin`
- Simplified authentication flow
- Better error handling and user feedback

## Google Cloud Console Setup

### Step 1: Access Google Cloud Console
1. Go to: https://console.cloud.google.com/apis/credentials
2. Login with your Google account
3. Select your project or create a new one

### Step 2: Configure OAuth 2.0 Client ID
1. Click on your OAuth 2.0 Client ID:
   - Client ID: `280351122038-kjua2hto0jb0g3lksg2d19eov5qdcv3g.apps.googleusercontent.com`
   
2. **Add Authorized JavaScript origins:**
   - For Development: `http://localhost:3000`
   - For Production: Add your production domain(s):
     ```
     https://yourdomain.com
     https://www.yourdomain.com
     ```

3. **Add Authorized redirect URIs (if needed):**
   - For Development: `http://localhost:3000/auth/google/callback`
   - For Production: `https://yourdomain.com/auth/google/callback`

4. Click **SAVE**

### Step 3: Wait for Changes to Propagate
- Changes can take **5-10 minutes** to propagate
- Clear browser cache after waiting
- Try in incognito/private mode to test

## Testing

### Development (localhost)
```bash
npm run dev
# Visit http://localhost:3000/en/login
# Click "Continue with Google"
# Should work without origin_mismatch error
```

### Production
1. Deploy your application
2. Wait 5-10 minutes after updating Google Cloud Console
3. Clear browser cache
4. Test Google Sign-In
5. Check browser console for any errors

## API Integration

The component sends the Google credential to your backend:
```
POST https://king-prawn-app-x9z27.ondigitalocean.app/api/authentication/google
Body: { credential: "JWT_TOKEN_FROM_GOOGLE" }
```

### Backend Expected Response
Your backend should return one of these token formats:
```json
// Option 1: Direct token
{
  "token": "your_jwt_token"
}

// Option 2: Nested token
{
  "data": {
    "token": "your_jwt_token"
  }
}

// Option 3: Alternative names
{
  "accessToken": "your_jwt_token"  // or jwt, idToken, id_token, authToken
}

// Optional: Include user data
{
  "token": "your_jwt_token",
  "userData": {
    "id": "user_id",
    "email": "user@example.com",
    "name": "User Name"
  }
}
```

## Troubleshooting

### Still Getting origin_mismatch Error?
1. **Verify the domain is correct:**
   - Check console logs for current origin
   - Ensure it matches exactly in Google Cloud Console
   - Include `https://` or `http://` correctly

2. **Wait longer:**
   - Google's changes can take up to 10 minutes
   - Try again after 15 minutes

3. **Check the Client ID:**
   - Ensure you're editing the correct OAuth 2.0 Client ID
   - Client ID in code matches the one in Google Cloud Console

4. **Clear cache:**
   ```bash
   # Clear browser cache
   # Or try incognito/private mode
   ```

### Authentication Fails After Google Login?
1. **Check backend logs:**
   - Verify credential is being received
   - Check token extraction logic

2. **Verify API endpoint:**
   - Ensure `https://king-prawn-app-x9z27.ondigitalocean.app/api/authentication/google` is accessible
   - Check CORS settings on backend

3. **Check token format:**
   - Backend must return a valid JWT token
   - Token should be stored in localStorage as `authToken`

## Architecture

### Flow Diagram
```
User clicks "Continue with Google"
    ↓
GoogleLogin component triggers
    ↓
Google OAuth popup/redirect
    ↓
User authorizes app
    ↓
Google returns JWT credential
    ↓
Send credential to backend
    ↓
Backend validates with Google
    ↓
Backend returns app JWT token
    ↓
Store token in localStorage
    ↓
Redirect to dashboard/home
```

## Security Notes

1. **Client ID is public** - It's safe to expose in client-side code
2. **Never expose Client Secret** - Keep it on backend only
3. **Validate on backend** - Always verify Google tokens on your server
4. **Use HTTPS in production** - Never use HTTP for OAuth in production

## Additional Resources

- [Google OAuth 2.0 Documentation](https://developers.google.com/identity/protocols/oauth2)
- [@react-oauth/google Documentation](https://www.npmjs.com/package/@react-oauth/google)
- [JWT Decode Library](https://www.npmjs.com/package/jwt-decode)

## Support

If you continue to face issues:
1. Check browser console for detailed error messages
2. Verify Google Cloud Console settings
3. Test with a different browser or incognito mode
4. Contact your backend team to verify API integration
