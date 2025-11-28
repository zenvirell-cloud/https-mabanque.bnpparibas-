// Very simple webhook simulator for payments.
// In production, verify the signature (Stripe/PayPal) before trusting payloads.
const sgMail = require('@sendgrid/mail');
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

module.exports = async (req, res) => {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method Not Allowed' });

  try {
    const event = req.body;
    const type = event?.type || event?.event;

    if (type === 'payment.succeeded' || type === 'checkout.session.completed' || type === 'payment.completed') {
      const customerEmail = event.data?.object?.customer_email || event.data?.object?.receipt_email || event.data?.object?.customer?.email;
      if (customerEmail) {
        const msg = {
          to: customerEmail,
          from: process.env.FROM_EMAIL,
          subject: 'Confirmation de paiement (démo)',
          text: 'Merci — votre paiement a été reçu (démo).',
          html: '<p>Merci — votre paiement a été reçu (démo).</p>'
        };
        await sgMail.send(msg);
        console.log('Confirmation sent to', customerEmail);
      } else {
        console.log('Webhook reçu mais pas d\'email client trouvé', event);
      }
    } else {
      console.log('Événement webhook non géré:', type);
    }

    return res.status(200).json({ ok: true });
  } catch (err) {
    console.error('Webhook handling error:', err);
    return res.status(500).json({ ok: false, error: err.message || err });
  }
};
