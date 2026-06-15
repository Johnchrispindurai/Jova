import nodemailer from 'nodemailer';

export const sendOtpEmail = async (email, otp) => {
  const transporter = nodemailer.createTransport({
    host: process.env.EMAIL_HOST || 'smtp.gmail.com',
    port: parseInt(process.env.EMAIL_PORT || '587'),
    secure: false, // true for port 465, false for other ports
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  const mailOptions = {
    from: `"JOVA Atelier" <${process.env.EMAIL_USER || 'no-reply@jova.com'}>`,
    to: email,
    subject: 'JOVA Authentication OTP',
    text: `Your 6-digit verification code is: ${otp}. It will expire in 5 minutes.`,
    html: `
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
    `,
  };

  try {
    if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS) {
      console.log(`[EMAIL DEV MOCK] SMTP credentials not set. OTP for ${email} is: ${otp}`);
      return true;
    }
    await transporter.sendMail(mailOptions);
    console.log(`[EMAIL SUCCESS] OTP email sent to ${email}`);
    return true;
  } catch (error) {
    console.log(`[EMAIL ERROR] Failed to send email via SMTP, falling back to mock. OTP for ${email} is: ${otp}`, error.message);
    return true;
  }
};
