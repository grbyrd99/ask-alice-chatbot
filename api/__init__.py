import logging
import json
import azure.functions as func
import openai  # or your preferred LLM client

# Optional: Load your OpenAI key from environment variables
import os
openrouter.api_key = os.getenv("OPENROUTER_API_KEY")

def main(req: func.HttpRequest) -> func.HttpResponse:
    logging.info("Alice received a query.")

    try:
        # Parse incoming JSON
        req_body = req.get_json()
        question = req_body.get("question")

        if not question:
            raise ValueError("Missing 'question' in request body.")

        # Call your LLM or backend logic
        response = openai.ChatCompletion.create(
            model="gpt-3.5-turbo",  # or your preferred model
            messages=[{"role": "user", "content": question}]
        )

        answer = response.choices[0].message.content.strip()

        # Return a valid JSON response
        return func.HttpResponse(
            json.dumps({ "answer": answer }),
            mimetype="application/json",
            status_code=200
        )

    except Exception as e:
        logging.error(f"Error querying Alice: {str(e)}")
        return func.HttpResponse(
            json.dumps({ "error": str(e) }),
            mimetype="application/json",
            status_code=500
        )
