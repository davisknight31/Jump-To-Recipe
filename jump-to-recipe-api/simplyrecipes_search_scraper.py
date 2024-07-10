from bs4 import BeautifulSoup
import requests
from flask import json
from selenium import webdriver
from selenium.webdriver.chrome.options import Options
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from fake_useragent import UserAgent


def scrape_simplyrecipes_search(search_string):
    base_url = "https://www.simplyrecipes.com/search?q=" + str(search_string) + "&offset="
    pagination_amount = 0
    ua = UserAgent()
    user_agent = ua.random

    headers = {'User-Agent': f"{user_agent}"}
    response = requests.get(base_url, headers=headers)
    html_content = response.text
    # with open('dump.html', 'w', encoding='utf-8') as f:
    #     f.write(str(html_content))
    # soup = BeautifulSoup(html_content, 'html.parser')

    recipe_info = []
    built_url = base_url   


    for i in range(5):
        response = requests.get(built_url, headers=headers)
        html_content = response.text
        soup = BeautifulSoup(html_content, 'html.parser')

        lists = soup.find_all(class_ = 'search-results-list')
        for list in lists:
            cards = list.find_all(class_ = 'card-list__item')
            for card in cards:
                anchor = card.find('a')
                card_title = anchor.find(class_ = 'card__underline')
                recipe_name = card_title.text.strip()
                if anchor.find(class_ = "meta-text--recipe"):
                    #and search_string.lower() in recipe_name.lower()
                    recipe_link = anchor.get('href')
                    stars_container = anchor.find(class_ = 'mntl-aggregate-star-rating')
                    stars = 0
                    if stars_container:
                        star_spans = stars_container.find_all('span')
                        for star_span in star_spans:
                            if 'active' in star_span.get('class', []):
                                stars = stars + 1
                            else: 
                                if 'half' in star_span.get('class', []):
                                    stars = stars + 0.5

                    info = {
                            "origin": "simplyrecipes",
                            "recipe_title": recipe_name,
                            "recipe_link": recipe_link,
                            'star_rating': stars
                            }
                    
                    recipe_info.append(info)
        pagination_amount = pagination_amount + 24
        built_url = base_url + str(pagination_amount)
    return recipe_info


# scrape_simplyrecipes_search("apple")

