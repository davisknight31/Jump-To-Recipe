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


def scrape_allrecipes_search(search_string):
    base_url = "https://www.allrecipes.com/search?q=" + str(search_string) + "&offset="
    pagination_amount = 0

    # options = Options()
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

    # driver = webdriver.Chrome(options=options)


    built_url = base_url   
    recipe_names = []
    recipe_links = []
    recipes_info = []

    headers = {'User-Agent': f"{user_agent}"}
    response = requests.get(built_url, headers=headers)
    html_content = response.text
    # with open('dump.html', 'w', encoding='utf-8') as f:
    #     f.write(str(html_content))
    soup = BeautifulSoup(html_content, 'html.parser')

    for i in range(5):
        response = requests.get(built_url, headers=headers)
        html_content = response.text

        # driver.get(built_url)
        # WebDriverWait(driver, 10).until(EC.presence_of_all_elements_located((By.CSS_SELECTOR, 'a')))
        # page_source = driver.page_source
        # with open('dump.html', 'w', encoding='utf-8') as f:
        #     f.write(str(page_source))


        soup = BeautifulSoup(html_content, 'html.parser')
        anchors = soup.find_all(class_ = 'mntl-card-list-items') 
        for anchor in anchors:
            content = anchor.find(class_ = 'card__content')
            ratings = content.find(class_ = 'mntl-recipe-star-rating')
            if ratings:
                image_source = ""
                image_alt = ""
                try:
                    image_alt = "A picture showcasing the recipe"
                    image = anchor.find(class_ = 'card__img')
                    image_source = image.get('data-src')
                    image_alt = image.get('alt')
                except:
                    print('error finding recipe image')
                finally:
                    print('continuing from recipe image')
                title = content.find(class_ = 'card__title-text')
                if title:
                    recipe_name = title.text.strip()
                    recipe_names.append(recipe_names)
                recipe_link = anchor.get('href')
                recipe_links.append(recipe_link)
                star_icon_count = ratings.find_all(class_ = 'icon-star')
                half_star_icon_count = ratings.find_all(class_ = 'icon-star-half')
                stars = len(star_icon_count)
                if len(half_star_icon_count) > 0:
                    stars = stars + 0.5

                info = {
                        "origin": "allrecipes",
                        "recipe_title": recipe_name,
                        "recipe_link": recipe_link,
                        'star_rating': stars,
                        'recipe_image': image_source,
                        'recipe_image_alt': image_alt
                        }
                recipes_info.append(info)
        pagination_amount = pagination_amount + 24
        built_url = base_url + str(pagination_amount)

    # print(recipes_info)
    return recipes_info


