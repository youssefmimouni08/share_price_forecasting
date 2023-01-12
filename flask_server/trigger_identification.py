import nltk
from nltk.corpus import wordnet

from nltk.stem import WordNetLemmatizer
from selenium.webdriver.chrome.service import Service
from webdriver_manager.chrome import ChromeDriverManager
from selenium.webdriver.chrome.options import Options

from selenium import webdriver
from bs4  import BeautifulSoup
from transformers import  pipeline
import requests
import json


model_name = "deepset/roberta-base-squad2"
model = pipeline('question-answering', model=model_name, tokenizer=model_name)

options = Options()
options.add_argument("--headless")
options.add_argument("--disable-extensions")
options.add_argument("--disable-gpu")


def find_verb(verb):
    lemmatizer = WordNetLemmatizer()
    base_form = lemmatizer.lemmatize(verb, pos='v')
    return str(base_form)


def verbix(verb):
    driver = webdriver.Chrome(service=Service(ChromeDriverManager().install()),options=options)
    driver.get("http://www.verbix.com/find-verb/"+str(verb))
    
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



"""def classify_trigger(trigger):
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
        return hypernym"""



def is_verb(word):
    # Use the nltk part-of-speech tagger to tag the word
    pos_tags = nltk.pos_tag([word])
    
    # Check whether the word is a verb
    return pos_tags[0][1].startswith('V')



def identify_triggers(sentence):
    tokens = nltk.word_tokenize(sentence)
    pos_tags = nltk.pos_tag(tokens)
    findverb=""
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
                triggers.append((word['dependentGloss'],find_verb(word['dependentGloss'])))
    for word, pos in pos_tags:
        findverb = find_verb(str(word))
        if pos == "VBD" and (word, findverb) not in triggers:
            if find_verb not in ['do','have']:
                triggers.append((word, findverb))
    return triggers


def number_triggers(sentence):

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
                triggers.append((word['dependentGloss']))
    for word, pos in pos_tags:
        if pos == "VBD" and (word) not in triggers:
            if find_verb(str(word)) not in ['do','have']:
                triggers.append((word))
    print("Event triggers found: ",triggers)
    return triggers



