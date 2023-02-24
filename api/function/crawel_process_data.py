# selenium
from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.chrome.service import Service
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
# system
import os
import sys
# request
import ssl
ssl._create_default_https_context=ssl._create_unverified_context
import urllib.request as req
import bs4
# 
sys.path.append('api/function/sql_command')
from sql_command.sql_user_info import *
from sql_command.sql_group_info import *
from sql_command.sql_order_info import *
from sql_command.sql_order_list_info import *
from sql_command.sql_store_info import *
from sql_command.sql_menu_info import *
from sql_command.sql_bill_info import *

# import python function
from flask import *
import datetime


def getData(store_name_keyword,group_id,):
    # # =========================================================================================================
    # # Step 1, use selenium to find the url
    # # 1 驅動路徑
    # chromedriver_path = "/Users/sc/Documents/100_Work/140_WeHelp/Food_chosen/chromedriver"

    # # 2 視窗顯示
    # # # 不顯示瀏覽器
    # # chrome_options = Options()
    # # chrome_options.add_argument('--headless')
    # # driver = webdriver.Chrome(service=Service(executable_path=chromedriver_path), options=chrome_options)

    # # 顯示瀏覽器
    # driver = webdriver.Chrome(service=Service(executable_path=chromedriver_path))
    # driver.maximize_window()

    # # 3 進入網頁並點擊
    # driver.get("https://dinbendon.net/do/idine")
    # link = driver.find_element(By.XPATH, "//span[text()='找一下']")
    # link.click()
    # # 4 點擊後輸入值
    # wait = WebDriverWait(driver, 10)
    # input_field = wait.until(EC.visibility_of_element_located((By.ID, "navigation_panel_form_term")))

    # print("input_field", input_field)
    # input_field.send_keys("丹丹漢堡")

    # search_store = driver.find_element(By.ID, "navigation_panel_form_search")
    # search_store.click()

    # decide_store = wait.until(EC.visibility_of_element_located((By.ID, "navigation_panel_resultBox_shops_3")))
    # decide_store.click()
    # # 找到店家
    # goto_store = driver.find_element(By.XPATH, "//span[text()='導覽']")
    # goto_store.click()

    # # goto_store = wait.until(EC.visibility_of_element_located((By.XPATH, '//a[contains(@href,"/do/idine?shop=")]')))
    # # store_link = goto_store.get_attribute('href')
    # # driver.get(store_link)

    # # 4.5 Click href to get url
    # click_to_url = wait.until(EC.visibility_of_element_located((By.XPATH,'//div[contains(@class, "actions")]/div')))
    # click_to_url.click()
    # target_store_url = driver.current_url
    # #=========================================================================================================

    target_store_url = "https://dinbendon.net/do/idine?shop=469632"
    # With URL use Request
    # build a request object, addition Requrest Header information
    request=req.Request(target_store_url, headers={
        "cookie":"over18=1", # add cookie for Gossip oyther don't need
        "User-Agent":"Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/105.0.0.0 Safari/537.36" # add Agent
    })
    with req.urlopen(request) as response:
        data=response.read().decode("utf-8")
    

    # 2. analysis data
    root=bs4.BeautifulSoup(data, "html.parser")
    # print("data",root.title)
    # menu_list=root.find_all("div", style_="margin-bottom: 0.5em;")
    # menu_list_all=[]    
    # for menu in menu_list:
    #     menu_list_all=menu_list_all+[menu.tbody]
    # print("menu_list_all",menu_list_all)

    store_info_all = root.find("table", {"id": "property"})
    # store info
    store_name = store_info_all.find_all("tr")[1].find("td", {"class": "content"}).span.text
    store_address = store_info_all.find_all("tr")[4].find("td", {"class": "content"}).div.span.text
    store_phone_number = store_info_all.find_all("tr")[5].find("td", {"class": "content"}).text
    store_delivery_condition = store_info_all.find_all("tr")[9].find_all("td")[1].div.p.text
    store_type = store_info_all.find_all("tr")[10].find("td", {"class": "content"}).text
    store_open_time = ""
    store_note = ""
    join_time = datetime.datetime.now().strftime("%Y%m%d%H%M%S")

    store_info_into_sql = {
        "group_id":group_id,
        "store_name":store_name,
        "store_address":store_address,
        "store_phone_number":store_phone_number,
        "store_delivery_condition":store_delivery_condition,
        "store_type":store_type,
        "store_open_time":"",
        "store_note":""
    }
    print("store_info_into_sql",store_info_into_sql)
    # #=========================================================================================================

    # # Check store repeat
    # store_name_check = sql_check_store_repreat(store_name,group_id,"alive")   
    # if store_name_check != []:
    #     errorr_message = {
    #         "error":True,
    #         "message":"重複建立店家"
    #         }
    #     return errorr_message

    # # INNER information 

   
    # sql_store_inner_into(store_name, store_address, store_phone_number, store_type, store_open_time, store_delivery_condition, "alive",group_id,store_note, "", "", "", "", join_time)

    # #=========================================================================================================

    menu_fail_items = []
    menu_table_all = root.find_all("table", {"style": "margin-bottom: 0.5em;"})
    print(menu_table_all)
    for menu_table in menu_table_all:
        menu_list = menu_table.find_all("tr")
        # print(table.find_all("tr"))
        menu_type = menu_list[0].find("td", {"class": "categoryHeader"}).span.text
        count_menu_value=1
        print(menu_type)
        while count_menu_value<len(menu_list):
            name_cell = menu_list[count_menu_value].find("td", {"style": "width: 10em;"})
            menu_name = name_cell.div.text.strip()
            print("menu_name",menu_name)
            price_cell = menu_list[count_menu_value].find("td", {"style": "width: 20em;"})
            price_cell_lenth = len(price_cell.find_all("span", {"style": "white-space: nowrap;"}))
            if price_cell_lenth == 1:
                menu_price = int(price_cell.span.text)
                menu_size = ""
                menu_note = ""
                sql_result = menu_info_crawler_to_sql(store_name,group_id,menu_name,menu_size,menu_type,menu_price,menu_note)
                if sql_result["error"] == True:
                        print("sql_result",sql_result["error"])
                        menu_fail_item = sql_result["message"]
                        print("menu_fail_item",menu_fail_item)
                        menu_fail_items = menu_fail_items + [menu_fail_item]

            if price_cell_lenth > 1:
                menu_muti_list = price_cell.find_all("span", {"style": "white-space: nowrap;"})
                for menu_muti in menu_muti_list:
                    menu_muti_date = menu_muti.text
                    menu_size = menu_muti_date.rsplit(" ",1)[0]
                    menu_price = menu_muti_date.split(" ")[-1]
                    menu_note = ""
                    sql_result = menu_info_crawler_to_sql(store_name,group_id,menu_name,menu_size,menu_type,menu_price,menu_note)
                    if sql_result["error"] == True:
                        menu_fail_item = sql_result["message"]
                        print("menu_fail_item",menu_fail_item)
                        menu_fail_items = menu_fail_items + [menu_fail_item]
                        
            count_menu_value+=1

    result_data = {
        "ok":True,
        "menu_fail_items":menu_fail_items
    }
    print("result_data",result_data)
    return result_data


def menu_info_crawler_to_sql(store_name,group_id,menu_name,menu_size,menu_type,menu_price,menu_note):
    menu_status = "alive"
    # Use store_name find store id
    store_id = sql_store_name_find_id(store_name,group_id,menu_status)
    # Check menu repeat
    menu_name_check = sql_menu_name_and_size_check_repeat(group_id,store_id,menu_name,menu_size,menu_status)
    # If no repeat save it
    if menu_name_check == []:
        sql_insert_into_menu(group_id, store_id,menu_name, menu_size, menu_type,menu_price,menu_note,menu_status)
        data = {"ok":True}
        return data
    if menu_name_check != []:
        errorr_message = {
        "error":True,
        "message":menu_type+" "+menu_name+" "+menu_size+" "+"重複建立"
        }
        return errorr_message
        # Input information 
    



target_store_url = "https://dinbendon.net/do/idine?shop=469632"
getData(target_store_url,21)