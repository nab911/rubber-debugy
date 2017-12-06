import uuid
from flask import Flask, session, jsonify, make_response, request, abort
from chatterbot import ChatBot

chatbot = ChatBot(
    'Rubber Debuggy',
    storage_adapter="chatterbot.storage.MongoDatabaseAdapter",
    database='chatterbot-database',
    database_uri='mongodb://127.0.0.1:27017/',
    trainer="chatterbot.trainers.ListTrainer",
    input_adapter="chatterbot.input.VariableInputTypeAdapter"
)

app = Flask(__name__)
app.secret_key = 'whats the good word'


## Chat
@app.route('/api/chat/<string:message>', methods=['GET'])
def get_message(message):
  set_session()
  response = get_chat_reply(message)

  return make_response(jsonify({'response': response}), 200)

@app.route('/api/chat/message', methods=['POST'])
def post_message():
  data = request.get_json()
  if not data or not 'message' in data:
    abort(400)
  
  set_session()

  message = data['message']  
  response = get_chat_reply(message)

  return make_response(jsonify({'response': response}), 200)

def get_chat_reply(message):
  #print 'Received message: ' + message + ' for session: ' + session['session_id']

  input = chatbot.input.process_input_statement(message)
  statement, reply = chatbot.generate_response(input, session['session_id'])

  #print 'Reply: ' + str(reply.text)
  response = {
    'input': message,
    'reply': reply.text
  }
  return response


## Feedback
@app.route('/api/feedback/<string:feedback>', methods=['POST'])
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


## Error Handling
@app.errorhandler(400)
def not_found(error):
  return make_response(jsonify({'error': 'Invalid parameters'}), 400)

@app.errorhandler(404)
def not_found(error):
  return make_response(jsonify({'error': 'Not found'}), 404)


## Private functions
def set_session():
  if not 'session_id' in session:
    session['session_id'] = str(uuid.uuid4())

if __name__ == '__main__':
  app.run(debug=True, host='127.0.0.1', port=3001)