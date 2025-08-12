// openrouter.js
const axios = require('axios');

const OPENROUTER_API_KEY = process.env.OPENROUTER_API_KEY; // store securely in Azure

async function queryOpenRouter(prompt) {
  const response = await axios.post(
    'https://openrouter.ai/api/v1/chat/completions',
    {
      model: 'openrouter/claude-3-haiku', // or another model
      messages: [
        { role: 'system', content: "You are Alice, a cosmic, psychedelic oracle who gives playful, insightful answers." },
        { role: 'user', content: prompt }
      ]
    },
    {
      headers: {
        'Authorization': `Bearer ${OPENROUTER_API_KEY}`,
        'Content-Type': 'application/json'
      }
    }
  );

  return response.data.choices?.[0]?.message?.content || "Alice is speechless.";
}

module.exports = { queryOpenRouter };
