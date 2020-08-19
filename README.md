# The Simpsons Data Dashboard
Home of the UO data analytics boot camp Project 2 for group TIKT

## Project Overview

### Topic: The Simpsons
Our group was inspired by a number of well made dashboards that summarize data about successful television shows ([The Office](https://pudding.cool/2017/08/the-office/), a prior [Simpsons project](https://towardsdatascience.com/the-simpsons-meets-data-visualization-ef8ef0819d13), and [another Simpsons project](https://toddwschneider.com/posts/the-simpsons-by-the-data/)). We began searching for data sets that would allow us to produce a similar dashboard and came across [“The Simpsons by The Data”](https://data.world/data-society/the-simpsons-by-the-data) from data.world. This data set was well formatted and included a large amount of easily quantifiable data.

### Step 1: Data Cleaning and Storage
The .csv files used had already been cleaned and formatted to a remarkable degree. All the cleaning that was needed for our purposes was to remove a number of blank columns that somehow were included in the script data. These .csv files were then each read by Python and uploaded to a MongoDB database for use in an API and for the visualizations to be included in the finished dashboard. API routes are available for the cleaned [script data](https://simpson-dashboard-app.herokuapp.com/simpson_script), [location data](https://simpson-dashboard-app.herokuapp.com/simpson_location), [episode data](https://simpson-dashboard-app.herokuapp.com/simpson_episodes), and [character data](https://simpson-dashboard-app.herokuapp.com/simpson_character). Example data (in JSON format) is shown below.

Script data:
```
{
    "character_id":464.0,
    "episode_id":32,
    "id":9549,
    "location_id":3.0,
    "normalized_text":"no actually it was a little of both sometimes when a disease is in all the magazines and all the news shows its only natural that you think you have it",
    "number":209,
    "raw_character_text":"Miss Hoover",
    "raw_location_text":"Springfield Elementary School",
    "raw_text":"Miss Hoover: No, actually, it was a little of both. Sometimes when a disease is in all the magazines and all the news shows, it's only natural that you think you have it.",
    "speaking_line":true,
    "spoken_words":"No, actually, it was a little of both. Sometimes when a disease is in all the magazines and all the news shows, it's only natural that you think you have it.",
    "timestamp_in_ms":848000,
    "word_count":31.0
}
```

Location data:

```
{
    "id":163,
    "name":"Kwik-E-Mart Parking Lot",
    "normalized_name":"kwik-e-mart parking lot"
}
```

Episode data:

```
{
    "id":26,
    "image_url":"http://static-media.fxx.com/img/FX_Networks_-_FXX/930/879/Simpsons_02_13.jpg",
    "imdb_rating":8.0,
    "imdb_votes":1329.0,
    "number_in_season":13,
    "number_in_series":26,
    "original_air_date":"1991-02-07",
    "original_air_year":1991,
    "production_code":"7F13",
    "season":2,
    "title":"Homer vs. Lisa and the 8th Commandment",
    "us_viewers_in_millions":26.2,
    "video_url":"http://www.simpsonsworld.com/video/260820547692",
    "views":58277.0
}
```

Character data:

```
{
    "id":22,
    "name":"Selma Bouvier",
    "normalized_name":"selma bouvier"
}
```

### Step 2: User Interface
A web page was created to be rendered by a Flask app that would accept user input in various fields to allow the user to customize the visualizations presented. Default values are loaded when the web page is first rendered. These can be then be customized as the user sees fit through interactive dropdown menus. Links to the API routes are available at the bottom of the web page.

![logo](/readme_images/2020-08-18.png)

![API links](/readme_images/2020-08-18_1.png)

### Step 3: Data Visualizations
Each developer worked on a separate visualization to help users explore the data. All visualizations were produced using [chart.js](https://www.chartjs.org/).

![bar chart](/readme_images/2020-08-18_2.png)
This bar chart compares how many lines of dialogue ten of the most prominent characters in the show have in a given episode. The dropdown menu allows the user to select any episode in the database. A bar chart was chosen as the most comprehensible way to compare quantitative data among a large number of catagories to let the user search for patterns in which characters get the most dialogue.

![imdb line chart](/readme_images/2020-08-18_3.png)
This dual axis line chart compares IMDB user ratings to the number of IMDB users who voted on a given episode for season 10 of the show. A line chart was chosen to easily compare quantitative measurements over time. The user can interperate from this chart that, at least for season 10, the average IMDB user rating for a given episode tended to be higher when more users took the time to rate it, and vice versa.

![viewers line chart](/readme_images/2020-08-18_4.png)
This line chart shows how many viewers saw an episode when it originally aired. The dropdown menu allows the user to select any season in the database. A line chart was chosen to allow the user to detect trends in viewership over a given season. 

![bubble chart](/readme_images/2020-08-18_5.png)
This bubble chart compares the number of times a given phrase of dialogue is used in an episode (represented by the radius of the bubble) to the IMDB rating for a given episode (vertical axis) tracked over time by original air date (horizontal axis). A dropdown menu allows the user to select any season in the database, and an input field allows the user to input any word or phrase they wish to search for. Users need to be careful to input a word or phrase that would be commonly used, such as a character's name, as even common catch phrases (e.g., "Doh!", "Aye carumba!", "Ha ha", and "Excellent") are not used as commonly as one might think at first and result in difficult to see data points. This chart layout was chosen to allow users to explore any trends they might find in how often a word or phrase is used in an episode and how highly rated that episode is.

### Going Further
Some possible future directions to take the project include:

* Adding additional API routes to allow users to pull more specific data, as well as enhancing performance when visualizations refresh.

* Adding interactivity to the IMDB ratings/users chart.

* Reformatting the visualizations to improve performance when they refresh.

## Running the App

### Current Deployment
The current functioning form of the application is accessible through a [Heroku page](https://simpson-dashboard-app.herokuapp.com/). As the applicaton currently runs on a no-cost dyno through Heroku it may take several minutes to reactivate if it has not been recently accessed. Additionally, the bar chart and bubble chart render quite slowly as they have to access the massive script data collection, meaning the page may seem unresponsive when in fact it is working diligently to render these visualizations. The developers do not currently plan on accepting open source updates to this project. For those developers who wish to fork this repository and run the application locally to use for their own work, please use the following steps.

### Step 1: Install MongoDB
Follow the instructions to install the latest version of [MongoDB](https://www.mongodb.com/) on your local machine.

### Step 2: Install Python
For the purposes of this application, the most convenient method to install Python is to install [Anaconda](https://docs.anaconda.com/anaconda/install/). This will allow the user to set up a virtual environment with an appropriate version of Python.

### Step 3: Create Virtual Environment
From the command terminal, create a new virtual environment to use to run the application.
```
conda create --name simpsons_env python=3.7
```
When conda asks if you want to proceed, type "y" and press Enter.

Activate the new virtual environment so the required software packages can be installed.
```
conda activate simpsons_env
```

Next, install all required packages to run the app.
```
pip install -r requirements.txt
```
When pip asks if you want to proceed, type "y" and press Enter.

### Step 4: Activate Virtual Environment and Test the Application
From the command terminal, navigate to the directory where the repository is stored.

To set up the database, make sure MongoDB is actively running and use the following command.

```
python initdb.py
```

Use the following command to run the application on your local machine.
```
python simpson_dashboard/main.py
```
Copy and paste the link that appears into your web browser, or navigate to `http://localhost:5000/`. After a few minutes at most you should see a web page that looks like the screenshots shown above.

## Contributors 
Iris Arnold, Ty Sorenson, Karl Unverferth, Tristan Holmes