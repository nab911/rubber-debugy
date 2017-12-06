import uuid
from flask import Flask, session, jsonify, make_response, request, abort
from chatterbot import ChatBot

chatbot = ChatBot(
    'Rubber Debuggy',
    storage_adapter="chatterbot.storage.MongoDatabaseAdapter",
    database='chatterbot-database',
    database_uri='mongodb://127.0.0.1:27017/',
    trainer='chatterbot.trainers.ChatterBotCorpusTrainer',
    input_adapter="chatterbot.input.VariableInputTypeAdapter"
)

# Flush the DB
#chatbot.storage.drop()

# Train based on the english corpus
#print 'Training...'
#chatbot.train("chatterbot.corpus.english.conversations")
#chatbot.train("./python/corpus/custom_corpus.yml")

# Export all trained data
#chatbot.trainer.export_for_training('./my_export.json')

input = chatbot.input.process_input_statement('Hello')
reply = chatbot.generate_response(input, chatbot.default_conversation_id)
print str(reply)