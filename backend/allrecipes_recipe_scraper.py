from bs4 import BeautifulSoup
from flask import json
from selenium import webdriver
from selenium.webdriver.chrome.options import Options
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from fake_useragent import UserAgent
import traceback



def scrape_allrecipes_details(recipe_link):
    # base_url = "https://www.allrecipes.com/search?q=" + str(search_string) + "&offset="
    # pagination_amount = 0
    # recipe_link = 'https://www.allrecipes.com/recipe/15806/chemical-apple-pie-no-apple-apple-pie/'
    options = Options()
    ua = UserAgent()
    user_agent = ua.random
    options.add_argument(f'--user-agent={user_agent}')
    options.add_argument('--headless=new')
    options.add_argument("--window-size=1920,1080")
    options.add_argument('--start-maximized')
    options.add_argument('--disable-gpu')
    options.add_argument('--no-sandbox')
    options.add_argument("--disable-extensions")
    options.add_argument('disable-infobars')
    options.add_argument('--ignore-certificate-errors')
    options.add_experimental_option('excludeSwitches', ['enable-logging'])


    
    driver = webdriver.Chrome(options=options)
    print(recipe_link)
    driver.get(recipe_link)
    WebDriverWait(driver, 10).until(EC.presence_of_all_elements_located((By.CSS_SELECTOR, '.article-heading')))
    page_source = driver.page_source
    # with open('dump.html', 'w', encoding='utf-8') as f:
    #     f.write(str(page_source))


    soup = BeautifulSoup(page_source, 'html.parser')

  


    #Find recipe details
    details = soup.find_all(class_ = 'mm-recipes-details__value')
    prep_time = details[0].text.strip()
    cook_time = details[1].text.strip()
    total_time = details[2].text.strip()
    servings = details[3].text.strip()
    total_yield = details[4].text.strip()

    #Find author
    author_element = soup.find(class_ = 'mntl-attribution__item-name')
    author = author_element.text.strip()

    ingredients_list = []
    recipe_steps = []

    #Find ingredients
    ingredients = soup.find_all(class_ = 'mm-recipes-structured-ingredients__list-item')
    for ingredient in ingredients:
        ingredient_details = ingredient.find_all('span')
        formatted_ingredient_details = ''
        for ingredient_detail in ingredient_details:
            if len(ingredient_detail.text.strip()) > 0:
                formatted_ingredient_details = formatted_ingredient_details + ingredient_detail.text.strip() + " " 
        ingredients_list.append(formatted_ingredient_details.strip())
        
    #Find steps
    steps = soup.find(class_ = 'mm-recipes-steps')
    step_items = steps.find_all('li')
    for step_item in step_items:
        recipe_steps.append(step_item.find('p').text.strip())

    #Find nutrition info summary
    nutrition_info = []
    nutrition_info_rows = soup.find_all(class_ = 'mm-recipes-nutrition-facts-summary__table-row')
    for nutrition_info_row in nutrition_info_rows:
        nutrition_info_row_cells = nutrition_info_row.find_all(class_ = 'mm-recipes-nutrition-facts-summary__table-cell')
        print(nutrition_info_row_cells)
        nutrition_info_item = {
            "label": nutrition_info_row_cells[1].text.strip(),
            "value": nutrition_info_row_cells[0].text.strip(),
        }
        nutrition_info.append(nutrition_info_item)


    
    recipe_details = {
            "author": author,
            "prep_time": prep_time,
            "cook_time": cook_time,
            "total_time": total_time,
            "servings": servings,
            "total_yield": total_yield,
            "ingredients": ingredients_list,
            "steps": recipe_steps,
            "nutrition_info": nutrition_info
            }
    
    return recipe_details
 


# returned = scrape_allrecipes_details("https://www.allrecipes.com/recipe/15806/chemical-apple-pie-no-apple-apple-pie/")
# print(returned)










    # with open('dump.html', 'w', encoding='utf-8') as f:
        #     f.write(str(page_source))