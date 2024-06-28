from flask import Flask, jsonify, request
from flask_cors import CORS
from allrecipes_search_scraper import scrape_recipes
from allrecipes_recipe_scraper import scrape_allrecipes_details

app = Flask(__name__)
CORS(app)

@app.route('/api/scrape', methods=['GET'])
def scrape():
    search_string = request.args.get('searchString', default = 'Test')
    print(search_string)
    scraped_data = scrape_recipes(search_string)
    return jsonify(scraped_data)


@app.route('/api/get_recipe_details', methods=['GET'])
def get_recipe_details():
    recipe_link = request.args.get('recipeLink')
    origin = request.args.get('origin')
    
    if origin == 'allrecipes':
        scraped_details = scrape_allrecipes_details(recipe_link)

    # print(recipe_link)
    # print(origin)
    return scraped_details

if __name__ == '__main__':
    app.run(debug=True)