# __init__.py
import azure.functions as func
import json
from .openrouter import query_openrouter

async def main(req: func.HttpRequest) -> func.HttpResponse:
    try:
        req_body = req.get_json()
        user_input = req_body.get("input", "").strip()

        if not user_input:
            return func.HttpResponse(json.dumps({"response": "Try asking something groovy!"}), mimetype="application/json")

        response = await query_openrouter(user_input)
        return func.HttpResponse(json.dumps({"response": response}), mimetype="application/json")

    except Exception as e:
        return func.HttpResponse(json.dumps({"response": "Hmm, something went wrong with the cosmic connection."}), mimetype="application/json")
