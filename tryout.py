import time
import json
import requests

token = "get_token_from_one_map"

with open('datawithdistricts.json') as json_file:
    data = json.load(json_file)


newData = []
for device in data['data']:
    if device['district'] != 'District None':
        newData.append(device)

with open('datawithdistricts1.json', 'w') as outfile:
    json.dump({"data": newData}, outfile)