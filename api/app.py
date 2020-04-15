from flask import Flask, render_template, jsonify
from flask_pymongo import PyMongo

# Create an instance of Flask
app = Flask(__name__)

# Use PyMongo to establish Mongo connection
mongo = PyMongo(app, uri="mongodb://localhost:27017/simpsons_app")


# Route to render index.html template using data from Mongo
@app.route("/")
def home():

    # Return template and data
    return render_template("index.html")


# Route that will return information on Simpsons characters.
@app.route("/simpsons_characters")
def characters():

    # Define the characters collection to be queried.
    characters = mongo.db.simpsons_characters

    # Create a list to store the data in the returned documents.
    output = []

    # Loop through the returned documents.
    for character in characters.find():
        output.append({"placeholder":character["placeholder"]})

    # Return JSON of the collected documents.
    return jsonify({"result":output})

# Route that will return information on Simpsons episodes.
@app.route("/simpsons_episodes")
def episodes():

    # Define the episodes collection to be queried.
    episodes = mongo.db.simpsons_episodes

    # Create a list to store the data in the returned documents.
    output = []

    # Loop through the returned documents.
    for episode in episodes.find():
        output.append({"placeholder":episode["placeholder"]})

    # Return JSON of the collected documents.
    return jsonify({"result":output})

# Route that will return information on Simpsons locations.
@app.route("/simpsons_locations")
def locations():

    # Define the locations collection to be queried.
    locations = mongo.db.simpsons_locations

    # Create a list to store the data in the returned documents.
    output = []

    # Loop through the returned documents.
    for character in locations.find():
        output.append({"placeholder":character["placholder"]})

    # Return JSON of the collected documents.
    return jsonify({"result":output})

# Route that will return information on Simpsons script lines.
@app.route("/simpsons_script_lines")
def script_lines():

    # Define the script lines collection to be queried.
    lines = mongo.db.simpsons_script_lines

    # Create a list to store the data in the returned documents.
    output = []

    # Loop through the returned documents.
    for line in lines.find():
        output.append({"placeholder":line["placholder"]})

    # Return JSON of the collected documents.
    return jsonify({"result":output})

if __name__ == "__main__":
    app.run(debug=True)