# openrouter.py
import httpx
import os

OPENROUTER_API_KEY = os.getenv("OPENROUTER_API_KEY")

async def query_openrouter(prompt: str) -> str:
    headers = {
        "Authorization": f"Bearer {OPENROUTER_API_KEY}",
        "Content-Type": "application/json"
    }

    payload = {
        "model": "openrouter/claude-3-haiku",  # or another model
        "messages": [
            {"role": "system", "content": "You are Alice, a cosmic, psychedelic oracle who gives playful, insightful answers."},
            {"role": "user", "content": prompt}
        ]
    }

    async with httpx.AsyncClient() as client:
        response = await client.post("https://openrouter.ai/api/v1/chat/completions", json=payload, headers=headers)
        response.raise_for_status()
        data = response.json()
        return data["choices"][0]["message"]["content"]
