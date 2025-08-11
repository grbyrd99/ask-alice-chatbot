const { queryOpenRouter } = require('../utils/openrouter');

module.exports = async function (context, req) {
  const userPrompt = req.body?.prompt || "Hello!";
  const messages = [{ role: "user", content: userPrompt }];

  try {
    const result = await queryOpenRouter(messages);
    context.res = {
      status: 200,
      body: result
    };
  } catch (err) {
    context.res = {
      status: 500,
      body: { error: "Failed to query OpenRouter", details: err.message }
    };
  }
};
