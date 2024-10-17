from bs4 import BeautifulSoup, NavigableString, Tag
from flask import json
import requests
from selenium import webdriver
from selenium.webdriver.chrome.options import Options
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from fake_useragent import UserAgent

def clean_text(string):
    clean_string = string.replace(u'\xa0', u' ')
    clean_string =  clean_string.replace(u'\n', u' ')
    return clean_string


def scrape_sallys_details(recipe_link):
    ua = UserAgent()
    user_agent = ua.random
    headers = {'User-Agent': f"{user_agent}"}
    response = requests.get(recipe_link, headers=headers)
    html_content = response.text
    
    soup = BeautifulSoup(html_content, 'html.parser')
    recipe_container = soup.find(id="primary")
    with open('dump.html', 'w', encoding='utf-8') as f:
        f.write(str(recipe_container))
    try:
        recipe_header = recipe_container.find(class_ = "entry-header")
        recipe_title = recipe_header.find(class_ = "entry-title").text.strip()
        author = recipe_container.find(class_ = "author").find('a').text.strip()
    except:
        print('error finding title and author')
    finally:
        print('continuing from title and author')

    try:
        details_container = recipe_container.find(class_ = "tasty-recipes-details")
        prep_time = details_container.find(class_ = "tasty-recipes-prep-time").text.strip()
        cook_time = details_container.find(class_ = "tasty-recipes-cook-time").text.strip()
        total_time = details_container.find(class_ = "tasty-recipes-total-time").text.strip()
        total_yield = details_container.find(class_ = "tasty-recipes-yield").text.strip()
        servings = total_yield
    except:
        print('error finding details')
    finally:
        print('continuing from details')


    ingredients_headers = []
    ingredients_lists = []
    try:
        ingredients_container = recipe_container.find(class_ = "tasty-recipes-ingredients-body")
        headers = ingredients_container.find_all('h4')
        for header in headers:
            ingredients_headers.append(header.text.strip())
        
        lists = ingredients_container.find_all('ul')
        for list in lists:
            ingredients = []
            list_items = list.find_all('li')
            for item in list_items:
                outer_spans = item.find_all('span')
                ingredient_entry = outer_spans[1].text.strip()
                cleaned_ingredient_entry = clean_text(ingredient_entry)
                ingredients.append(cleaned_ingredient_entry)

            ingredients_lists.append(ingredients)
    except:
        print('error finding ingredients')
    finally:
        print('continuing from ingredients')


    recipe_steps = []
    try:
        steps_container = recipe_container.find(class_ = "tasty-recipes-instructions-body")
        steps_list = steps_container.find('ol')
        steps_list_items = steps_list.find_all('li')
        for item in steps_list_items:
            cleaned_item = clean_text(item.text.strip())
            recipe_steps.append(cleaned_item)
    except:
        print('error finding steps')
    finally:
        print('continuing from steps')

    nutrition_info = []
    nutrition_info_item = {
                "label": "Calories",
                "value": "Not provided by Sally's",
            }
    nutrition_info.append(nutrition_info_item)
    nutrition_info_item = {
                "label": "Fat",
                "value": "Not provided by Sally's",
            }
    nutrition_info.append(nutrition_info_item)
    nutrition_info_item = {
                "label": "Carbs",
                "value": "Not provided by Sally's",
            }
    nutrition_info.append(nutrition_info_item)
    nutrition_info_item = {
                "label": "Protein",
                "value": "Not provided by Sally's",
            }
    nutrition_info.append(nutrition_info_item)
    


    recipe_details = {
            "recipe_title": recipe_title,
            "author": author,
            "prep_time": prep_time,
            "cook_time": cook_time,
            "total_time": total_time,
            "servings": servings,
            "total_yield": total_yield,
            "ingredient_headers": ingredients_headers,
            "ingredients": ingredients_lists,
            "steps": recipe_steps,
            "nutrition_info": nutrition_info,
            "recipe_image": "null"
            }
    
    return recipe_details

