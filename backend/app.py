from flask import Flask, jsonify, request
from flask_cors import CORS
from allrecipes_scraper import scrape_recipes

app = Flask(__name__)
CORS(app)

@app.route('/api/scrape', methods=['GET'])
def scrape():
    search_string = request.args.get('searchString', default = 'Test')
    print(search_string)
    scraped_data = scrape_recipes(search_string)
    return jsonify(scraped_data)

if __name__ == '__main__':
    app.run(debug=True)