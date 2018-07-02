import csv
import pandas as pd
import json
import operator

df= pd.read_csv('ocio.csv',encoding ='latin1')
df = df[pd.notnull(df['DISTRITO'])]

df = df[['DISTRITO']]
df = df.as_matrix();

events = {}
for i in range(0, len(df)):
	a = df[i][0];
	if(a in events):
		events[a] += 1;
	else:
		events[a] = 1;

sorted_events = sorted(events.items(), key=operator.itemgetter(1), reverse=True)
print(sorted_events)


sorted_json = json.dumps(sorted_events, ensure_ascii=False)
fp = open('ocio.json', 'w')
fp.write(sorted_json)
'''

with open ('ocio.csv', encoding = 'latin1') as f:
    reader = csv.reader(f)
    for row in reader:
        print(row)
'''