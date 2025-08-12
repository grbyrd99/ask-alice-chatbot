module.exports = async function (context, req) {
  const question = req.body?.input || ''; // matches frontend payload

  context.log('Received question:', question);

  let response;
  if (!question) {
    response = "Try asking something groovy!";
  } else {
    // Replace with actual logic or AI call
    response = `The cosmic answer to "${question}" is... 42.`;
  }

  context.res = {
    headers: { 'Content-Type': 'application/json' },
    body: { response }
  };
};
