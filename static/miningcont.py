import csv
import pandas as pd
import json
import operator

df= pd.read_csv('contam.csv',encoding ='latin1', sep=';')
df = df[pd.notnull(df['D01'])]

df = df.as_matrix();

events = {}
for i in range(0, len(df)):
	a = df[i][3];
	if(a == 42):
		if(df[i][2] in events): 
			continue;
		else:
			events[df[i][2]] = df[i][7];
	else:
		continue;

sorted_events = sorted(events.items(), key=operator.itemgetter(1), reverse=True)
print(sorted_events)


sorted_json = json.dumps(sorted_events, ensure_ascii=False)
fp = open('contam.json', 'w')
fp.write(sorted_json)