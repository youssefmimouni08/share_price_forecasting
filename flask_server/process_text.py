import requests
import conllu
import openai
import json
import re
# Open the JSON file
with open('../config/default.json', 'r') as file:
  # Parse the JSON data
  data = json.load(file)

# Access the value you want
value = data['openai_key']
print(value)
# Set the OpenAI API key
openai.api_key = value



def list_events(sentence):
    # Use the OpenAI API to classify the sentiment of the sentence
    response = openai.Completion.create(
        model="text-davinci-002",
        prompt=f"List the events that occur in the following text in list format 1/ 2/ and make sure the verbs are in past tense and don't use pronouns : {sentence}  ",
        max_tokens=1024
    )
    # Extract the classification from the response
    classification = response["choices"][0]["text"].strip()
    array = classification.split("\n")
    events=[]
    for s in array:
        events.append(re.sub(r"^\d+\.\s", "", s))
    return events


"""def process_text(sentence):
    params = {
        "properties": "parse.model=englishPCFG",
        "outputFormat": "conllu"
    }

    # Send the request to the server
    response = requests.post("http://localhost:9000/", sentence, params=params)
    
    # Print the dependency graph
    print('response:  ',response.text)
    # Parse the CoNLL-U file
    parsed_sentence = conllu.parse(response.text)
    print(parsed_sentence)
    # Get the dependency tree for the sentence
    dependency_tree = parsed_sentence[0]
    print('dependency_tree: ',dependency_tree)
    return dependency_tree"""
def process_text( text):
    # Set the URL of the Stanford CoreNLP server
    server_url = "http://localhost:9000"
    # Set the properties for the server
    properties = {
        "annotators": "tokenize,pos,depparse",
        "outputFormat": "conllu"
    }
    # Send the request to the server
    response = requests.post(server_url, data=text, params=properties)

    # Check the status code of the response to make sure the request was successful
    if response.status_code == 200:
        # Get the output from the server
        output = response.text

        collnn_lines = []
        # Iterate through the lines of the output
        for line in output.split("\n"):
            # Skip empty lines
            if not line:
                continue

            # Split the line on the tab character
            fields = line.split("\t")

            # If the line is a dependency, add the token, part-of-speech tag, head word, and dependency type to the list
            if len(fields) == 10:
                row = f'{fields[1]}\t{ fields[4]}\t{fields[6]}\t{fields[7]}'
                collnn_lines.append(row)
        collnn_tags = '\n'.join(collnn_lines)
  
        
        return collnn_tags
    else:
        print("An error occurred:", response.status_code)