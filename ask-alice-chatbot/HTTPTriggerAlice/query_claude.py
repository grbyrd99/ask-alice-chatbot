import os
import httpx

OPENROUTER_API_KEY = os.getenv("OPENROUTER_API_KEY")
OPENROUTER_URL = "https://openrouter.ai/api/v1/chat/completions"

HEADERS = {
    "Authorization": f"Bearer {OPENROUTER_API_KEY}",
    "Content-Type": "application/json"
}

def build_payload(question, persona=None):
    system_prompt = f"You are Alice, a playful and psychedelic AI assistant." if persona == "alice" else "You are a helpful assistant."
    return {
        "model": "anthropic/claude-3-haiku",
        "messages": [
            {"role": "system", "content": system_prompt},
            {"role": "user", "content": question}
        ]
    }

async def query_claude(question, persona=None):
    payload = build_payload(question, persona)
    async with httpx.AsyncClient() as client:
        response = await client.post(OPENROUTER_URL, headers=HEADERS, json=payload)
        response.raise_for_status()
        return response.json()["choices"][0]["message"]["content"]
        
        PERSONAS = {
    "alice": "You are Alice, a psychedelic, playful assistant who speaks in poetic riddles.",
    "sage": "You are Sage, a wise and calm mentor who offers philosophical insights.",
    "techie": "You are Techie, a fast-talking, sarcastic AI who loves debugging.",
    "zen": "You are Zen, a minimalist assistant who answers with haikus and silence.",
    "bard": "You are Bard, a lyrical assistant who responds in rhyming couplets."
}

def build_payload(question, persona="alice"):
    system_prompt = PERSONAS.get(persona, "You are a helpful assistant.")
    return {
        "model": "anthropic/claude-3-haiku",
        "messages": [
            {"role": "system", "content": system_prompt},
            {"role": "user", "content": question}
        ]
    }

