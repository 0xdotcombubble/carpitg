import { NextRequest, NextResponse } from 'next/server'
import { Resend } from 'resend'

// Lazy-load Resend client to avoid build-time initialization errors
function getResendClient() {
  const apiKey = process.env.RESEND_API
  if (!apiKey) {
    throw new Error('RESEND_API environment variable is not set')
  }
  return new Resend(apiKey)
}

interface ContactFormData {
  name: string
  email: string
  phone: string
  message: string
  turnstileToken: string
}

interface TurnstileResponse {
  success: boolean
  'error-codes'?: string[]
  challenge_ts?: string
  hostname?: string
}

async function verifyTurnstileToken(token: string): Promise<boolean> {
  const secret = process.env.TURNSTILE_SECRET

  if (!secret) {
    console.error('TURNSTILE_SECRET is not configured')
    return false
  }

  try {
    const response = await fetch('https://challenges.cloudflare.com/turnstile/v0/siteverify', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        secret,
        response: token,
      }),
    })

    const data: TurnstileResponse = await response.json()
    return data.success
  } catch (error) {
    console.error('Error verifying Turnstile token:', error)
    return false
  }
}

export async function POST(request: NextRequest) {
  try {
    const body: ContactFormData = await request.json()
    const { name, email, phone, message, turnstileToken } = body

    // Validate required fields
    if (!name || !email || !message || !turnstileToken) {
      return NextResponse.json({ error: 'Minden kötelező mezőt ki kell tölteni' }, { status: 400 })
    }

    // Verify Turnstile token
    const isValidToken = await verifyTurnstileToken(turnstileToken)
    if (!isValidToken) {
      return NextResponse.json(
        { error: 'Bot ellenőrzés sikertelen. Kérjük, próbáld újra.' },
        { status: 403 },
      )
    }

    // Send confirmation email to customer (in Hungarian)
    const resend = getResendClient()
    const customerEmailPromise = resend.emails.send({
      from: 'CarPit Garage <info@carpitgarage.hu>',
      to: email,
      subject: 'Köszönjük megkeresését - CarPit Garage',
      html: `
        <!DOCTYPE html>
        <html>
          <head>
            <meta charset="utf-8">
            <style>
              body {
                font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
                line-height: 1.6;
                color: #333;
                max-width: 600px;
                margin: 0 auto;
                padding: 20px;
              }
              .header {
                background: linear-gradient(135deg, #FF5500 0%, #CC4400 100%);
                color: white;
                padding: 30px;
                border-radius: 8px 8px 0 0;
                text-align: center;
              }
              .content {
                background: #f9f9f9;
                padding: 30px;
                border-radius: 0 0 8px 8px;
              }
              .greeting {
                font-size: 18px;
                color: #333;
                margin-bottom: 20px;
              }
              .message-box {
                background: white;
                padding: 20px;
                border-radius: 4px;
                border-left: 4px solid #FF5500;
                margin: 20px 0;
              }
              .contact-info {
                background: white;
                padding: 20px;
                border-radius: 4px;
                margin-top: 20px;
              }
              .contact-item {
                margin: 10px 0;
              }
              .footer {
                margin-top: 30px;
                padding-top: 20px;
                border-top: 1px solid #ddd;
                color: #999;
                font-size: 12px;
                text-align: center;
              }
            </style>
          </head>
          <body>
            <div class="header">
              <h1 style="margin: 0; font-size: 24px;">CarPit Garage</h1>
              <p style="margin: 10px 0 0 0; opacity: 0.9;">Professzionális autóápolás</p>
            </div>
            <div class="content">
              <div class="greeting">
                Kedves ${name}!
              </div>

              <p style="margin-bottom: 20px;">
                Köszönjük, hogy felkereste a CarPit Garage-t! Megkaptuk az üzenetét és hamarosan felvesszük Önnel a kapcsolatot.
              </p>

              <div class="message-box">
                <strong style="color: #FF5500;">Az Ön üzenete:</strong>
                <p style="margin-top: 10px; white-space: pre-wrap; word-wrap: break-word;">${message}</p>
              </div>

              <p>
                Munkatársunk 24 órán belül válaszol megkeresésére. Ha sürgős kérdése van, kérjük, hívjon minket telefonon.
              </p>

              <div class="contact-info">
                <div class="contact-item">
                  <strong>Telefon:</strong> <a href="tel:+36301234567" style="color: #FF5500;">+36 30 123 4567</a>
                </div>
                <div class="contact-item">
                  <strong>Email:</strong> <a href="mailto:carpitgrg@gmail.com" style="color: #FF5500;">carpitgrg@gmail.com</a>
                </div>
                <div class="contact-item">
                  <strong>Nyitvatartás:</strong><br>
                  H-P: 08:00-20:00<br>
                  Sz: 10:00-18:00<br>
                  V: Zárva
                </div>
              </div>

              <p style="margin-top: 20px;">
                Üdvözlettel,<br>
                <strong>A CarPit Garage csapata</strong>
              </p>

              <div class="footer">
                Ez egy automatikus visszaigazoló email. Kérjük, ne válaszoljon erre az üzenetre.
              </div>
            </div>
          </body>
        </html>
      `,
    })

    // Send notification email to business manager
    const managerEmailPromise = resend.emails.send({
      from: 'CarPit Garage <info@carpitgarage.hu>',
      to: process.env.CONTACT_EMAIL || 'info@carpitgarage.hu',
      replyTo: email,
      subject: `Új kapcsolatfelvételi üzenet - ${name}`,
      html: `
        <!DOCTYPE html>
        <html>
          <head>
            <meta charset="utf-8">
            <style>
              body {
                font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
                line-height: 1.6;
                color: #333;
                max-width: 600px;
                margin: 0 auto;
                padding: 20px;
              }
              .header {
                background: linear-gradient(135deg, #FF5500 0%, #CC4400 100%);
                color: white;
                padding: 30px;
                border-radius: 8px 8px 0 0;
                text-align: center;
              }
              .content {
                background: #f9f9f9;
                padding: 30px;
                border-radius: 0 0 8px 8px;
              }
              .field {
                margin-bottom: 20px;
                background: white;
                padding: 15px;
                border-radius: 4px;
                border-left: 4px solid #FF5500;
              }
              .label {
                font-weight: 600;
                color: #666;
                font-size: 12px;
                text-transform: uppercase;
                margin-bottom: 5px;
              }
              .value {
                color: #333;
                font-size: 16px;
              }
              .message {
                white-space: pre-wrap;
                word-wrap: break-word;
              }
              .actions {
                background: white;
                padding: 20px;
                border-radius: 4px;
                margin-top: 20px;
                text-align: center;
              }
              .button {
                display: inline-block;
                padding: 12px 24px;
                background: #FF5500;
                color: white;
                text-decoration: none;
                border-radius: 4px;
                margin: 5px;
              }
            </style>
          </head>
          <body>
            <div class="header">
              <h1 style="margin: 0; font-size: 24px;">Új Kapcsolatfelvétel</h1>
              <p style="margin: 10px 0 0 0; opacity: 0.9;">CarPit Garage Weboldal</p>
            </div>
            <div class="content">
              <div class="field">
                <div class="label">Név</div>
                <div class="value">${name}</div>
              </div>

              <div class="field">
                <div class="label">Email</div>
                <div class="value"><a href="mailto:${email}" style="color: #FF5500;">${email}</a></div>
              </div>

              ${
                phone
                  ? `
              <div class="field">
                <div class="label">Telefon</div>
                <div class="value"><a href="tel:${phone}" style="color: #FF5500;">${phone}</a></div>
              </div>
              `
                  : ''
              }

              <div class="field">
                <div class="label">Üzenet</div>
                <div class="value message">${message}</div>
              </div>

              <div class="actions">
                <a href="mailto:${email}" class="button">Válasz Emailben</a>
                ${phone ? `<a href="tel:${phone}" class="button">Hívás</a>` : ''}
              </div>

              <p style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #ddd; color: #999; font-size: 12px;">
                Ez az üzenet a carpitgarage.hu weboldal kapcsolatfelvételi űrlapjából érkezett.<br>
                Az ügyfél automatikus visszaigazoló emailt kapott.
              </p>
            </div>
          </body>
        </html>
      `,
    })

    // Send both emails in parallel
    const [customerResult, managerResult] = await Promise.allSettled([
      customerEmailPromise,
      managerEmailPromise,
    ])

    // Check for errors
    const customerError =
      customerResult.status === 'rejected' ? customerResult.reason : customerResult.value.error
    const managerError =
      managerResult.status === 'rejected' ? managerResult.reason : managerResult.value.error

    if (customerError || managerError) {
      console.error('Error sending emails:', { customerError, managerError })

      // If at least one email succeeded, still return success
      if (!customerError || !managerError) {
        return NextResponse.json(
          {
            success: true,
            message: 'Üzeneted sikeresen elküldve! Hamarosan jelentkezünk.',
            warning: 'Egy email részlegesen sikertelen volt, de megkaptuk az üzeneted.',
          },
          { status: 200 },
        )
      }

      // Both failed
      return NextResponse.json(
        { error: 'Hiba történt az üzenet küldése közben. Kérjük, próbáld újra később.' },
        { status: 500 },
      )
    }

    const emailId =
      customerResult.status === 'fulfilled' ? customerResult.value.data?.id : undefined

    return NextResponse.json(
      {
        success: true,
        message: 'Üzeneted sikeresen elküldve! Hamarosan jelentkezünk.',
        emailId,
      },
      { status: 200 },
    )
  } catch (error) {
    console.error('Error processing contact form:', error)
    return NextResponse.json(
      { error: 'Szerver hiba. Kérjük, próbáld újra később.' },
      { status: 500 },
    )
  }
}
