from bs4 import BeautifulSoup
import requests
from flask import json
from selenium import webdriver
from selenium.webdriver.chrome.options import Options
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from fake_useragent import UserAgent


# base_url = "https://www.allrecipes.com/"

# &offset=48         Add this to paginate, 24 per page so this would be 3rd page

#It seems like allrecipes limits to 5 pages to get relevant recipes from their database, or a 96 offset


def scrape_sallys_search(search_string):
    # base_url = "https://www.allrecipes.com/search?q=" + str(search_string) + "&offset="
    base_url = "https://sallysbakingaddiction.com/page/"
    pagination_amount = 0

    ua = UserAgent()
    user_agent = ua.random
    recipes_info = []
    headers = {'User-Agent': f"{user_agent}"}

    for i in range(2):
        page_num = i + 1
        built_url = base_url + str(page_num) + "/?s=" + str(search_string)
        response = requests.get(built_url, headers=headers)
        html_content = response.text
        soup = BeautifulSoup(html_content, 'html.parser')
        search_articles = soup.find_all(class_ = 'post-lg') 
        for search_article in search_articles:
            article_link = search_article.find('a')
            recipe_link = article_link.get('href')
            recipe_image = article_link.find('img')
            image_source = recipe_image.get('src')
            image_alt = recipe_image.get('alt')

            title_container = search_article.find(class_ = "entry-title")
            recipe_name = title_container.find('a').text.strip()

            info = {
                            "origin": "Sally's Baking Addiction",
                            "recipe_title": recipe_name,
                            "recipe_link": recipe_link,
                            'star_rating': 0,
                            'recipe_image': image_source,
                            'recipe_image_alt': image_alt
                            }
            
            if (search_string.lower() in recipe_name.lower() and "+" not in search_string.lower()):
                recipes_info.append(info)
            
    return recipes_info
            
        # print(recipes_info)
        # with open('dump.json', 'w', encoding='utf-8') as f:
        #     json.dump(recipes_info, f, indent = 6)
