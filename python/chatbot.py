import uuid
from flask import Flask, session, jsonify, make_response, request, abort
from chatterbot import ChatBot

chatbot = ChatBot(
    'Rubber Debuggy',
    storage_adapter="chatterbot.storage.MongoDatabaseAdapter",
    database='chatterbot-database',
    database_uri='mongodb://127.0.0.1:27017/',
    output_adapter="chatterbot.output.OutputAdapter",
    trainer='chatterbot.trainers.ChatterBotCorpusTrainer'
)

# Train based on the english corpus
print 'Training...'
chatbot.train("chatterbot.corpus.english")

app = Flask(__name__)
app.secret_key = 'whats the good word'

@app.route('/api/chat/<string:message>', methods=['GET'])
def index(message):
  reply = get_chat_reply(message)

  response = {
    'reply': reply.text
  }

  return make_response(jsonify({'response': response}), 200)

@app.route('/api/chat/message', methods=['POST'])
def message():
  if not request.json or not 'message' in request.json:
    abort(400)

  message = request.json['message']  
  reply = get_chat_reply(message)

  response = {
    'reply': reply.text
  }

  return make_response(jsonify({'response': response}), 200)

@app.errorhandler(400)
def not_found(error):
  return make_response(jsonify({'error': 'Invalid parameters'}), 400)

@app.errorhandler(404)
def not_found(error):
  return make_response(jsonify({'error': 'Not found'}), 404)

def get_chat_reply(message):
  if not 'session_id' in session:
    session['session_id'] = str(uuid.uuid4())

  session_id = session['session_id']
  print 'Received message: ' + message + ' for session: ' + session_id

  reply = chatbot.get_response(message, session_id)
  print 'Reply: ' + str(reply.text)
  return reply

if __name__ == '__main__':
  app.run(debug=True, host='127.0.0.1', port=3001)