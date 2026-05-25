const https = require('https');
const querystring = require('querystring');

module.exports = async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
  if (req.method === 'OPTIONS') return res.status(200).end();

  const origin = (req.headers.referer || 'https://ellaapp.com.br').replace(/\/$/, '').split('/').slice(0, 3).join('/');

  const body = querystring.stringify({
    mode: 'subscription',
    'line_items[0][price]': process.env.STRIPE_PRICE_ID,
    'line_items[0][quantity]': '1',
    'subscription_data[trial_period_days]': '15',
    payment_method_collection: 'if_required',
    locale: 'pt-BR',
    success_url: origin + '/app?pro=1',
    cancel_url: origin + '/#planos',
  });

  const options = {
    hostname: 'api.stripe.com',
    path: '/v1/checkout/sessions',
    method: 'POST',
    headers: {
      'Authorization': 'Bearer ' + process.env.STRIPE_SECRET_KEY,
      'Content-Type': 'application/x-www-form-urlencoded',
      'Content-Length': Buffer.byteLength(body),
    },
  };

  const session = await new Promise((resolve, reject) => {
    const req2 = https.request(options, (r) => {
      let data = '';
      r.on('data', chunk => data += chunk);
      r.on('end', () => {
        try { resolve(JSON.parse(data)); }
        catch (e) { reject(e); }
      });
    });
    req2.on('error', reject);
    req2.write(body);
    req2.end();
  });

  if (session.error) {
    console.error('Stripe error:', session.error.message);
    return res.status(500).send('Erro ao criar sessão. Tente novamente.');
  }

  res.redirect(303, session.url);
};
