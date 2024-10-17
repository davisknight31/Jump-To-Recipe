# Jump To Recipe

## Introduction

Ever get tired of annoying popups and forced page scrolling due to ads on recipe websites? Well Jump To Recipe was created so that the user can bypass that and jump straight to the important stuff.

To use, just enter an ingredient or dish name, search, and see all the recipes related to your search, coming from all the different sites scraped. From there, click on a recipe and a popup will appear with all the necessary details.

Sites Scraped:

- [All Recipes](https://www.allrecipes.com/)
- [Simply Recipes](https://www.simplyrecipes.com/)
- [Sally's Baking Addiction](https://sallysbakingaddiction.com/)

## Table of Contents

- [Introduction](#introduction)
- [Features](#features)
- [Technologies Used](#technologies-used)
- [Hosting](#hosting)
- [What is Happening?](#what-is-happening)
- [Reproducing the Dev Environment](#reproducing-the-dev-environment)
- [Running the Project](#running-the-project)
- [Examples](#examples)

## Features

- Uses the user's search input to search each site, and pulls all relevant recipes
- Provides the user with an easily clickable list of recipes
- Scrapes general details, such as prep time and servings, for the recipe
- Scrapes the ingredients for the recipe
- Scrapes the Steps for the recipe
- Scrapes the nutrion info for the recipe
- Formats all the scraped information to be easily readable for the user

## Technologies Used

### Language

- [Python](https://www.python.org/)
- [JavaScript](https://www.javascript.com/)
- [HTML](https://html.spec.whatwg.org/multipage/)
- [CSS](https://www.w3.org/Style/CSS/Overview.en.html)

### Frameworks

- [Flask (Back End)](https://flask.palletsprojects.com/en/3.0.x/)
- [ReactJS (Front End)](https://react.dev/)

### Libraries

- [Beautiful Soup](https://www.crummy.com/software/BeautifulSoup/bs4/doc/)
- [Selenium](https://selenium-python.readthedocs.io/)
- [Fake User Agent](https://pypi.org/project/fake-useragent/)
- [Requests](https://requests.readthedocs.io/en/latest/)

## Hosting

- The Back End is hosted on an nginx server inside a [Docker](https://www.docker.com/) container hosted on a [Digital Ocean](https://www.digitalocean.com/) droplet.
- The Front End is hosted on [Netlify](https://www.netlify.com/).

## What is Happening?

1. When a user enters their search, the search term is appended to the search url associated with each of the specific websites being scraped.
2. Requests or Selenium is used to get the html content of the search results page.
3. The content is then parsed using BeautifulSoup to pull all the strictly relevant details.
4. All of the details are returned to the frontend, which are then nicely formatted and styled, for easing viewing by the user.

## How to use

## Reproducing the Dev Environment

1. Get the link, and clone the repository on your device, in the location you want the source files.
2. Navigate to the top level of the directory: ![Top Level](https://i.imgur.com/LU1MGxh.png)
3. To setup and run the backend, first navigate into the backend source files using `cd jump-to-recipe-api`.
4. Next, run `pip install -r requirements.txt` to ensure all required packages are installed.
5. Then, to run the API, run `flask run`. If all goes correctly, you should see something like this: ![Running Backend](https://i.imgur.com/h35NdQ2.png)
6. To setup and run the frontend, first navigate from the top level into the frontend source files using `cd frontend`.
7. Next, run `npm install`. If all goes correct, you should see something like this: ![npm install result](https://i.imgur.com/yabNOcZ.png)
8. Now, you can run `npm run dev`. If the frontend runs correctly, you should see something like this: ![Running Frontend](https://i.imgur.com/XslER0X.png)

## Running the Project

## Examples
