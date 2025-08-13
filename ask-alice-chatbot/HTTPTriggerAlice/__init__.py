import logging
import azure.functions as func
from .query_claude import query_claude

async def main(req: func.HttpRequest) -> func.HttpResponse:
    try:
        question = req.params.get("question")
        persona = req.params.get("persona", "alice")
        if not question:
            return func.HttpResponse("Missing 'question' parameter", status_code=400)

        answer = await query_claude(question, persona)
        return func.HttpResponse(answer, status_code=200)

    except Exception as e:
        logging.error(f"Error querying Claude: {e}")
        return func.HttpResponse("Internal server error", status_code=500)
