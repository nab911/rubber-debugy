from chatterbot import ChatBot

chatbot = ChatBot(
    'Rubber Debuggy',
    storage_adapter="chatterbot.storage.MongoDatabaseAdapter",
    database='chatterbot-database',
    database_uri='mongodb://127.0.0.1:27017/',
    trainer="chatterbot.trainers.ListTrainer",
    input_adapter="chatterbot.input.VariableInputTypeAdapter"
)

def get_chatbot():
    return chatbot