const { transporter, defaultFrom } = require('../config/mail');

const sendEmail = async ({ to, subject, text, html }) => {
  try {
    const info = await transporter.sendMail({
      from: defaultFrom,
      to,
      subject,
      text,
      html: html || `<p>${text}</p>`,
    });
    console.log(`[Email Service] Message sent successfully to ${to}. Message ID: ${info.messageId}`);
    return info;
  } catch (error) {
    console.error('[Email Service Error]:', error.message);
    return null;
  }
};

const sendPasswordResetEmail = async (toEmail, resetUrl) => {
  return sendEmail({
    to: toEmail,
    subject: 'KasaSync - Password Reset Request',
    text: `You requested a password reset. Click here to reset your password: ${resetUrl}`,
    html: `
      <div style="font-family: Arial, sans-serif; padding: 20px; background-color: #0f172a; color: #f8fafc; border-radius: 12px;">
        <h2 style="color: #2563eb;">KasaSync Password Reset</h2>
        <p>You requested to reset your password for your KasaSync account.</p>
        <a href="${resetUrl}" style="display: inline-block; padding: 12px 24px; background-color: #2563eb; color: #fff; text-decoration: none; border-radius: 8px; font-weight: bold; margin-top: 10px;">Reset Password</a>
        <p style="margin-top: 20px; font-size: 12px; color: #94a3b8;">If you did not request this, please ignore this email.</p>
      </div>
    `,
  });
};

module.exports = {
  sendEmail,
  sendPasswordResetEmail,
};
