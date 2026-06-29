# LastNight — Smart Exam Preparation Platform

## Deploy to Vercel 

### Step 1: Get the code on GitHub
1. Go to [github.com/new](https://github.com/new) and create a new repo called `lastnight`
2. Upload all the files from this folder (keep the folder structure):
   ```
   lastnight/
   ├── api/
   │   └── chat.js          ← Serverless proxy (hides your API key)
   ├── public/
   │   └── index.html        ← The app
   ├── vercel.json
   ├── package.json
   └── .env.example
   ```

### Step 2: Deploy on Vercel
1. Go to [vercel.com](https://vercel.com) and sign in with GitHub
2. Click **"Add New Project"** → Import your `lastnight` repo
3. Before clicking Deploy, go to **Environment Variables**
4. Add:  
   - **Name:** `OPENAI_API_KEY`  
   - **Value:** `sk-proj-your-actual-key-here`
5. Click **Deploy**

Your site will be live at `https://lastnight-your-username.vercel.app`in ~30 seconds.

### Step 3: Revoke your old key
Since your old API key was in client-side code, go to [platform.openai.com/api-keys](https://platform.openai.com/api-keys), delete the old key, and generate a fresh one for the Vercel environment variable.

---

## How it work

- **Frontend** (`public/index.html`) — The full app. Calls `/api/chat`for AI features.
- **Backend** (`api/chat.js`) — A tiny serverless function that holds your OpenAI API key privately and forwards requests. Users never see the key.

## Local development

```bash
npm i -g vercel
echo "OPENAI_API_KEY=sk-proj-your-key" > .env
vercel dev
```
Opens at `http://localhost:3000`.

## Custom domain

In Vercel dashboard → your project → Settings → Domains → add your domain.
