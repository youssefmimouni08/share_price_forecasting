from sentimentalAnalysis import classify_sentiment

def impactCalculator(json_obj):
    countries = []
  
    # Iterate over the keys in the JSON object
    for key in json_obj:
        # Check if the value of the key is a dictionary and if it has an "oil Production" key
        if isinstance(json_obj[key], dict) and "oil Production" in json_obj[key]:
            # If the conditions are met, add the dictionary to the countries array
            if json_obj[key] not in countries:
                countries.append(json_obj[key])
    total_oil_rate = 0
    for country in countries:
        oil_rate_main_country = float(country["oil Production"].strip('%'))/100
        impact_onborders=0
        sum_oil_rate_borders = 0
        
        for border in country['borders']:
            if (border['CountryID']['OilProduction'] != "null"):
                border_country_id = border['CountryID']
                border_relation_rate = float(border['impact'].strip('%'))/100
                border_country_oil_production = float(border_country_id['OilProduction'].strip('%'))/100        
                # add the border country's oil production to the total
                sum_oil_rate_borders += border_country_oil_production
                impact_onborders += border_country_oil_production * border_relation_rate
        impact = (impact_onborders + oil_rate_main_country) / (sum_oil_rate_borders+oil_rate_main_country)
        if len(country['borders'])==0:
            impact = oil_rate_main_country
        total_oil_rate+=impact
        
    
    objects = []
  
    # Iterate over the keys in the JSON object
    for key in json_obj:
        # Check if the value of the key is a dictionary and if it has a "weight" key
        if isinstance(json_obj[key], dict) and "weight" in json_obj[key]:
            # If the conditions are met, add the dictionary to the objects array
            if json_obj[key] not in objects:
                objects.append(json_obj[key])
    total_impact = total_oil_rate
    for obj in objects:
        if  obj['weight']=="null":
            total_impact = 'null'
            return total_impact 
        if obj['weight']>1:
            obj['weight'] = obj['weight']/100
        total_impact *= obj['weight']
    
    sentiment = classify_sentiment(json_obj['event'])
    if sentiment == "positive" :
        total_impact = abs(total_impact)*-1
    elif sentiment =="negative" :
        total_impact = abs(total_impact)*1
    elif sentiment == "neutral" :
        total_impact = "has no impact"

    
    return float("{:.4f}".format(total_impact)) if total_impact!= "null" else "null"

"""        total_impact = 0
        total_oil_rate_of_impacted_region = 0
        verb_rate=1
        object_rate=1
        if 'acteur' in res and 'oil Production' in res['acteur'] and res['acteur']["oil Production"]!='null':
            oil_rate_main_country = float(res['acteur']["oil Production"].replace("%",""))/100
            impact_onborders=0
            sum_oil_rate_borders = 0

            for voisin in res['acteur']["borders"]:  
                if (voisin['CountryID']['OilProduction'] != "null"):
                    sum_oil_rate_borders += float(voisin['CountryID']['OilProduction'].replace("%",""))/100
                    impact_onborders += (float(voisin['CountryID']['OilProduction'].replace("%",""))/100) * (float(voisin['impact'].replace("%",""))/100)
            
            impact = (impact_onborders + oil_rate_main_country) / (sum_oil_rate_borders+oil_rate_main_country)
            total_oil_rate_of_impacted_region = impact
        if 'trigger_verb' in res and res['trigger_verb']['weight'] !='null':
            verb_rate = float(res['trigger_verb']['weight'])/100
            
        if 'object' in res and 'weight' in res['object'] and res['object']['weight'] != 'null':
            object_rate = float(res['object']['weight'])/100
        elif 'object' in res and "oil Production" in res['object'] and res['object']['oil Production'] != 'null':
            another_actor_sum_oil_rate_borders = 0
            another_actor_impact_onborders = 0
            oil_rate_second_country = float(res['object']["oil Production"].replace("%",""))/100
            for voisin in res['object']["borders"]:  
                if (voisin['CountryID']['OilProduction'] != "null"):
                    another_actor_sum_oil_rate_borders += float(voisin['CountryID']['OilProduction'].replace("%",""))/100
                    another_actor_impact_onborders += (float(voisin['CountryID']['OilProduction'].replace("%",""))/100) * (float(voisin['impact'].replace("%",""))/100)
            another_actor_impact = (another_actor_impact_onborders + oil_rate_second_country) / (another_actor_sum_oil_rate_borders+oil_rate_second_country)
            total_impact = total_impact + another_actor_impact
        if total_oil_rate_of_impacted_region !=0 and verb_rate !=1 and object_rate !=1:
            total_impact = total_oil_rate_of_impacted_region * verb_rate * object_rate
        if total_impact == 0:
            res['event_impact']= 'null'
        else:
            res['event_impact'] = float("{:.4f}".format(total_impact))

        if 'acteur' in res and  "borders" in res['acteur']:
            del res['acteur']["borders"]
        
        if  'object' in res and "borders" in res['object']:
            del res['object']['borders']
        if 'place' in res and "borders" in res['place']:
            del res['place']['borders']"""