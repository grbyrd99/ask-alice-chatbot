import json
import logging
import azure.functions as func

def main(req: func.HttpRequest) -> func.HttpResponse:
    try:
        
        question = req.params.get("question")
        persona = req.params.get("persona", "alice")
        if not question:
            return func.HttpResponse("Missing 'question' parameter", status_code=400)

        answer = await query_claude(question, persona)
        return func.HttpResponse(answer, status_code=200)

    except Exception as e:
        logging.error(f"Error querying Alice: {str(e)}")
        return func.HttpResponse(
            json.dumps({"error": f"Backend call failure: {str(e)}"}),
            status_code=500,
            mimetype="application/json"
        )
