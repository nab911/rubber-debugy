import csv
import os
from sys import argv

print "Converting " + argv[1] + " to " + argv[2]

conversations = []
with open(argv[1]) as inputFile:
    reader = csv.reader(inputFile, quoting=csv.QUOTE_NONE)
    for conversation in reader:  # each row is a list
        formatted_conversation = []
        for statement in conversation:
            formatted_conversation.append('"' + statement + '"')
        conversations.append('\t\t[' + ','.join(formatted_conversation) + ']')

with open(argv[2], "w") as outputFile:
    outputFile.write('{\n')
    outputFile.write('\t"categories": ["debugging"],\n')
    outputFile.write('\t"conversations": [\n')

    outputFile.write(',\n'.join(conversations))
    outputFile.write('\n')

    outputFile.write('\t]\n')
    outputFile.write('}\n')


def chomp(x):
    if x.endswith("\r\n"): return x[:-2]
    if x.endswith("\n"): return x[:-1]
    return x