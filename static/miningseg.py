import csv
import pandas as pd
import json
import operator

df= pd.read_csv('seguridad.csv',encoding ='latin1')
print(df)
df = df[pd.notnull(df['RELACIONADAS CON LAS PERSONAS'])]

df = df.as_matrix();

events = {}
for i in range(0, len(df)):
	a = df[i][0];
	if(a in events):
		events[a] = df[i][1];
	else:
		events[a] = df[i][1];

sorted_events = sorted(events.items(), key=operator.itemgetter(1), reverse=True)
print(sorted_events)


sorted_json = json.dumps(sorted_events, ensure_ascii=False)
fp = open('seguridad.json', 'w')
fp.write(sorted_json)