import time
import json
import requests

token = "get_token_from_one_map"

with open('getdata.json') as json_file:
    data = json.load(json_file)

for device in data['data']:
    baseUrl = "https://developers.onemap.sg/privateapi/popapi/getPlanningarea"
    url = "{}?token={}&lat={}&lng={}".format(baseUrl, token, device['lat'], device['lng'])
    try:
        req = requests.get(url, timeout=5)
        r_json = req.json()
        if len(r_json) > 0:
            device['district'] = r_json[0]['pln_area_n']
        else:
            device['district'] = 'District None'
    except:
        print('error')
        device['district'] = 'District None'
    print(device['name'], device['district'])
    time.sleep(0.5)

with open('datawithdistricts.json', 'w') as outfile:
    json.dump({ "data": data }, outfile)