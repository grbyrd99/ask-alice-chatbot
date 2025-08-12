const { handleAgentRequest } = require('../agent'); // adjust if renamed

module.exports = async function (context, req) {
  try {
    const input = req.body || req.query;
    const result = await handleAgentRequest(input);
    context.res = {
      status: 200,
      body: result
    };
  } catch (err) {
    context.res = {
      status: 500,
      body: { error: err.message }
    };
  }
};
