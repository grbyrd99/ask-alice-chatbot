const { handleAgentRequest } = require('../agent'); // adjust if renamed

module.exports = async function (context, req) {
  try {
    const input = req.body || req.query;
    function handleAgentRequest(input) {
  const question = input?.input || ''; // match frontend payload

  let answer;
  if (!question || typeof question !== 'string') {
    answer = "Alice says: “Try asking something groovy!”";
  } else if (question.toLowerCase().includes('time')) {
    const now = new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });
    answer = `Alice says: “Time is a construct... but it's currently ${now} in your dimension.”`;
  } else {
    answer = `Alice says: “The cosmic answer to '${question}' is... 42.”`;
  }

  return { answer }; // frontend expects this shape
}

module.exports = { handleAgentRequest };


