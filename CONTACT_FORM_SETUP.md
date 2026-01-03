# Contact Form Setup Guide

This guide explains how to configure the contact form with Resend email delivery and Cloudflare Turnstile bot protection.

## Overview

The contact form includes:
- **Email delivery** via Resend API
- **Bot protection** via Cloudflare Turnstile
- **Form validation** on both client and server
- **User feedback** with success/error messages
- **Loading states** during submission

## Required Environment Variables

Add these to your Cloudflare Workers environment (via Cloudflare dashboard):

### Resend Configuration

```bash
RESEND_API=re_xxxxxxxxxxxxxxxxxxxxxxxxxxxxx
CONTACT_EMAIL=info@carpitgarage.hu  # Optional: defaults to info@carpitgarage.hu
```

**To get your Resend API key:**
1. Go to [resend.com/api-keys](https://resend.com/api-keys)
2. Create a new API key
3. Copy the key (starts with `re_`)

### Cloudflare Turnstile Configuration

```bash
TURNSTILE_SECRET=0x4AAAAAAAxxxxxxxxxxxxxxxxxxxxxxxxxx
NEXT_PUBLIC_TURNSTILE_SITE_KEY=0x4AAAAAAAxxxxxxxxxxxxxxxxxxxxxxxxxx
```

**To get your Turnstile keys:**
1. Go to [Cloudflare Dashboard](https://dash.cloudflare.com/) → Turnstile
2. Create a new site
3. Copy the Site Key (public) → use for `NEXT_PUBLIC_TURNSTILE_SITE_KEY`
4. Copy the Secret Key → use for `TURNSTILE_SECRET`

> **Note:** The `NEXT_PUBLIC_` prefix is required for client-side access in Next.js

## Setting Environment Variables in Cloudflare

Since this app deploys to Cloudflare Workers, set environment variables via the Cloudflare dashboard:

1. Go to **Workers & Pages** in your Cloudflare dashboard
2. Select your **carpitgarage.hu** project
3. Navigate to **Settings** → **Environment Variables**
4. Add each variable for both **Production** and **Preview** environments

## Resend Email Configuration

### Domain Setup

Your Resend account should be configured for `carpitgarage.hu`:

1. **Add your domain** in Resend dashboard
2. **Verify DNS records** (SPF, DKIM, DMARC)
3. **Set sender email** as `info@carpitgarage.hu` or similar

### Email Template

The contact form sends HTML emails with:
- Customer name, email, phone, and message
- Branded design with CarPit orange accent color
- Reply-to header set to customer's email for easy responses

## How It Works

### Client-Side (ContactSection.tsx)

1. User fills out the form (name, email, phone, message)
2. Turnstile widget renders and validates the user is not a bot
3. On submit, form data + Turnstile token sent to `/api/contact`
4. Loading state shows "Küldés..." with spinner
5. Success/error message displays based on API response
6. Form resets on success, Turnstile resets on error

### Server-Side (api/contact/route.ts)

1. Validates required fields (name, email, message, turnstileToken)
2. Verifies Turnstile token with Cloudflare API
3. If valid, sends email via Resend API
4. Returns success/error response to client

## Testing

### Local Development

To test locally:

1. Set environment variables in `.env.local`:
```bash
RESEND_API=re_xxxxx
TURNSTILE_SECRET=0x4AAAxxxxxxxxx
NEXT_PUBLIC_TURNSTILE_SITE_KEY=0x4AAAxxxxxxxxx
```

2. Run dev server:
```bash
bun run dev
```

3. Navigate to `http://localhost:3000/#contact`
4. Fill out and submit the form

### Testing Turnstile

Cloudflare provides test keys for development:

**Always Passes:**
- Site Key: `1x00000000000000000000AA`
- Secret Key: `1x0000000000000000000000000000000AA`

**Always Fails:**
- Site Key: `2x00000000000000000000AB`
- Secret Key: `2x0000000000000000000000000000000AB`

## Troubleshooting

### "Bot ellenőrzés sikertelen"
- Check that `TURNSTILE_SECRET` is set correctly
- Verify the Turnstile token is being sent in the request
- Check Cloudflare Turnstile dashboard for widget analytics

### "Hiba történt az üzenet küldése közben"
- Verify `RESEND_API` key is valid
- Check that sender email (`info@carpitgarage.hu`) is verified in Resend
- Review Resend logs in their dashboard

### Turnstile widget not showing
- Check browser console for JavaScript errors
- Verify `NEXT_PUBLIC_TURNSTILE_SITE_KEY` is set
- Ensure Turnstile script loads from Cloudflare CDN

### Environment variables not working
- For Cloudflare Workers, set vars in dashboard (not `.env` files)
- Restart dev server after changing `.env.local`
- Check that `NEXT_PUBLIC_` prefix is used for client-side vars

## API Endpoint

### POST /api/contact

**Request Body:**
```json
{
  "name": "János Kovács",
  "email": "janos@example.com",
  "phone": "+36 30 123 4567",
  "message": "Szeretném tisztíttatni az autómat...",
  "turnstileToken": "0.xxxxx..."
}
```

**Success Response (200):**
```json
{
  "success": true,
  "message": "Üzeneted sikeresen elküldve! Hamarosan jelentkezünk.",
  "emailId": "abc123..."
}
```

**Error Response (400/403/500):**
```json
{
  "error": "Minden kötelező mezőt ki kell tölteni"
}
```

## Security Features

- **Turnstile verification** prevents automated bot submissions
- **Server-side validation** ensures data integrity
- **Rate limiting** (inherited from Cloudflare Workers)
- **HTTPS only** communication
- **No sensitive data** stored in client

## Files Modified/Created

- `src/components/ui/ContactSection.tsx` - Updated form component
- `src/app/(frontend)/api/contact/route.ts` - New API endpoint
- `src/types/contact.ts` - TypeScript type definitions
- `src/env.d.ts` - Environment variable types
- `.env.example` - Example environment configuration
