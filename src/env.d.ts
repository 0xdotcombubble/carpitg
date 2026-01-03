declare namespace NodeJS {
  interface ProcessEnv {
    // Resend
    RESEND_API: string
    CONTACT_EMAIL?: string

    // Cloudflare Turnstile
    TURNSTILE_SECRET: string
    NEXT_PUBLIC_TURNSTILE_SITE_KEY: string

    // Existing environment variables
    PAYLOAD_SECRET: string
    DATABASE_URI?: string
    NEXT_PUBLIC_SERVER_URL?: string
  }
}
