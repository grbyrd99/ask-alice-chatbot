
import { AzureFunction, Context, HttpRequest } from "@azure/functions";
import { loadMemory, appendToMemory } from "./utils/memoryService";
import { callOpenRouter } from "./utils/openRouter"; // You may need to create this
import { buildPrompt } from "./utils/promptBuilder"; // Optional helper

const httpTrigger: AzureFunction = async function (context: Context, req: HttpRequest): Promise<void> {
  const userInput = req.body?.message;
  if (!userInput) {
    context.res = { status: 400, body: "Missing message input." };
    return;
  }

  const memory = await loadMemory();
  const prompt = buildPrompt(memory, userInput); // Or just concatenate manually
  const response = await callOpenRouter(prompt);

  await appendToMemory({ role: "user", content: userInput });
  await appendToMemory({ role: "assistant", content: response });

  context.res = {
    status: 200,
    body: { response }
  };
};

export default httpTrigger;
