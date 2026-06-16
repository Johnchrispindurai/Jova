import { Resend } from 'resend';

// Reuse a single Resend instance
const resend = process.env.RESEND_API_KEY ? new Resend(process.env.RESEND_API_KEY) : null;

export const sendOtpEmail = async (email, otp) => {
  // Use the default ONLY in development
  const from =
    process.env.EMAIL_FROM ||
    (process.env.NODE_ENV !== "production"
      ? "onboarding@resend.dev"
      : null);

  if (process.env.NODE_ENV === "production" && !from) {
    throw new Error("EMAIL_FROM is required in production");
  }

  // Fall back in non-production when RESEND_API_KEY is not configured
  if (!resend) {
    if (process.env.NODE_ENV === 'production') {
      throw new Error("RESEND_API_KEY is required in production");
    }
    console.log(`[EMAIL DEV MOCK] RESEND_API_KEY not configured. OTP for ${email} is: ${otp}`);
    return true;
  }

  const htmlContent = `
    <div style="font-family: sans-serif; max-width: 600px; margin: auto; padding: 25px; border: 1px solid #e5e7eb; border-radius: 12px; background-color: #ffffff;">
      <h2 style="font-family: serif; text-align: center; color: #111111; letter-spacing: 3px; font-weight: normal; margin-bottom: 20px;">JOVA ATELIER</h2>
      <div style="border-top: 1px solid #f3f4f6; margin-bottom: 25px;"></div>
      <p style="font-size: 14px; color: #374151; line-height: 1.6; margin-bottom: 15px;">Hello,</p>
      <p style="font-size: 14px; color: #374151; line-height: 1.6; margin-bottom: 25px;">Use the following 6-digit verification code to complete your login or registration at JOVA. This code will expire in 5 minutes.</p>
      <div style="text-align: center; margin: 35px 0;">
        <span style="font-size: 34px; font-weight: bold; letter-spacing: 8px; color: #c5a880; border: 1px dashed #c5a880; padding: 12px 28px; background-color: #faf8f5; border-radius: 4px; display: inline-block;">${otp}</span>
      </div>
      <p style="font-size: 12px; color: #9ca3af; text-align: center; margin-top: 30px; line-height: 1.5;">If you did not request this code, you can safely ignore this email.</p>
      <div style="border-top: 1px solid #f3f4f6; margin-top: 25px; padding-top: 15px; text-align: center; font-size: 10px; color: #9ca3af; letter-spacing: 1px;">
        ATELIER JOVA &bull; LUXURY APPAREL & DESIGN
      </div>
    </div>
  `;

  try {
    // Timeout of 10 seconds wrapped in Promise.race
    await Promise.race([
      resend.emails.send({
        from: from,
        to: email,
        subject: 'JOVA Authentication OTP',
        html: htmlContent,
      }),
      new Promise((_, reject) =>
        setTimeout(() => reject(new Error("Email timeout")), 10000)
      ),
    ]);

    console.log(`[EMAIL SUCCESS] OTP email sent to ${email}`);
    return true;
  } catch (error) {
    if (process.env.NODE_ENV === 'production') {
      console.error(`[EMAIL ERROR] Failed to send email via Resend: ${error.message}`);
      throw error;
    } else {
      console.log(`[EMAIL ERROR] Failed to send email via Resend, falling back to mock. OTP for ${email} is: ${otp}`, error.message);
      return true;
    }
  }
};
