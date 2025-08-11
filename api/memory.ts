import { loadMemory, appendToMemory } from '../utils/memoryService';

export async function handler(context: any, req: any): Promise<void> {
  const userInput = req.body?.message;
  const memory = await loadMemory();

  const prompt = buildPrompt(memory, userInput); // Your prompt builder
  const response = await callOpenRouter(prompt); // Your OpenRouter call

  await appendToMemory({ role: 'user', content: userInput });
  await appendToMemory({ role: 'assistant', content: response });

  context.res = {
    status: 200,
    body: { response }
  };
}
