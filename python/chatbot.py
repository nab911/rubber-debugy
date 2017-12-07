from routes.chat import chat_route
from routes.feedback import feedback_route
from flask import Flask

# App Setup
app = Flask(__name__)
app.secret_key = 'whats the good word'


# Route Registration
app.register_blueprint(chat_route)
app.register_blueprint(feedback_route)


## Error Handling
@app.errorhandler(400)
def not_found(error):
  return make_response(jsonify({'error': 'Invalid parameters'}), 400)

@app.errorhandler(404)
def not_found(error):
  return make_response(jsonify({'error': 'Not found'}), 404)

if __name__ == '__main__':
  app.run(debug=True, host='127.0.0.1', port=3001)