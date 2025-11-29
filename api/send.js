// api/send.js - envoi via SendGrid (remplacer uniquement si tu as défini SENDGRID_API_KEY et FROM_EMAIL dans Vercel)
const sgMail = require('@sendgrid/mail');

if (process.env.SENDGRID_API_KEY) {
  sgMail.setApiKey(process.env.SENDGRID_API_KEY);
}

module.exports = async (req, res) => {
  if (req.method !== 'POST') {
    res.status(405).json({ error: 'Method not allowed' });
    return;
  }

  const { to, subject, text, replyTo } = req.body || {};

  if (!to || !subject || !text) {
    return res.status(400).json({ error: 'Missing required fields: to, subject, text' });
  }

  if (!process.env.FROM_EMAIL) {
    return res.status(500).json({ error: 'FROM_EMAIL not configured in environment' });
  }
  if (!process.env.SENDGRID_API_KEY) {
    return res.status(500).json({ error: 'SENDGRID_API_KEY not configured in environment' });
  }

  try {
    const msg = {
      to,
      from: process.env.FROM_EMAIL,
      subject,
      text,
    };
    if (replyTo) msg.replyTo = replyTo;

    await sgMail.send(msg);
    return res.status(200).json({ ok: true, message: 'Email envoyé' });
  } catch (err) {
    console.error('SendGrid error:', err);
    const message = err && err.message ? err.message : 'SendGrid error';
    return res.status(500).json({ error: message });
  }
};
