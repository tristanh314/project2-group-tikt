#!/usr/bin/env python
# coding: utf-8

# Import dependencies
import pandas as pd
import json
import pymongo
import os
import sys
import dns
from decouple import config

# Set connection uri
# URI = config('SIMPSONS_URI') or "mongodb://localhost:27017/simpson_data"
print(URI)
# Initialize a client.
client = pymongo.MongoClient(URI)

# Get the database
db = client.simpson_data
    
# Import the script data.
lines = db["simpson_script"]
file_res = os.path.join("clean_and_load", "data", "simpson_script_clean.csv")

data = pd.read_csv(file_res)
data_json = json.loads(data.to_json(orient='records'))
lines.drop()
lines.insert_many(data_json)

# Import the episode data.
episodes = db["simpson_episodes"]
file_res = os.path.join("clean_and_load", "data", "simpsons_episodes.csv")
data = pd.read_csv(file_res)
data_json = json.loads(data.to_json(orient='records'))
episodes.drop()
episodes.insert_many(data_json)

# Import location data.
locations = db["simpson_location"]
file_res = os.path.join("clean_and_load", "data", "simpsons_locations.csv")
data = pd.read_csv(file_res)
data_json = json.loads(data.to_json(orient='records'))
locations.drop()
locations.insert_many(data_json)
    
# Import the character data.
characters = db["simpson_character"]
file_res = os.path.join("clean_and_load", "data", "simpsons_characters.csv")
data = pd.read_csv(file_res)
data_json = json.loads(data.to_json(orient='records'))
characters.drop()
characters.insert_many(data_json)

# Close the connection
client.close()