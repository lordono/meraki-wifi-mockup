import re
import time
import json
import pprint
import requests
from bs4 import BeautifulSoup


headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Max-Age': '3600',
    'User-Agent': 'Mozilla/5.0 (X11; Ubuntu; Linux x86_64; rv:52.0) Gecko/20100101 Firefox/52.0'
}

data = []
urltosearch = []

baseUrl = "https://latitude.to"
startUrl = "/articles-by-country/sg/singapore/page"

for i in range(5):
    url = "{}{}/{}".format(baseUrl, startUrl, i+1)
    req = requests.get(url, headers)
    soup = BeautifulSoup(req.content, 'html.parser')
    specUrls = soup.find_all('a', href = re.compile(r'\/articles-by-country\/sg\/singapore\/\d*\/.*'));
    for j in specUrls:
        name = j.getText();
        req = requests.get('{}{}'.format(baseUrl, j['href']), headers)
        soup = BeautifulSoup(req.content, 'html.parser')
        latItem = soup.find('meta', attrs={"itemprop": "latitude"})
        lat = latItem['content']
        lngItem = soup.find('meta', attrs={"itemprop": "longitude"})
        lng = lngItem['content']
        if name != "\ue55c Show coordinates":
            data.append({
                "name": name,
                "lat": lat,
                "lng": lng
            })
        time.sleep(0.25);
    time.sleep(0.5);

with open('getdata.json', 'w') as outfile:
    json.dump({ "data": data }, outfile)