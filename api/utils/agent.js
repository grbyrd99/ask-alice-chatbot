const { queryOpenRouter } = require('./openrouter');
const fs = require('fs');
const path = require('path');

const memoryPath = path.join(__dirname, '../memory/memory.json');

function loadMemory() {
  if (!fs.existsSync(memoryPath)) return [];
  return JSON.parse(fs.readFileSync(memoryPath, 'utf8'));
}

function saveMemory(messages) {
  fs.writeFileSync(memoryPath, JSON.stringify(messages.slice(-10), null, 2));
}

async function runAgent(userInput) {
  const systemPrompt = {
    role: "system",
    content: "You are Alice, a witty and insightful consulting assistant. You help users troubleshoot cloud deployments, architect scalable solutions, and explore AI integration. You speak with clarity, confidence, and a touch of humor. Always be helpful, but never boring."
  };

  const memory = loadMemory();
  const messages = [systemPrompt, ...memory, { role: "user", content: userInput }];

  const response = await queryOpenRouter(messages, 'mistral');
  const reply = response.choices?.[0]?.message;

  if (reply) {
    messages.push(reply);
    saveMemory(messages);
  }

  return reply;
}

module.exports = { runAgent };
