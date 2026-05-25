const https = require('https');

module.exports = async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  const apiKey = process.env.ANTHROPIC_API_KEY;
  if (!apiKey) return res.status(500).json({ error: 'Chave da API não configurada no servidor' });

  const { system, messages } = req.body || {};
  if (!messages) return res.status(400).json({ error: 'Parâmetros inválidos' });

  const body = JSON.stringify({
    model: 'claude-sonnet-4-20250514',
    max_tokens: 900,
    system,
    messages,
  });

  return new Promise((resolve) => {
    const options = {
      hostname: 'api.anthropic.com',
      path: '/v1/messages',
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': apiKey,
        'anthropic-version': '2023-06-01',
        'Content-Length': Buffer.byteLength(body),
      },
    };

    const apiReq = https.request(options, (apiRes) => {
      let data = '';
      apiRes.on('data', (chunk) => { data += chunk; });
      apiRes.on('end', () => {
        try {
          res.status(apiRes.statusCode).json(JSON.parse(data));
        } catch (e) {
          res.status(500).json({ error: 'Erro ao processar resposta da IA' });
        }
        resolve();
      });
    });

    apiReq.on('error', (e) => {
      res.status(500).json({ error: e.message });
      resolve();
    });

    apiReq.write(body);
    apiReq.end();
  });
};
