# How to Deploy to Vercel

Yes! This project is a standard **Vite + React** application, which Vercel hosts natively with zero configuration.

## Steps to Deploy

### 1. Push to GitHub
Make sure your latest code is pushed to your GitHub repository.

### 2. Import into Vercel
1.  Go to the [Vercel Dashboard](https://vercel.com/dashboard).
2.  Click **"Add New..."** -> **"Project"**.
3.  Select your GitHub repository (`vinayak-deshmuk-_-ai-explorer`).
4.  Click **"Import"**.

### 3. Configure Build Settings
Vercel should automatically detect the correct settings:
- **Framework Preset**: `Vite`
- **Root Directory**: `./`
- **Build Command**: `npm run build`
- **Output Directory**: `dist`

### 4. Application Environment Variables (Important!)
Your project uses Google GenAI, so you must add your API Key in Vercel.
1.  In the Vercel Project Settings, find **"Environment Variables"**.
2.  Add a new variable:
    - **Key**: `VITE_API_KEY` (or `API_KEY`)
    - **Value**: Your actual Google Gemini API Key (starts with `AIza...`)
3.  Click **Add**.

### 5. Deploy
Click **"Deploy"**. Vercel will build your site and provide a live URL (e.g., `vinayak-portfolio.vercel.app`).

---

## Troubleshooting

### "Black Screen" on Production?
If you see a black screen on the live site but it works locally:
- It might be a GPU issue on some devices.
- Converting the "Warp Tunnel" to use **Native Glow** (which we just did!) ensures it works on almost all devices, including mobiles.

### API Issues?
If the Chat/AI features don't work:
- Check that you added the `VITE_API_KEY` in Vercel.
- Check the browser console (`F12`) for errors.
