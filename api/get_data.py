# Import dependencies.
import requests
import json
import os

# Set the base URL for the locally hosted api.
base_url = "http://127.0.0.1:5000/"

# Fetch the character data and store as a JSON.
character_data = requests.get(f"{base_url}/simpson_character").json()
# Define the file path to store the data.
character_path = os.path.join("..", "static", "data", "simpson_character.json")
# Write the json to a file.
with open(character_path, "w") as outfile:
    json.dump(character_data, outfile)

# Fetch the episode data and store as a JSON.
episode_data = requests.get(f"{base_url}/simpson_episodes").json()
# Define the file path to store the data.
episode_path = os.path.join("..", "static", "data", "simpson_episodes.json")
# Write the json to a file.
with open(episode_path, "w") as outfile:
    json.dump(episode_data, outfile)

# Fetch the location data and store as a JSON.
location_data = requests.get(f"{base_url}/simpson_location").json()
# Define the file path to store the data.
location_path = os.path.join("..", "static", "data", "simpson_location.json")
# Write the json to a file.
with open(location_path, "w") as outfile:
    json.dump(location_data, outfile)

# Fetch the script data and store as a JSON.
script_data = requests.get(f"{base_url}/simpson_script").json()
# Define the file path to store the data.
script_path = os.path.join("..", "static", "data", "simpson_script.json")
# Write the json to a file.
with open(script_path, "w") as outfile:
    json.dump(script_data, outfile)