from bs4 import BeautifulSoup, NavigableString, Tag
from flask import json
import requests
from selenium import webdriver
from selenium.webdriver.chrome.options import Options
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from fake_useragent import UserAgent
import traceback



def clean_text(string):
    clean_string = string.replace(u'\xa0', u' ')
    clean_string =  string.replace(u'\n', u' ')
    return clean_string

def scrape_simplyrecipes_details(recipe_link):
    ua = UserAgent()
    user_agent = ua.random
    headers = {'User-Agent': f"{user_agent}"}
    response = requests.get(recipe_link, headers=headers)
    html_content = response.text
    with open('dump.html', 'w', encoding='utf-8') as f:
        f.write(str(html_content))
    soup = BeautifulSoup(html_content, 'html.parser')

    prep_time_item = soup.find(class_ = 'prep-time')
    cook_time_item = soup.find(class_ = 'cook-time')
    total_time_item = soup.find(class_ = 'total-time')
    servings_item = soup.find(class_ = 'recipe-serving')
    total_yield_item = soup.find(class_ = 'recipe-yield')

    author = soup.find(class_ = "mntl-attribution__item-name").text.strip()
    
    if prep_time_item:
        prep_time = prep_time_item.find(class_ = 'meta-text__data').text.strip()
        prep_time = clean_text(prep_time)

    if cook_time_item:    
        cook_time = cook_time_item.find(class_ = 'meta-text__data').text.strip()
        cook_time = clean_text(cook_time)

    if total_time_item:    
        total_time = total_time_item.find(class_ = 'meta-text__data').text.strip()
        total_time = clean_text(total_time)

    if servings_item:    
        servings = servings_item.find(class_ = 'meta-text__data').text.strip()
        servings = clean_text(servings)

    if total_yield_item:    
        total_yield = total_yield_item.find(class_ = 'meta-text__data').text.strip()
        total_yield = clean_text(total_yield)
    else:
        total_yield = servings_item.find(class_ = 'meta-text__data').text.strip()
        total_yield = clean_text(total_yield)


    #Find ingredient lists
    ingredients_headers = []
    ingredient_lists = []
    ingredients_container = soup.find(class_ = 'structured-ingredients')
    ingredients_header_containers = ingredients_container.find_all(class_ = 'structured-ingredients__list-heading')
    for ingredients_header_container in ingredients_header_containers:
        ingredients_headers.append(ingredients_header_container.text.strip())
    ingredients_lists = ingredients_container.find_all(class_ = 'structured-ingredients__list')
    for ingredients_list in ingredients_lists:
        formatted_list = []
        ingredient_list_items = ingredients_list.find_all(class_ = 'structured-ingredients__list-item')
        for ingredient_list_item in ingredient_list_items:
            formatted_item = ""
            ingredient_quantity = ingredient_list_item.find("span", attrs={"data-ingredient-quantity":True})
            ingredient_unit = ingredient_list_item.find("span", attrs={"data-ingredient-unit":True})
            ingredient_name = ingredient_list_item.find("span", attrs={"data-ingredient-name":True})

            if ingredient_quantity:
                formatted_item += ingredient_quantity.text.strip() + " "
            if ingredient_unit:
                formatted_item += ingredient_unit.text.strip() + " "
            if ingredient_name:
                formatted_item += ingredient_name.text.strip()

            formatted_item = clean_text(formatted_item)
            formatted_list.append(formatted_item)
        
        ingredient_lists.append(formatted_list)

    # ingredients = {
    #     "headers": ingredients_headers,
    #     "ingredient_lists": ingredient_lists
    # }


    #Find steps
    recipe_steps = []
    steps_container = soup.find(class_ = "structured-project__steps")
    steps_list_items = steps_container.find_all('li')
    for steps_list_item in steps_list_items:
        step_text = steps_list_item.find('p').text.strip()
        if step_text:
            step_text = clean_text(step_text)
            recipe_steps.append(step_text)


    #Find nutrition info
    nutrition_info = []
    nutrition_info_rows = soup.find_all(class_ = 'nutrition-info__table--row')
    for nutrition_info_row in nutrition_info_rows:

        if isinstance(nutrition_info_row, NavigableString):
                continue
        if isinstance(nutrition_info_row, Tag):
            nutrition_info_cells = nutrition_info_row.find_all(class_ = 'nutrition-info__table--cell')
            clean_label = clean_text(nutrition_info_cells[1].text.strip())
            clean_value = clean_text(nutrition_info_cells[0].text.strip())
            nutrition_info_item = {
                "label": clean_label,
                "value": clean_value
                }
            nutrition_info.append(nutrition_info_item)
    
    #Find image
    recipe_image = ""
    primary_image = soup.find(class_ = "primary-image__image")
    if primary_image:
        recipe_image = primary_image.get('src')


    recipe_details = {
            "author": author,
            "prep_time": prep_time,
            "cook_time": cook_time,
            "total_time": total_time,
            "servings": servings,
            "total_yield": total_yield,
            "ingredient_headers": ingredients_headers,
            "ingredients": ingredient_lists,
            "steps": recipe_steps,
            "nutrition_info": nutrition_info,
            "recipe_image": recipe_image
            }
    
    # print(recipe_details)
    return recipe_details


scrape_simplyrecipes_details("https://www.simplyrecipes.com/caramel-apple-oatmeal-bars-recipe-8364022")
# scrape_simplyrecipes_details("https://www.simplyrecipes.com/baked-oatmeal-with-mixed-berries-recipe-5185886")