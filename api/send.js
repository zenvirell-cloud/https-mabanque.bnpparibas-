// Vercel Serverless function: POST /api/send
const sgMail = require('@sendgrid/mail');
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

module.exports = async (req, res) => {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method Not Allowed' });

  const { to, subject, text, html, replyTo } = req.body || {};
  const FROM_EMAIL = process.env.FROM_EMAIL;

  if (!FROM_EMAIL) return res.status(500).json({ error: 'FROM_EMAIL not configured' });
  if (!to || !subject) return res.status(400).json({ error: 'to and subject are required' });

  const msg = {
    to,
    from: FROM_EMAIL,
    subject,
    text: text || '',
    html: html || `<p>${text || ''}</p>`,
    ...(replyTo ? { replyTo } : {})
  };

  try {
    await sgMail.send(msg);
    return res.status(200).json({ ok: true });
  } catch (err) {
    console.error('SendGrid error:', err.response ? err.response.body : err);
    return res.status(500).json({ ok: false, error: err.message || 'send error' });
  }
};
