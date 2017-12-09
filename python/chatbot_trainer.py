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

# Export all trained data
chatbot.trainer.export_for_training('./current_export.json')

# Flush the DB
chatbot.storage.drop()

# Train based on the english corpus
#print 'Training...'
#chatbot.train("chatterbot.corpus.english.conversations")
chatbot.train("./python/corpus/javascript_debugging.json")
#chatbot.train("./current_export.json")