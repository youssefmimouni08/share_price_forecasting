from flask import Flask, jsonify, request
import requests
from trigger_identification import identify_triggers

from process_text import list_events
from impactCalculator import impactCalculator

import pandas as pd

import spacy

import mlconjug3
import json
from transformers import  pipeline


model_name = "deepset/roberta-base-squad2"
model = pipeline('question-answering', model=model_name, tokenizer=model_name)
nlp = spacy.load("en_core_web_sm")
default_conjugator = mlconjug3.Conjugator(language='en')
# Define the threshold for filtering answers
threshold = 0.000001

def remove_duplicate_names(obj):
  # Extract the names from the object
  names = [x['name'] for x in obj.values() if isinstance(x, dict)]

  # Create a set from the names list to remove duplicates
  unique_names = set(names)

  # Iterate over the object and remove any entries with a name
  # that appears more than once
  for key in obj.keys() :
    if isinstance(obj[key], dict) and obj[key]['name'] not in unique_names:
      obj.pop(key)

  return obj   
def fetch_country(cname):
    country =  requests.get('http://localhost:5000/api/Country/borders/'+cname).content.decode('utf-8')
    if country != 'null':
        return country
    else: 
        return 'null'
def fetch_object(oname):
    object =  requests.get('http://localhost:5000/api/Objects/'+oname.lower()).content.decode('utf-8')
    if object != 'null':
        return object
    else: 
        return 'null'
def fetch_ent(text):
    doc = nlp(text)
    list_ents=[]
    for ent in doc.ents:
        list_ents.append(ent.text)
    if(len(list_ents)>0):
        return True
    else:
        return False
def multiple_question_answering(paragraph):
    all_results = []
    events = []
    triggers  = identify_triggers(paragraph)
    print(triggers)
    if len(triggers)>1:
        print(len(triggers))
        events = list_events(paragraph)
    elif len(triggers)==1:
        events.append(paragraph)
    else:
        return "there are no events in this paragraph"
    for event in events:
        print(event)
        print(identify_triggers(event))
        main_trigger = (identify_triggers(event))[0]
        #contexts = paragraph.split(',')
    #for main_trigger in all_triggers:
        refine = True
        res = {}
        #text = "The stock market crashed yesterday"
        #main_trigger = (get_main_trigger(context)[0])
        print(main_trigger)
        trigger = main_trigger[1]
        #trigger_hypernym = main_trigger[2]
        print('trigger:  ',trigger)
        #print('trigger_hypernym: ',trigger_hypernym) 
        content = requests.get('http://localhost:5000/api/triggers/'+(str(trigger)).lower()).content.decode('utf-8')
        #check if verb exists 
        questions = []
        conjugated_verb_ing = default_conjugator.conjugate(str(trigger)).conjug_info['indicative']['indicative present continuous']['1p']
        conjugated_verb = default_conjugator.conjugate(str(trigger)).conjug_info['indicative']['indicative past tense']['1p']

        if (content != 'null' and 'event_type' in content):
            
            refine= False
            content = json.loads(content)
            print(content)
            #get questions

            for q in content['event_type']['questionTemplate']:
                if q["argumentRole"] == "Responsible":
                    q["question"] = "who started the "+conjugated_verb_ing+" ?"
                if q["argumentRole"] == "Victim":
                    q["question"] = "What got "+conjugated_verb+"  ?"
                if q["argumentRole"] == "Target":
                    q["question"] = "What got damaged by "+conjugated_verb_ing+"  ?"
                questions.append(q)
            
            
            res['trigger_verb'] = {"name" : str(trigger),"weight":content['weight'],'event_type':content['event_type']['event']}
    
        else : 
            res['trigger_verb'] = {"name" : str(trigger),"weight":'null','event_type':'null'}
            
            questions.append({"question":"who is responsible of the"+conjugated_verb_ing+"?","argumentRole":"acteur"})
            questions.append({"question" : "Who is the subject of the "+conjugated_verb_ing+"  ?","argumentRole" :"object"})
            #questions.append({"question" : "what got damaged?","argumentRole" :"victim"})
        
        
        for question in questions:
                
            QA_input = {
                'question': question["question"],
                'context': event
            }


            QA_output = model(QA_input)
            answer = QA_output['answer']
            print(question['question'],answer,QA_output )
            # Get the score of the answer
            score = QA_output['score']

            # Filter the answer based on the threshold
            if score > threshold and str(answer) != event:
            # The answer is valid, you can use it
                print(f'Question: {question}')
                print(f'Answer: {answer}')
                answer_doc = nlp(answer)
                    
                country =  fetch_country(answer)
                object =  fetch_object(answer) 
                #check if it country 
                if country != 'null':
                    content = json.loads(country)
                    res[question['argumentRole']] = {"name":answer,"oil Production":content['OilProduction'],'borders':content['VOISINS']}
            
                    
                #check if it a object
                elif object != 'null': 
                    content = json.loads(object)
                    res[question["argumentRole"]] = {"name":answer,"weight":content['weight']}  

                elif fetch_ent(answer) : 
                    print(fetch_ent(answer))   
                    print(answer)
                    doc = nlp(answer)
                    k=1
                    for ent in doc.ents:   
                        print(ent.text, ent.label_)                    
                        country =  fetch_country(ent.text)
                        object =  fetch_object(ent.text) 
                                            
                        #check if it country 
                        if country != 'null':
                            content = json.loads(country)
                            res[question['argumentRole']+str(k)] = {"name":ent.text,"oil Production":content['OilProduction'],'borders':content['VOISINS']}
                            k=k+1
                            
                        #check if it a object
                        elif object != 'null': 
                            content = json.loads(object)
                            res[question["argumentRole"]] = {"name":ent.text,"weight":content['weight']} 
                        elif str(ent) == str(answer):
                            res[question["argumentRole"]] = {"name":answer,"weight":'null'}
                
                else:  
                    res[question["argumentRole"]] = {"name":answer,"weight":'null'}
            else:
                # The answer is not valid, you can ignore it or get another answer
                print(f'Question: {question}')
                print('No valid answer found.')

    
        if refine:
            if 'acteur1' in res :
                res['acteur'] = res['acteur1']
                del res['acteur1']
            if 'acteur2' in res :
                res['object'] = res['acteur2']
                del res['acteur2']
            if 'object1' in res :
                res['object'] = res['object1']
                del res['object1']
            if 'object2' in res :
                res['object'] = res['object2']
                del res['object2']
        
            if not 'acteur' in res :
                res['acteur'] =  {
                "name": "Error",
                "weight": "null"
                }
            if not 'object' in res :
                res['object'] =  {
                "name": "Error",
                "weight": "null"
                }
            if not 'trigger_verb' in res :
                res['trigger_verb'] =  {
                "verb": "Error",
                "weight": "null"
                }

        

        res['event'] = event
        res['event_impact'] = impactCalculator(res)
        #unique_res = remove_duplicate_names(res)
        #sentence_impact = {context: res}
        
        all_results.append(res)
    return all_results
app = Flask(__name__)


@app.route('/', methods = ['POST','GET'])
def home():
    
    request_data = request.get_json()
    context = request_data['context']
    
    data = question_answering(context)
    
    return data
@app.route('/paragraph', methods = ['POST'])
def paragraph():
    
    request_data = request.get_json()
    paragraph = request_data['context']

    data = multiple_question_answering(paragraph)
    
    return data
@app.route('/flask', methods = ['GET','POST'])
def index():
    request_data = request.get_json()
    context = request_data['context']
    return context


if __name__ == '__main__':
  
    app.run(port=8000,debug = True)