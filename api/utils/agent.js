// /api/agent/index.js

module.exports = async function (context, req) {
  const input = req.body || req.query;
  const persona = input.persona || "Alice";
  const message = input.input || "";

  // Simple persona logic (expandable later)
  const personas = {
    Alice: (msg) => `Alice says: ${msg}`,
    Bob: (msg) => `Bob replies: ${msg}`,
    Charlie: (msg) => `Charlie thinks: ${msg}`
  };

  const respond = personas[persona] || personas["Alice"];
  const reply = respond(message);

  context.res = {
    status: 200,
    body: {
      persona,
      input: message,
      response: reply
    }
  };
};
