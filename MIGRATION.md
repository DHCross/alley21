# Alley 21 Enterprises — Migration & Deployment Guide

This guide details environment setup, Web3Forms contact submission delivery, Vercel project configuration, and post-cutover verification for **alley21enterprises.com**.

---

## 1. Contact Form Delivery Setup (Web3Forms)

The Alley 21 contact form at `/contact` uses [Web3Forms](https://web3forms.com/) for serverless email submission on static Vercel deploys.

### Key Ownership & Direct Delivery Specs
- **Primary Recipient**: `sfbreeden@alley21enterprises.com` (Key Owner & Business Owner)
- **Free Tier Execution**: Web3Forms Access Key is generated directly under `sfbreeden@alley21enterprises.com`. All form inquiries land directly in Stephanie's inbox.
- **Subject Format**: `Alley 21 website inquiry — {area}`
- **Attributable Replies**: `from_name` set to submitter's `name`, `replyto` set to submitter's `email`.

### Standard Free Tier Payload (`src/pages/contact.tsx`)

The POST request sends the following clean JSON payload to `https://api.web3forms.com/submit`:

```json
{
  "access_key": "YOUR_WEB3FORMS_KEY",
  "subject": "Alley 21 website inquiry — {area}",
  "from_name": "{name}",
  "replyto": "{email}",
  "area": "{area}",
  "name": "{name}",
  "email": "{email}",
  "message": "{message}",
  "botcheck": ""
}
```

---

## 2. Web3Forms Key Activation & Vercel Setup

1. **Generate Web3Forms Access Key**:
   - Go to [web3forms.com](https://web3forms.com/).
   - Enter `sfbreeden@alley21enterprises.com` and click **Create Access Key**.
   - Open `sfbreeden@alley21enterprises.com` webmail, find the Web3Forms activation email, and click to activate key.

2. **Configure Local `.env.local`**:
   - Add the activated key to `.env.local` in project root:
     ```env
     VITE_WEB3FORMS_KEY=stephanie_activated_access_key_here
     ```
   - `.env.local` is listed in `.gitignore` and will not be committed.

3. **Configure Vercel Environment Variables**:
   - Go to **Vercel Project Settings** > **Environment Variables**.
   - Add:
     - **Name**: `VITE_WEB3FORMS_KEY`
     - **Value**: `<stephanie_activated_access_key>`
     - **Environments**: Select `Production`, `Preview`, and `Development`.

---

## 3. Five UI States & Accessibility

- **Idle**: Editable form fields and enabled submit button (`Send message`).
- **Validation**: Native HTML5 required field and email format validation before fetch.
- **Submitting**: Inputs disabled (`disabled={sending}`), button label changed to `Sending...`, double-submit prevented.
- **Success**: Fired **only** on HTTP 200 + `{ success: true }`. Form unmounts, displaying confirmation (`"Message received. We'll be in touch shortly."`). Focus shifted to container (`statusRef`).
- **Error**: Fired on network error, missing key, or API non-success. Preserves inputs, enables retry, displays banner with fallback email: `"Something went wrong. Please try again or reach us directly at sfbreeden@alley21enterprises.com"`.
- **Spam Protection**: Hidden `botcheck` input (`position: absolute; left: -9999px`).
- **Accessibility**: Status area wrapped in `aria-live="polite"` with programmatic focus management.

---

## 4. Verification & Cutover Checklist

1. `npm run type-check`: Zero TypeScript errors (`tsc --noEmit`).
2. `npm run build`: Production client and SSR bundles build successfully.
3. **Live Submission Test**: Submit test message via `/contact` and confirm delivery directly to `sfbreeden@alley21enterprises.com`.
