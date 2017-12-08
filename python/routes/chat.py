from sys import argv
from lib.helpers import set_session 
from flask import Flask, Blueprint, session, jsonify, make_response, request, abort
from lib.chat_engine import get_chatbot

chat_route = Blueprint('chat_route', __name__)
chatbot = get_chatbot()

@chat_route.route('/api/chat/<string:message>', methods=['GET'])
def get_message(message):
  set_session()
  response = handle_input(message)

  return make_response(jsonify(response), 200)

@chat_route.route('/api/chat/message', methods=['POST'])
def post_message():
  data = request.get_json()
  if not data or not 'message' in data:
    abort(400)
  
  set_session()

  message = data['message']
  response = handle_input(message)

  return make_response(jsonify(response), 200)

def handle_input(message):
  if message in commands.keys():
    return commands[message]()

  return get_chat_reply(message)

def get_chat_reply(message):
  #print 'Received message: ' + message + ' for session: ' + session['session_id']

  if 'enable_learning' in argv:
    reply = chatbot.get_response(message)
  else:
    input = chatbot.input.process_input_statement(message)
    statement, reply = chatbot.generate_response(input, session['session_id'])

  #print 'Reply: ' + str(reply.text)
  return {
    'input': message,
    'reply': reply.text
  }

def restart():
  session.pop('session_id', None)
  
  return {
    'reply': "Ok, let's start over",
    'is_command': 1
  }

commands = {
  'restart': restart
}