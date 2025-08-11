const axios = require('axios');

const OPENROUTER_API_URL = 'https://openrouter.ai/api/v1/chat/completions';
const OPENROUTER_API_KEY = process.env.OPENROUTER_API_KEY;

async function queryOpenRouter(messages, model = 'mistral') {
  const headers = {
    'Authorization': `Bearer ${OPENROUTER_API_KEY}`,
    'Content-Type': 'application/json'
  };

  const body = {
    model: `openrouter/${model}`,
    messages
  };

  const response = await axios.post(OPENROUTER_API_URL, body, { headers });
  return response.data;
}

module.exports = { queryOpenRouter };
