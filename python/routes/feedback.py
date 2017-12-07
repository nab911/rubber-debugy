from lib.helpers import set_session 
from flask import Flask, Blueprint, session, jsonify, make_response, request, abort
from lib.chat_engine import get_chatbot

feedback_route = Blueprint('feedback_route', __name__)
chatbot = get_chatbot()

@feedback_route.route('/api/feedback/<string:feedback>', methods=['POST'])
def feedback(feedback):
  data = request.get_json()
  
  if not data or not 'input' in data or not 'response' in data:
    abort(400)

  set_session()

  input = data['input']
  input_statement = chatbot.input.process_input_statement(input)
  response = data['response']

  #print 'Received feedback: ' + feedback + ' ' + input + ':' + response

  if feedback == "approve":
    chatbot.train([
        input,
        response,
    ])
  if feedback == "reject":
    input_statement.remove_response(response)

  return make_response(jsonify({'message': 'recieved'}), 200)