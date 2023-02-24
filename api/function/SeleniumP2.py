sys.path.append('api/function/sql_command')
from sql_command.sql_user_info import *
from sql_command.sql_group_info import *
from sql_command.sql_order_info import *
from sql_command.sql_order_list_info import *
from sql_command.sql_store_info import *
from sql_command.sql_menu_info import *
from sql_command.sql_bill_info import *


from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.chrome.service import Service

from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC

import os
import sys

# 1 驅動路徑
chromedriver_path = "/Users/sc/Documents/100_Work/140_WeHelp/Food_chosen/chromedriver"

# 2 視窗顯示
# # 不顯示瀏覽器
# chrome_options = Options()
# chrome_options.add_argument('--headless')
# driver = webdriver.Chrome(service=Service(executable_path=chromedriver_path), options=chrome_options)

# 顯示瀏覽器
driver = webdriver.Chrome(service=Service(executable_path=chromedriver_path))
driver.maximize_window()

# 3 進入網頁並點擊
driver.get("https://dinbendon.net/do/idine")
link = driver.find_element(By.XPATH, "//span[text()='找一下']")
link.click()

# 4 點擊後輸入值
wait = WebDriverWait(driver, 10)
input_field = wait.until(EC.visibility_of_element_located((By.ID, "navigation_panel_form_term")))

print("input_field", input_field)
input_field.send_keys("丹丹漢堡")

search_store = driver.find_element(By.ID, "navigation_panel_form_search")
search_store.click()

decide_store = wait.until(EC.visibility_of_element_located((By.ID, "navigation_panel_resultBox_shops_3")))
decide_store.click()
# 找到店家
goto_store = driver.find_element(By.XPATH, "//span[text()='導覽']")
goto_store.click()

# goto_store = wait.until(EC.visibility_of_element_located((By.XPATH, '//a[contains(@href,"/do/idine?shop=")]')))
# store_link = goto_store.get_attribute('href')
# driver.get(store_link)

# 4.5 Click href to get url
click_to_url = wait.until(EC.visibility_of_element_located((By.XPATH,'//div[contains(@class, "actions")]/div')))
click_to_url.click()
target_store_url = driver.current_url
print("current_url",target_store_url)

# 5 分析數據(No need)
# 店名
store_name_element = driver.find_element(By.XPATH,'//td[contains(@class, "title") and text()="店名"]/following-sibling::td/span')
store_name = store_name_element.text
# 地址
store_address_element = driver.find_element(By.XPATH,'//td[contains(@class, "title") and text()="地址"]/following-sibling::td/div/span')
address = store_address_element.get_attribute("textContent")
store_address = address.strip()
# 電話
store_phone_number_element = driver.find_element(By.XPATH,'//td[contains(@class, "title") and text()="電話"]/following-sibling::td')
store_phone_number = store_phone_number_element.text
# 店家類型
store_type_element = driver.find_element(By.XPATH,'//td[contains(@class, "title") and text()="店家服務類型"]/following-sibling::td')
store_type = store_type_element.text
print("store_type",store_type)
# 外送條件
store_delivery_condition_element = driver.find_element(By.XPATH,'//td[contains(@class, "title") and text()="訂購說明"]/following-sibling::td/div')
store_delivery_condition = store_delivery_condition_element.text
print("store_delivery_condition",store_delivery_condition)

# ==================================================================
from distutils.file_util import move_file
import ssl
ssl._create_default_https_context=ssl._create_unverified_context
import urllib.request as req
import bs4

def getData(url):
    # build a request object, addition Requrest Header information
    request=req.Request(url, headers={
        "cookie":"over18=1", # add cookie for Gossip oyther don't need
        "User-Agent":"Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/105.0.0.0 Safari/537.36" # add Agent
    })
    with req.urlopen(request) as response:
        data=response.read().decode("utf-8")
    

    # 2. analysis data
    root=bs4.BeautifulSoup(data, "html.parser")
    print("data",root.title)
    titles=root.find_all("div", class_="title")
    movie_title=[]    
    for title in titles:
        if title.a !=None:
            # print(title.a.string)
            movie_title=movie_title+[title.a.string]

    # 3. capture lots pages of web
    nextLink=root.find("a", string="‹ 上頁") # find the <a> tag with 上頁
    return [nextLink["href"],movie_title]

getData(target_store_url)


# 
menu_type_element = driver.find_elements(By.XPATH,'//td[contains(@class, "categoryHeader")]/span')
for menu_type_element_ls in menu_type_element:
    menu_type = menu_type_element_ls
    print("menu_type",menu_type)

# menu_items_element = driver.find_element(By.XPATH,'//td[contains(@style, "vertical-align: top;")]/table[contains(@style, "margin-bottom: 0.5em;")]/tbody/tr')
menu_items_element = driver.find_element(By.XPATH,"""
//td[contains(@style, "vertical-align: top;")]
/table[contains(@style, "margin-bottom: 0.5em;")]/tbody/tr[contains(@class, "even")]/td/div
""")
print(menu_items_element.text)


# menu_items_element = driver.find_elements(By.XPATH,'//table[contains(@style, "margin-bottom: 0.5em;")]/tbody/tr')
# for menu_items_element_ls in menu_items_element:
#     tt=menu_items_element_ls.find_element(By.XPATH,'//table[contains(@class, "categoryHeader")]/span')
#     print("ttt",tt)
#     tt = tt.text
#     print("tt",tt)

    
# store_name_element = driver.find_element(By.XPATH,'//td[contains(@class, "title") and text()="店名"]/following-sibling::td/span')

# element_text = address.text
# print("element_text",element_text)

# 匯入SQL

# group_id = ""
# store_name = "丹丹漢堡-華夏店"
# store_address = "高雄市左營區至真路546號"
# store_phone_number = "07-345-5969"
# store_type = "小吃"
# store_delivery_condition = "需滿1000元以上才可外送"
# store_note = ""
# join_time = ""
# store_open_time = ""

menu_items = [{
        "menu_type":"精緻定食餐-均附二十飲品(請在備註寫上飲料)",
        "menu_name":"4.五榖瘦肉粥+炸雞",
        "menu_size":"",
        "menu_price":94
    },{
        "menu_type":"精緻定食餐-均附二十飲品(請在備註寫上飲料)",
        "menu_name":"5.雞腿堡+玉米濃湯",
        "menu_size":"原味",
        "menu_price":88
    },{
        "menu_type":"精緻定食餐-均附二十飲品(請在備註寫上飲料)",
        "menu_name":"5.雞腿堡+玉米濃湯",
        "menu_size":"辣味",
        "menu_price":88
    }]

# group_id = ""
# store_id = ""
# menu_name = ""
# menu_size = ""
# menu_type = ""
# menu_price = ""
# menu_note = ""
# menu_status = ""


# # INNER INTO store
# group_id = ""
# store_name = ""
# store_address = ""
# store_phone_number = ""
# store_type = ""
# store_open_time = ""
# store_delivery_condition = ""
# store_note = ""
# join_time = ""

# store_status = "alive"
# store_order_time = ""
# store_order_frequence = ""
# store_distance = ""
# store_price_range = ""
# store_latest_data = ""

# # INNER INTO menu
# group_id = ""
# store_id = ""
# menu_name = ""
# menu_size = ""
# menu_type = ""
# menu_price = ""
# menu_note = ""
# menu_status = ""


