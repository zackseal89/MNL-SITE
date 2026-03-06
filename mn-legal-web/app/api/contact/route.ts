import { NextRequest, NextResponse } from 'next/server';
import { Resend } from 'resend';

// Initialize Resend with API Key from environment variables
const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { fullName, email, matterType, summary, honeypot } = body;

    // ── SPAM PROTECTION (Honeypot) ──
    // If the hidden 'honeypot' field is filled, it's likely a bot
    if (honeypot) {
      console.warn('Spam detected via honeypot field.');
      return NextResponse.json({ success: true, message: 'Message "sent" successfully.' }, { status: 200 });
    }

    // ── VALIDATION ──
    if (!fullName || !email || !matterType || !summary) {
      return NextResponse.json({ error: 'All fields are required.' }, { status: 400 });
    }

    // ── SEND EMAIL ──
    // Note: If you haven't verified a domain in Resend, 
    // you can only send TO the email you signed up with.
    const { data, error } = await resend.emails.send({
      from: 'MN Legal Web <onboarding@resend.dev>', // Update this after domain verification
      to: ['info@mnlegal.net'],
      subject: `New Legal Inquiry: ${matterType} - ${fullName}`,
      replyTo: email,
      html: `
        <div style="font-family: sans-serif; line-height: 1.6; color: #1a2744; max-width: 600px; border: 1px solid #eee; padding: 40px;">
          <h2 style="border-bottom: 2px solid #8b1c3f; padding-bottom: 10px; font-style: italic;">New Consultation Inquiry</h2>
          
          <p><strong>Client Name:</strong> ${fullName}</p>
          <p><strong>Client Email:</strong> ${email}</p>
          <p><strong>Legal Matter:</strong> ${matterType}</p>
          
          <div style="background: #f5f3ef; padding: 20px; border-left: 4px solid #8b1c3f; margin-top: 20px;">
            <p style="margin-top: 0; font-weight: bold; font-size: 12px; text-transform: uppercase; letter-spacing: 1px; color: #8b1c3f;">Summary of Matter</p>
            <p style="white-space: pre-wrap;">${summary}</p>
          </div>
          
          <p style="font-size: 11px; color: #999; margin-top: 40px;">
            This inquiry was sent from the MN Legal website contact form.
          </p>
        </div>
      `,
    });

    if (error) {
      console.error('Resend Error:', error);
      return NextResponse.json({ error: 'Failed to send email.' }, { status: 500 });
    }

    return NextResponse.json({ success: true, data }, { status: 200 });
  } catch (err) {
    console.error('API Route Error:', err);
    return NextResponse.json({ error: 'Internal server error.' }, { status: 500 });
  }
}
