import { promises as fs } from 'fs';
import path from 'path';

const MEMORY_PATH = path.resolve(__dirname, '../memory/memory.json');
const MAX_MEMORY_LENGTH = 20;

export async function loadMemory(): Promise<any[]> {
  try {
    const data = await fs.readFile(MEMORY_PATH, 'utf-8');
    return JSON.parse(data);
  } catch (err) {
    console.error('Failed to load memory:', err);
    return [];
  }
}

export async function saveMemory(messages: any[]): Promise<void> {
  try {
    const trimmed = messages.slice(-MAX_MEMORY_LENGTH);
    await fs.writeFile(MEMORY_PATH, JSON.stringify(trimmed, null, 2));
  } catch (err) {
    console.error('Failed to save memory:', err);
  }
}

export async function appendToMemory(newMessage: any): Promise<void> {
  const memory = await loadMemory();
  memory.push(newMessage);
  await saveMemory(memory);
}
