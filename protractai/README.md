<div align="center">
<img width="1200" height="475" alt="GHBanner" src="https://github.com/user-attachments/assets/0aa67016-6eaf-458a-adb2-6e31a0763ed6" />
</div>

# Run and Deploy Your AI Studio App

This repository contains everything you need to run and deploy your AI Studio application.

**View your app:** https://ai.studio/apps/temp/1

## Prerequisites

- Node.js (v16 or higher recommended)
- A Gemini API key from [Google AI Studio](https://makersuite.google.com/app/apikey)

## Running the App Locally

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Configure your API key:**
   - Open the [.env.local](.env.local) file
   - Set your Gemini API key:
     ```
     GEMINI_API_KEY=your_api_key_here
     ```

3. **Start the development server:**
   ```bash
   npm run dev
   ```

4. **Access the app:**
   - Open your browser and navigate to `http://localhost:3000`
   - The app will automatically reload when you make changes

## Deployment

For production deployment, build the app first:
```bash
npm run build
npm start
```
