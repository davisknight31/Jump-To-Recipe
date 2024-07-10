from bs4 import BeautifulSoup
from flask import json
import requests
from selenium import webdriver
from selenium.webdriver.chrome.options import Options
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from fake_useragent import UserAgent



def scrape_allrecipes_details(recipe_link):
    # base_url = "https://www.allrecipes.com/search?q=" + str(search_string) + "&offset="
    # pagination_amount = 0
    # recipe_link = 'https://www.allrecipes.com/recipe/15806/chemical-apple-pie-no-apple-apple-pie/'
    options = Options()
    ua = UserAgent()
    user_agent = ua.random
    # options.add_argument(f'--user-agent={user_agent}')
    # options.add_argument('--headless=new')
    # options.add_argument("--window-size=1920,1080")
    # options.add_argument('--start-maximized')
    # options.add_argument('--disable-gpu')
    # options.add_argument('--no-sandbox')
    # options.add_argument("--disable-extensions")
    # options.add_argument('disable-infobars')
    # options.add_argument('--ignore-certificate-errors')
    # options.add_experimental_option('excludeSwitches', ['enable-logging'])

    
    # driver = webdriver.Chrome(options=options)
    # print(recipe_link)
    # driver.get(recipe_link)
    # WebDriverWait(driver, 10).until(EC.presence_of_all_elements_located((By.CSS_SELECTOR, '.article-heading')))
    # page_source = driver.page_source
    # with open('dump.html', 'w', encoding='utf-8') as f:
    #     f.write(str(page_source))
    # soup = BeautifulSoup(page_source, 'html.parser')

    headers = {'User-Agent': f"{user_agent}"}
    response = requests.get(recipe_link, headers=headers)
    html_content = response.text
    soup = BeautifulSoup(html_content, 'html.parser')
    
    #Find recipe details 
    try:
        prep_time = "N/A"
        cook_time = "N/A"
        total_time = "N/A"
        servings = "N/A"
        total_yield = "N/A"

        details = soup.find_all(class_ = 'mm-recipes-details__value')
        details_length = len(details)

        if details_length > 0:
            prep_time = details[0].text.strip()
        
        if details_length > 1:
            cook_time = details[1].text.strip()

        if details_length > 2:
            total_time = details[2].text.strip()

        if details_length > 3:
            servings = details[3].text.strip()

        if 5 <= len(details):
            total_yield = details[4].text.strip()
    except:
        print('error finding general details')
    finally:
        print('continuing from general details')



    try:
        primary_image = soup.find(class_ = 'primary-image__image')
        if primary_image:
            recipe_image = primary_image.get('src')
        else:
            images = soup.find_all(class_ = 'universal-image__image')
            for image in images:
                if int(image.get('width')) > 1500:
                    if image.get('src'):
                        recipe_image = image.get('src')
                        break
                    elif image.get('data-src'):
                        recipe_image = image.get('data-src')
                        break
                    else:
                        recipe_image = image.get('srcset')
                        break
                elif int(image.get('width')) > 500:
                    if image.get('src'):
                        recipe_image = image.get('src')
                        break
                    elif image.get('data-src'):
                        recipe_image = image.get('data-src')
                        break
                    else:
                        recipe_image = image.get('srcset')
                        break
                else:
                    if image.get('src'):
                        recipe_image = image.get('src')
                        break
                    elif image.get('data-src'):
                        recipe_image = image.get('data-src')
                        break
                    else:
                        recipe_image = image.get('srcset')
                        break
    except:
        print('error finding image')
    finally:
        print('continuing from image')


    # print(image)

    #Find author
    try:
        author_element = soup.find(class_ = 'mntl-attribution__item-name')
        author = author_element.text.strip()
    except:
        print('error finding author')
    finally:
        print('continuing from author')



    ingredients_list = []
    recipe_steps = []
    #Find ingredients
    try: 
        ingredients = soup.find_all(class_ = 'mm-recipes-structured-ingredients__list-item')
        for ingredient in ingredients:
            ingredient_details = ingredient.find_all('span')
            formatted_ingredient_details = ''
            for ingredient_detail in ingredient_details:
                if len(ingredient_detail.text.strip()) > 0:
                    formatted_ingredient_details = formatted_ingredient_details + ingredient_detail.text.strip() + " " 
            ingredients_list.append(formatted_ingredient_details.strip())
        
        ingredients_lists = [ingredients_list]
    except:
        print('error finding ingredients')
    finally:
        print('continuing from ingredients')



    #Find steps
    try:
        steps = soup.find(class_ = 'mm-recipes-steps')
        step_items = steps.find_all('li')

        for step_item in step_items:
            if step_item.find('p'):
                recipe_steps.append(step_item.find('p').text.strip())
            else: 
                recipe_steps.append(step_item.text.strip())
    except:
        print('error finding steps')
    finally:
        print('continuing from steps')



    #Find nutrition info summary
    nutrition_info = []
    try:
        nutrition_info_rows = soup.find_all(class_ = 'mm-recipes-nutrition-facts-summary__table-row')
        for nutrition_info_row in nutrition_info_rows:
            nutrition_info_row_cells = nutrition_info_row.find_all(class_ = 'mm-recipes-nutrition-facts-summary__table-cell')
            print(nutrition_info_row_cells)
            nutrition_info_item = {
                "label": nutrition_info_row_cells[1].text.strip(),
                "value": nutrition_info_row_cells[0].text.strip(),
            }
            nutrition_info.append(nutrition_info_item)
    except:
        print('error finding nutrition')
    finally:
        print('continuing from nutrition')


    
    recipe_details = {
            "author": author,
            "prep_time": prep_time,
            "cook_time": cook_time,
            "total_time": total_time,
            "servings": servings,
            "total_yield": total_yield,
            "ingredient_headers": [],
            "ingredients": ingredients_lists,
            "steps": recipe_steps,
            "nutrition_info": nutrition_info,
            "recipe_image": recipe_image
            }
    
    return recipe_details
 


# returned = scrape_allrecipes_details("https://www.allrecipes.com/recipe/15806/chemical-apple-pie-no-apple-apple-pie/")
# print(returned)


    # with open('dump.html', 'w', encoding='utf-8') as f:
        #     f.write(str(page_source))