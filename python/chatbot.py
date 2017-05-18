from flask import Flask, jsonify, make_response, request, abort
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

@app.route('/<string:name>', methods=['GET'])
def index(name):
  return 'Hello ' + name

@app.route('/api/chat/message', methods=['POST'])
def message():
  if not request.json or not 'message' in request.json:
    abort(400)

  message = request.json['message']
  print 'Received message: ' + message

  reply = chatbot.get_response(message)
  print 'Reply: ' + str(reply.text)

  response = {
    'reply': reply.text
  }

  return jsonify({'response': response}), 201


@app.errorhandler(400)
def not_found(error):
  return make_response(jsonify({'error': 'Invalid parameters'}), 400)

@app.errorhandler(404)
def not_found(error):
  return make_response(jsonify({'error': 'Not found'}), 404)

if __name__ == '__main__':
  app.run(debug=True, host='127.0.0.1', port=3001)