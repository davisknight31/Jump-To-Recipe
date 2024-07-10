from flask import Flask, jsonify, request
from flask_cors import CORS
from allrecipes_search_scraper import scrape_allrecipes_search
from allrecipes_recipe_scraper import scrape_allrecipes_details
from simplyrecipes_search_scraper import scrape_simplyrecipes_search
from simplyrecipes_recipe_scraper import scrape_simplyrecipes_details
import random

app = Flask(__name__)
CORS(app)

@app.route('/', methods=['GET'])
def getHome():
    return jsonify({"Test": "Test"})

@app.route('/recipe-api/scrape', methods=['GET'])
def scrape():
    search_string = request.args.get('searchString', default = 'Test')

    scraped_allrecipes_search_data = scrape_allrecipes_search(search_string)
    scraped_simplyrecipes_search_data = scrape_simplyrecipes_search(search_string)


    scraped_allrecipes_search_data_relevant = []
    scraped_allrecipes_search_data_irrelevant = []

    for recipe in scraped_allrecipes_search_data:
        if (search_string.lower() in recipe["recipe_title"].lower()):
            scraped_allrecipes_search_data_relevant.append(recipe)
        else:
            scraped_allrecipes_search_data_irrelevant.append(recipe)


    scraped_simplyrecipes_search_data_relevant = []
    scraped_simplyrecipes_search_data_irrelevant = []
    for recipe in scraped_simplyrecipes_search_data:
        if (search_string.lower() in recipe["recipe_title"].lower()):
            scraped_simplyrecipes_search_data_relevant.append(recipe)
        else:
            scraped_simplyrecipes_search_data_irrelevant.append(recipe)    


    combined_list = []

    #Combine relevant first
    longest_list = scraped_simplyrecipes_search_data_relevant
    if len(scraped_allrecipes_search_data_relevant) > len(scraped_simplyrecipes_search_data_relevant):
        longest_list = scraped_allrecipes_search_data_relevant
    
    for i in range(len(longest_list)):
        if (i <= len(scraped_simplyrecipes_search_data_relevant) - 1):
            combined_list.append(scraped_simplyrecipes_search_data_relevant[i])
        if (i <= len(scraped_allrecipes_search_data_relevant) -1 ):
            combined_list.append(scraped_allrecipes_search_data_relevant[i])


    #Combine irrelevant second
    longest_list = scraped_simplyrecipes_search_data_irrelevant
    if len(scraped_allrecipes_search_data_irrelevant) > len(scraped_simplyrecipes_search_data_irrelevant):
        longest_list = scraped_allrecipes_search_data_irrelevant
    
    for i in range(len(longest_list)):
        if (i <= len(scraped_simplyrecipes_search_data_irrelevant) - 1):
            combined_list.append(scraped_simplyrecipes_search_data_irrelevant[i])
        if (i <= len(scraped_allrecipes_search_data_irrelevant) -1 ):
            combined_list.append(scraped_allrecipes_search_data_irrelevant[i])

    return jsonify(combined_list)


@app.route('/recipe-api/get_recipe_details', methods=['GET'])
def get_recipe_details():
    recipe_link = request.args.get('recipeLink')
    origin = request.args.get('origin')
    
    if origin == 'allrecipes':
        scraped_details = scrape_allrecipes_details(recipe_link)
    if origin =='simplyrecipes':
        scraped_details = scrape_simplyrecipes_details(recipe_link)

    # print(recipe_link)
    # print(origin)
    return scraped_details

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000, debug=True)
