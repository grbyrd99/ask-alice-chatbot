module.exports = async function (context, req) {
  const question = req.body?.question || '';
  context.res = {
    headers: { 'Content-Type': 'application/json' },
    body: {
      answer: `Alice says: "${question}" sounds intriguing.`
    }
  };
};