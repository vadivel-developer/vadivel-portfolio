import { NextResponse } from "next/server";
import { google } from "googleapis";

export const runtime = "nodejs";

function isValidEmail(email: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function isValidMobile(mobile: string) {
  return /^[0-9+\-\s()]{10,15}$/.test(mobile);
}

function escapeHtml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

function encodeSubject(subject: string) {
  return `=?UTF-8?B?${Buffer.from(subject).toString("base64")}?=`;
}

function createBase64Url(value: string) {
  return Buffer.from(value)
    .toString("base64")
    .replace(/\+/g, "-")
    .replace(/\//g, "_")
    .replace(/=+$/, "");
}

function createEmailMessage({
  from,
  to,
  replyTo,
  subject,
  html,
}: {
  from: string;
  to: string;
  replyTo?: string;
  subject: string;
  html: string;
}) {
  const message = [
    `From: "Vadivel Portfolio" <${from}>`,
    `To: ${to}`,
    replyTo ? `Reply-To: ${replyTo}` : "",
    `Subject: ${encodeSubject(subject)}`,
    "MIME-Version: 1.0",
    "Content-Type: text/html; charset=utf-8",
    "",
    html,
  ]
    .filter(Boolean)
    .join("\r\n");

  return createBase64Url(message);
}

function adminEmailTemplate({
  name,
  email,
  mobile,
  message,
}: {
  name: string;
  email: string;
  mobile: string;
  message: string;
}) {
  const safeName = escapeHtml(name);
  const safeEmail = escapeHtml(email);
  const safeMobile = escapeHtml(mobile);
  const safeMessage = escapeHtml(message).replace(/\n/g, "<br />");

  return `
    <div style="margin:0;padding:0;background:#f5f7fb;font-family:Arial,Helvetica,sans-serif;">
      <table width="100%" cellpadding="0" cellspacing="0" style="background:#f5f7fb;padding:24px 12px;">
        <tr>
          <td align="center">
            <table width="100%" cellpadding="0" cellspacing="0" style="max-width:640px;background:#ffffff;border-radius:16px;overflow:hidden;border:1px solid #e2e8f0;">
              <tr>
                <td style="background:#0f172a;padding:26px 24px;">
                  <h1 style="margin:0;color:#ffffff;font-size:24px;line-height:32px;">New Portfolio Enquiry</h1>
                  <p style="margin:8px 0 0;color:#cbd5e1;font-size:14px;line-height:22px;">
                    A new visitor submitted your portfolio contact form.
                  </p>
                </td>
              </tr>

              <tr>
                <td style="padding:24px;">
                  <table width="100%" cellpadding="0" cellspacing="0" style="border-collapse:collapse;">
                    <tr>
                      <td style="padding:14px 12px;width:35%;background:#f8fafc;border:1px solid #e2e8f0;font-weight:700;color:#111827;font-size:14px;">Name</td>
                      <td style="padding:14px 12px;border:1px solid #e2e8f0;color:#334155;font-size:14px;">${safeName}</td>
                    </tr>

                    <tr>
                      <td style="padding:14px 12px;background:#f8fafc;border:1px solid #e2e8f0;font-weight:700;color:#111827;font-size:14px;">Email</td>
                      <td style="padding:14px 12px;border:1px solid #e2e8f0;color:#334155;font-size:14px;">
                        <a href="mailto:${safeEmail}" style="color:#087ea4;text-decoration:none;">${safeEmail}</a>
                      </td>
                    </tr>

                    <tr>
                      <td style="padding:14px 12px;background:#f8fafc;border:1px solid #e2e8f0;font-weight:700;color:#111827;font-size:14px;">Mobile</td>
                      <td style="padding:14px 12px;border:1px solid #e2e8f0;color:#334155;font-size:14px;">
                        <a href="tel:${safeMobile}" style="color:#087ea4;text-decoration:none;">${safeMobile}</a>
                      </td>
                    </tr>

                    <tr>
                      <td style="padding:14px 12px;background:#f8fafc;border:1px solid #e2e8f0;font-weight:700;color:#111827;font-size:14px;vertical-align:top;">Message</td>
                      <td style="padding:14px 12px;border:1px solid #e2e8f0;color:#334155;font-size:14px;line-height:24px;">${safeMessage}</td>
                    </tr>
                  </table>

                  <p style="margin:20px 0 0;color:#64748b;font-size:13px;line-height:22px;">
                    You can reply directly to this email to contact the sender.
                  </p>
                </td>
              </tr>

              <tr>
                <td style="background:#f8fafc;padding:18px 24px;text-align:center;color:#64748b;font-size:12px;">
                  Portfolio Contact Form Notification
                </td>
              </tr>
            </table>
          </td>
        </tr>
      </table>
    </div>
  `;
}

function userThankYouTemplate({ name }: { name: string }) {
  const safeName = escapeHtml(name);

  return `
    <div style="margin:0;padding:0;background:#f5f7fb;font-family:Arial,Helvetica,sans-serif;">
      <table width="100%" cellpadding="0" cellspacing="0" style="background:#f5f7fb;padding:24px 12px;">
        <tr>
          <td align="center">
            <table width="100%" cellpadding="0" cellspacing="0" style="max-width:640px;background:#ffffff;border-radius:16px;overflow:hidden;border:1px solid #e2e8f0;">
              <tr>
                <td style="background:#087ea4;padding:26px 24px;">
                  <h1 style="margin:0;color:#ffffff;font-size:24px;line-height:32px;">Thank you for reaching out</h1>
                  <p style="margin:8px 0 0;color:#e0f7ff;font-size:14px;line-height:22px;">
                    I have received your message successfully.
                  </p>
                </td>
              </tr>

              <tr>
                <td style="padding:24px;">
                  <p style="margin:0 0 14px;color:#111827;font-size:16px;line-height:26px;">Hi ${safeName},</p>

                  <p style="margin:0 0 14px;color:#334155;font-size:15px;line-height:26px;">
                    Thank you for contacting me through my portfolio website. I have received your enquiry and will get back to you soon.
                  </p>

                  <p style="margin:0;color:#334155;font-size:15px;line-height:26px;">
                    Regards,<br />
                    <strong>Vadivel T</strong><br />
                    Web Developer
                  </p>
                </td>
              </tr>

              <tr>
                <td style="background:#f8fafc;padding:18px 24px;text-align:center;color:#64748b;font-size:12px;">
                  Vadivel Portfolio
                </td>
              </tr>
            </table>
          </td>
        </tr>
      </table>
    </div>
  `;
}

async function sendGmailEmail({
  to,
  replyTo,
  subject,
  html,
}: {
  to: string;
  replyTo?: string;
  subject: string;
  html: string;
}) {
  const clientId = process.env.GMAIL_CLIENT_ID?.trim();
  const clientSecret = process.env.GMAIL_CLIENT_SECRET?.trim();
  const refreshToken = process.env.GMAIL_REFRESH_TOKEN?.trim();
  const senderEmail = process.env.GMAIL_SENDER_EMAIL?.trim();

  const missingEnv = [
    !clientId && "GMAIL_CLIENT_ID",
    !clientSecret && "GMAIL_CLIENT_SECRET",
    !refreshToken && "GMAIL_REFRESH_TOKEN",
    !senderEmail && "GMAIL_SENDER_EMAIL",
  ].filter(Boolean);

  if (missingEnv.length > 0) {
    throw new Error(`Missing environment variables: ${missingEnv.join(", ")}`);
  }

  const oauth2Client = new google.auth.OAuth2(clientId, clientSecret);

  oauth2Client.setCredentials({
    refresh_token: refreshToken,
  });

  const gmail = google.gmail({
    version: "v1",
    auth: oauth2Client,
  });

  const raw = createEmailMessage({
    from: senderEmail as string,
    to,
    replyTo,
    subject,
    html,
  });

  await gmail.users.messages.send({
    userId: "me",
    requestBody: {
      raw,
    },
  });
}

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const name = String(body.name || "").trim();
    const email = String(body.email || "").trim();
    const mobile = String(body.mobile || "").trim();
    const message = String(body.message || "").trim();

    if (name.length < 3) {
      return NextResponse.json(
        { error: "Please enter a valid name." },
        { status: 400 }
      );
    }

    if (!isValidEmail(email)) {
      return NextResponse.json(
        { error: "Please enter a valid email address." },
        { status: 400 }
      );
    }

    if (!isValidMobile(mobile)) {
      return NextResponse.json(
        { error: "Please enter a valid mobile number." },
        { status: 400 }
      );
    }

    if (message.length < 3) {
      return NextResponse.json(
        { error: "Please enter a message with at least 3 characters." },
        { status: 400 }
      );
    }

    const receiverEmail =
      process.env.CONTACT_RECEIVER_EMAIL?.trim() ||
      process.env.GMAIL_SENDER_EMAIL?.trim();

    if (!receiverEmail) {
      throw new Error("Missing CONTACT_RECEIVER_EMAIL or GMAIL_SENDER_EMAIL");
    }

    await sendGmailEmail({
      to: receiverEmail,
      replyTo: email,
      subject: `New portfolio enquiry from ${name}`,
      html: adminEmailTemplate({
        name,
        email,
        mobile,
        message,
      }),
    });

    await sendGmailEmail({
      to: email,
      replyTo: receiverEmail,
      subject: "Thank you for contacting Vadivel Portfolio",
      html: userThankYouTemplate({ name }),
    });

    return NextResponse.json({
      success: true,
      message: "Message sent successfully. I will contact you soon.",
    });
  } catch (error) {
    console.error("Contact form Gmail API error:", error);

    const errorMessage =
      error instanceof Error ? error.message : "Unknown Gmail API error";

    return NextResponse.json(
      {
        error: "Unable to send message. Please try again later.",
        details:
          process.env.NODE_ENV === "development" ? errorMessage : undefined,
      },
      { status: 500 }
    );
  }
}