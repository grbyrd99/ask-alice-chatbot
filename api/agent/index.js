const { queryOpenRouter } = require('./openrouter');

async function handleAgentRequest(input) {
  const question = input?.input || '';

  if (!question) {
    return { answer: "Alice says: “Try asking something groovy!”" };
  }

  const response = await queryOpenRouter(question);
  return { answer: `Alice says: “${response}”` };
}

module.exports = { handleAgentRequest };
