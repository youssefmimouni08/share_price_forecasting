import nltk
from nltk.corpus import wordnet
from nltk.tag import pos_tag
import spacy
from nltk.parse import DependencyGraph
from selenium.webdriver.chrome.service import Service
from webdriver_manager.chrome import ChromeDriverManager
from selenium.webdriver.chrome.options import Options

from selenium import webdriver
from bs4  import BeautifulSoup
from transformers import  pipeline
from process_text import process_text
import requests
import json


model_name = "deepset/roberta-base-squad2"
model = pipeline('question-answering', model=model_name, tokenizer=model_name)

options = Options()
options.add_argument("--headless")
options.add_argument("--disable-extensions")
options.add_argument("--disable-gpu")

def verbix(verb):
    driver = webdriver.Chrome(service=Service(ChromeDriverManager().install()),options=options)
    driver.get("https://www.verbix.com/find-verb/"+str(verb))
    
    content = driver.page_source
    soup = BeautifulSoup(content, 'html.parser')
    div_found_verbs = soup.find(class_="column is-full")
    list_of_verbs = list(div_found_verbs.children)[5].find_all('li')
    for data in list_of_verbs:
        if (data.text.find('English: An inflected form')!=-1):
            arr = data.text.split(" ")
            res = str(arr[-1]).replace('"',"")                
            
            return res
    driver.quit()
    return str(verb)



def classify_trigger(trigger):
  # Get the wordnet synset for the trigger word
   
    if  wordnet.synset(trigger+'.'+wordnet.VERB+'.01' ):
        synset = wordnet.synset(trigger+'.'+wordnet.VERB+'.01' )
       
    else:
        return trigger
  # Get the hypernym (more general term) for the synset
    if len(synset.hypernyms()) > 0:
        hypernym = synset.hypernyms()[0]    
    else:
        return trigger
    # Get the lemma (base form of the word) for the hypernym
    if len(hypernym.lemmas()) > 0:
        event_type = hypernym.lemmas()[0].name().split('.')[0]    
        return event_type
    else:
        return hypernym



def is_verb(word):
    # Use the nltk part-of-speech tagger to tag the word
    pos_tags = nltk.pos_tag([word])
    
    # Check whether the word is a verb
    return pos_tags[0][1].startswith('V')



def identify_triggers(sentence):

    tokens = nltk.word_tokenize(sentence)

# Use pos_tag to tag the tokens with their part-of-speech
    pos_tags = nltk.pos_tag(tokens)
    # Send a request to the Stanford CoreNLP server
    r = requests.post('http://localhost:9000/',
                      params={'annotators': 'parse', 'outputFormat': 'json'},
                      data=sentence)
    
    # Parse the response as a JSON object
    response = json.loads(r.text)
    
    # Extract the main triggers from the dependency parse
    triggers = []
    for word in response['sentences'][0]['basicDependencies']:
        if word['dep'] == 'ROOT' :
            if is_verb(word['dependentGloss']):  
                triggers.append((word['dependentGloss'],verbix(word['dependentGloss'])))
    for word, pos in pos_tags:
        if pos == "VBD" and (word, verbix(str(word))) not in triggers:
            triggers.append((word, verbix(str(word))))
    print("Event triggers found: ",triggers)
    return triggers

# Test the function
sentence = "As part of the 11-billion-dollar sale of USA Interactive's film and television operations to the French company and its parent company in December 2001, USA Interactive received 2.5 billion dollars in preferred shares in Vivendi Universal Entertainment"
#print(get_main_trigger(sentence))  # Output: ['sat']

text = "Russian Federation attacked Fresh Attacks On Ukraine's Energy Infrastructure"
#print(get_main_trigger(text))  # Output: ['sat']


    #triggers = [(token, classify_trigger(verbix(token))) for token, pos in pos_tags if pos == 'VBD']
    #for token, pos in pos_tags :
