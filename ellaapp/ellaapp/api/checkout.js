const Stripe = require('stripe');

module.exports = async function handler(req, res) {
  // CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  if (req.method === 'OPTIONS') return res.status(200).end();

  try {
    const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

    const origin = req.headers.origin || req.headers.referer?.replace(/\/$/, '') || 'https://ellaapp.com.br';

    const session = await stripe.checkout.sessions.create({
      mode: 'subscription',
      line_items: [
        {
          price: process.env.STRIPE_PRICE_ID,
          quantity: 1,
        },
      ],
      subscription_data: {
        trial_period_days: 15,
      },
      payment_method_collection: 'if_required',
      locale: 'pt-BR',
      success_url: `${origin}/app?pro=1&session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${origin}/#planos`,
    });

    // Redirect directly to Stripe Checkout
    res.redirect(303, session.url);
  } catch (err) {
    console.error('Stripe checkout error:', err.message);
    res.status(500).json({ error: 'Erro ao criar sessão de pagamento. Tente novamente.' });
  }
};
