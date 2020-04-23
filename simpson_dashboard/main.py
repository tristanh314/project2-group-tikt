# Import dependencies.
from flask import Flask, render_template, jsonify
from flask_pymongo import PyMongo
from flask_cors import CORS
import os

# Create an instance of Flask.
app = Flask(__name__)

# Set up CORS for the app.
cors = CORS(app)

# Set up the database. 
app.config['MONGO_URI'] = os.environ.get('MONGODB_URI', '') or "mongodb://localhost:27017/simpson_data"

# Use PyMongo to establish Mongo connection.
mongo = PyMongo(app)

# Route to render index.html template using data from Mongo.
@app.route("/")
def home():

    # Render the dashboard.
    return render_template("index.html")


# Route that will return information on Simpsons characters.
@app.route("/simpson_character")
def characters():

    # Define the characters collection to be queried.
    characters = mongo.db.simpson_character

    # Create a list to store the data in the returned documents.
    output = []

    # Loop through the returned documents.
    for character in characters.find():
        output.append(
            {
                "id":character["id"],
                "name":character["name"],
                "normalized_name":character["normalized_name"],
                # Gender is not output as it was left blank in the original csv.
                # "gender":character["gender"]
            }
        )

    # Return JSON of the collected documents.
    return jsonify({"result":output})

# Route that will return information on Simpsons episodes.
@app.route("/simpson_episodes")
def episodes():

    # Define the episodes collection to be queried.
    episodes = mongo.db.simpson_episodes

    # Create a list to store the data in the returned documents.
    output = []

    # Loop through the returned documents.
    for episode in episodes.find():
        output.append(
            {
                "id":episode["id"],
                "image_url":episode["image_url"],
                "imdb_rating":episode["imdb_rating"],
                "imdb_votes":episode["imdb_votes"],
                "number_in_season":episode["number_in_season"],
                "number_in_series":episode["number_in_series"],
                "original_air_date":episode["original_air_date"],
                "original_air_year":episode["original_air_year"],
                "production_code":episode["production_code"],
                "season":episode["season"],
                "title":episode["title"],
                "us_viewers_in_millions":episode["us_viewers_in_millions"],
                "video_url":episode["video_url"],
                "views":episode["views"]
            }
        )

    # Return JSON of the collected documents.
    return jsonify({"result":output})

# Route that will return information on Simpsons locations.
@app.route("/simpson_location")
def locations():

    # Define the locations collection to be queried.
    locations = mongo.db.simpson_location

    # Create a list to store the data in the returned documents.
    output = []

    # Loop through the returned documents.
    for location in locations.find():
        output.append(
            {
                "id":location["id"],
                "name":location["name"],
                "normalized_name":location["normalized_name"]
            }
        )

    # Return JSON of the collected documents.
    return jsonify({"result":output})

# Route that will return information on Simpsons script lines.
@app.route("/simpson_script")
def script_lines():

    # Define the script lines collection to be queried.
    lines = mongo.db.simpson_script

    # Create a list to store the data in the returned documents.
    output = []

    # Loop through the returned documents.
    for line in lines.find():
        output.append(
            {
                "id":line["id"],
                "episode_id":line["episode_id"],
                "number":line["number"],
                "raw_text":line["raw_text"],
                "timestamp_in_ms":line["timestamp_in_ms"],
                "speaking_line":line["speaking_line"],
                "character_id":line["character_id"],
                "location_id":line["location_id"],
                "raw_character_text":line["raw_character_text"],
                "raw_location_text":line["raw_location_text"],
                "spoken_words":line["spoken_words"],
                "normalized_text":line["normalized_text"],
                "word_count":line["word_count"]
            }
        )

    # Return JSON of the collected documents.
    return jsonify({"result":output})

if __name__ == "__main__":
    app.run(debug=True)