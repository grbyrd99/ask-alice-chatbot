import logging
import azure.functions as func
from shared.openrouter_client import generate_response

def main(req: func.HttpRequest) -> func.HttpResponse:
    logging.info("aliceResponder triggered")
    try:
        user_input = req.get_json().get("message", "")
        reply = generate_response(user_input)
        return func.HttpResponse(reply, status_code=200)
    except Exception as e:
        logging.error(f"Error: {e}")
        return func.HttpResponse("Internal server error", status_code=500)
