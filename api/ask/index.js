const { runAgent } = require('../utils/agent');

module.exports = async function (context, req) {
  const prompt = req.body?.prompt || "Hello!";
  try {
    const reply = await runAgent(prompt);
    context.res = {
      status: 200,
      body: reply
    };
  } catch (err) {
    context.res = {
      status: 500,
      body: { error: "Agent failed", details: err.message }
    };
  }
};
