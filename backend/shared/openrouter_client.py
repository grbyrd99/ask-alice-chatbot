import requests
import os

def generate_response(message: str, model: str = "openrouter/llama2-13b-chat") -> str:
    api_key = os.getenv("OPENROUTER_API_KEY")
    if not api_key:
        return "Missing OpenRouter API key."

    headers = {
        "Authorization": f"Bearer {api_key}",
        "Content-Type": "application/json"
    }

    payload = {
        "model": model,
        "messages": [
            {"role": "system", "content": "You are Alice, a helpful and witty AI assistant."},
            {"role": "user", "content": message}
        ]
    }

    try:
        response = requests.post("https://openrouter.ai/api/v1/chat/completions", json=payload, headers=headers)
        response.raise_for_status()
        reply = response.json()["choices"][0]["message"]["content"]
        return reply
    except Exception as e:
        return f"Error generating response: {str(e)}"
