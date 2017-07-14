import pandas as pd
import re
import json
import sys

data = r".\data\hurdat2_test.txt"
#data = r".\data\hurdat2-1851-2016-041117.txt"
output = r".\output\hurricanes"

hurricanes = {"data":[]}

for i in range(1851,2017):
    with open("%s_%s.json" % (output,i), "w") as _outfile:
        _outfile.write('')

with open("%s.json" % (output), "w") as _outfile:
        _outfile.write('')

start_year = None

with open(data,"r") as _file:
        for f in _file:
            data_list = [i.strip() for i in str(f).split(',')]
            data_list.pop()
            if re.search('^AL+\w*', data_list[0]) != None:
                hurricanes["data"].append({"id": data_list[0],
                                   "name": data_list[1],
                                   "locations": data_list[2],
                                   "location_data": []
                                   })
                hurr_len = len(hurricanes["data"])

            else:
                if start_year == None:
                    start_year = data_list[0][:4]
                    
                hurricanes["data"][(hurr_len - 1)*1]["location_data"].append({
                    "date": data_list[0],
                    "time": data_list[1],
                    "storm_type": data_list[3],
                    "lat": data_list[4][:-1],
                    "lon": data_list[5],
                    })

                if start_year != None and len(hurricanes["data"][(hurr_len - 1)*1]["location_data"]) == int(hurricanes["data"][(hurr_len - 1)*1]["locations"]):
                    start_year = None

with open("%s.json" % (output) ,"a") as _outfile:
    json.dump(hurricanes,_outfile)
    
                    




            
                    