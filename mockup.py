import json
import random

with open('datawithdistricts.json') as json_file:
    data = json.load(json_file)


def createUptime(period, district):
    # chronic
    if district == "MUSEUM" or district == "ROCHOR":
        return '{0:.1f}'.format(random.uniform(60,84))
    # temp issues
    elif district == "BUKIT TIMAH" or district == "BUKIT MERAH":
        if period == "month":
            return '{0:.1f}'.format(random.uniform(85,94))
    # month-long issue but fixed yesterday
    elif district == "NEWTON" or district == 'TANGLIN' or district == "JURONG EAST":
        if period == "month" or period == "week":
            return '{0:.1f}'.format(random.uniform(85,94))
    # month-long issue but fixed a week
    elif district == "PIONEER" or district == 'QUEENSTOWN' or district == "TOA PAYOH":
        if period == "month":
            return '{0:.1f}'.format(random.uniform(60,84))
    return '{0:.1f}'.format(random.uniform(95,100))

def createLatency(period, district):
    # chronic
    if district == "MUSEUM" or district == "ROCHOR":
        return '{0:.0f}'.format(random.uniform(200,400))
    # temp issues
    elif district == "BUKIT TIMAH" or district == "BUKIT MERAH":
        if period == "month":
            return '{0:.0f}'.format(random.uniform(80,150))
    # month-long issue but fixed yesterday
    elif district == "NEWTON" or district == 'TANGLIN' or district == "JURONG EAST":
        if period == "month" or period == "week":
            return '{0:.0f}'.format(random.uniform(80,150))
    # month-long issue but fixed a week
    elif district == "PIONEER" or district == 'QUEENSTOWN' or district == "TOA PAYOH":
        if period == "month":
            return '{0:.0f}'.format(random.uniform(200,400))
    return '{0:.0f}'.format(random.uniform(10,50))

def createUtilization(period, district):
    # mid utilization
    if district == "DOWNTOWN CORE":
        return '{0:.0f}'.format(random.uniform(20,40))
    # high utilization in week 
    elif district == "MUSEUM" or district == "OUTRAM":
        if period == "week":
            return '{0:.0f}'.format(random.uniform(60,100))
    return '{0:.0f}'.format(random.uniform(5,20))

def createSuccess(period, district):
    multiply = 1
    if period == "week":
        multiply *= 7
    elif period == "month":
        multiply *= 30
    # mid utilization
    if district == "DOWNTOWN CORE":
        return '{0:.0f}'.format(random.uniform(500,800) * multiply)
    # high utilization in week 
    elif district == "MUSEUM" or district == "OUTRAM":
        if period == "week":
            return '{0:.0f}'.format(random.uniform(1000,2000) * multiply)
    return '{0:.0f}'.format(random.uniform(200,400) * multiply)

def createIssue(period, district):
    multiply = 1
    if period == "week":
        multiply *= 7
    elif period == "month":
        multiply *= 30
    # mid utilization
    if district == "DOWNTOWN CORE":
        return '{0:.0f}'.format(random.uniform(3,6) * multiply)
    # high utilization in week 
    elif district == "MUSEUM" or district == "OUTRAM":
        if period == "week":
            return '{0:.0f}'.format(random.uniform(10, 15) * multiply)
    return '{0:.0f}'.format(random.uniform(0,2) * multiply)

periodOptions = ['week', 'month', 'day']

for device in data['data']:
    for periodOpt in periodOptions:
        device[periodOpt] = {
            "uptime": createUptime(periodOpt, device['district']),
            "latency": createLatency(periodOpt, device['district']),
            "utilization": createUtilization(periodOpt, device['district']),
            "success": createSuccess(periodOpt, device['district']),
            "association": createIssue(periodOpt, device['district']),
            "authentication": createIssue(periodOpt, device['district']),
            "dhcp": createIssue(periodOpt, device['district']),
            "dns": createIssue(periodOpt, device['district']),
        } 


with open('datawithmockdata.json', 'w') as outfile:
    json.dump(data, outfile)