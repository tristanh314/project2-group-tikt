#!/usr/bin/env python
# coding: utf-8

# Import dependencies
from flask_pymongo import PyMongo
from flask import Flask
import pandas as pd
import json
import pymongo
import os
from simpson_dashboard.main import mongo

# Function to import the script data.
def import_content():
    lines = mongo.db.simpson_script
    file_res = os.path.join("clean_and_load", "data", "simpson_script_clean.csv")

    data = pd.read_csv(file_res)
    data_json = json.loads(data.to_json(orient='records'))
    lines.drop()
    lines.insert_many(data_json)
    return None

# Import the script data.
import_content()

# Function to import the episode data
def import_episodes():
    episodes = mongo.db.simpson_episodes
    file_res = os.path.join("clean_and_load", "data", "simpsons_episodes.csv")

    data = pd.read_csv(file_res)
    data_json = json.loads(data.to_json(orient='records'))
    episodes.drop()
    episodes.insert_many(data_json)
    return None

# Import the episode data.
import_episodes()

# Function to import location data.
def import_location():
    locations = mongo.db.simpson_location
    file_res = os.path.join("clean_and_load", "data", "simpsons_locations.csv")

    data = pd.read_csv(file_res)
    data_json = json.loads(data.to_json(orient='records'))
    locations.drop()
    locations.insert_many(data_json)
    return None

# Import the location data.
import_location()

# Function to import the character data.
def import_character():
    characters = mongo.db.simpson_character
    file_res = os.path.join("clean_and_load", "data", "simpsons_characters.csv")

    data = pd.read_csv(file_res)
    data_json = json.loads(data.to_json(orient='records'))
    characters.drop()
    characters.insert_many(data_json)
    return None
    
# Import the character data.
import_character()