# selenium
from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.chrome.service import Service
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from selenium.webdriver.chrome.options import Options
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

# Use key to Get store 
def store_keyword_get_correspond_name(store_name_keyword):
    # Step 1, use selenium to find the url
    # 1 驅動路徑
    chromedriver_path = "./chromedriver"

    # 2 視窗顯示
    # 不顯示瀏覽器
    chrome_options = Options()
    chrome_options.add_argument('--headless')
    driver = webdriver.Chrome(service=Service(executable_path=chromedriver_path), options=chrome_options)

    # # 顯示瀏覽器
    # driver = webdriver.Chrome(service=Service(executable_path=chromedriver_path))
    # driver.maximize_window()

    # 3 進入網頁並點擊
    driver.get("https://dinbendon.net/do/idine")
    link = driver.find_element(By.XPATH, "//span[text()='找一下']")
    link.click()
    # 4 點擊後輸入值
    wait = WebDriverWait(driver, 10)
    input_field = wait.until(EC.visibility_of_element_located((By.ID, "navigation_panel_form_term")))
    input_field.send_keys(store_name_keyword)

    search_store = driver.find_element(By.ID, "navigation_panel_form_search")
    search_store.click()

    elements = wait.until(EC.presence_of_all_elements_located((By.CSS_SELECTOR, "[id*='navigation_panel_resultBox_shops_']")))
    name_text_all = []
    name_index = 0
    for element in elements:
        name_element = element.find_element(By.CLASS_NAME, "name")
        name_text = name_element.find_element(By.TAG_NAME, "span").text
        store_data = {
            "storeIndex":name_index,
            "storeName":name_text
        }
        name_text_all = name_text_all+[store_data]
        name_index+=1
    driver.quit()
    return name_text_all

def store_name_create_menu(store_name_keyword,box_index,group_id):
    # =========================================================================================================
    # Step 1, use selenium to find the url
    # 1 驅動路徑
    chromedriver_path = "./chromedriver"

    # 2 視窗顯示
    # 不顯示瀏覽器
    chrome_options = Options()
    chrome_options.add_argument('--headless')
    driver = webdriver.Chrome(service=Service(executable_path=chromedriver_path), options=chrome_options)

    # # 顯示瀏覽器
    # driver = webdriver.Chrome(service=Service(executable_path=chromedriver_path))
    # driver.maximize_window()

    # 3 進入網頁並點擊
    driver.get("https://dinbendon.net/do/idine")
    link = driver.find_element(By.XPATH, "//span[text()='找一下']")
    link.click()
    # 4 點擊後輸入值
    wait = WebDriverWait(driver, 20)
    input_field = wait.until(EC.visibility_of_element_located((By.ID, "navigation_panel_form_term")))
    input_field.send_keys(store_name_keyword)

    search_store = driver.find_element(By.ID, "navigation_panel_form_search")
    search_store.click()

    navigation_panel_resultBox_shops = "navigation_panel_resultBox_shops_"+str(box_index)
    decide_store = wait.until(EC.visibility_of_element_located((By.ID, navigation_panel_resultBox_shops)))
    decide_store.click()
    # 找到店家
    goto_store = driver.find_element(By.XPATH, "//span[text()='導覽']")
    goto_store.click()

    # # 5 Click href to get url
    time.sleep(0.5)
    click_to_url = wait.until(EC.visibility_of_element_located((By.XPATH,'//div[contains(@class, "actions")]/div')))
    print("click_to_url",click_to_url)
    click_to_url.click()
    time.sleep(0.5)
    target_store_url = driver.current_url
    
    #=========================================================================================================

    # With URL use Request
    # build a request object, addition Requrest Header information
    request=req.Request(target_store_url, headers={
        "cookie":"over18=1", # add cookie for Gossip oyther don't need
        "User-Agent":"Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/105.0.0.0 Safari/537.36" # add Agent
    })
    with req.urlopen(request) as response:
        data=response.read().decode("utf-8")
    
    print("Check2")
    # 2. analysis data
    root=bs4.BeautifulSoup(data, "html.parser")
    store_info_all = root.find("table", {"id": "property"})
    print("Check3")
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
    print("Check4")
    # #=========================================================================================================

    # Check store repeat
    store_name_check = sql_check_store_repreat(store_name,group_id,"alive")   
    if store_name_check != []:
        errorr_message = {
            "error":True,
            "message":"重複建立店家"
            }
        return errorr_message

    # INNER information 

   
    sql_store_inner_into(store_name, store_address, store_phone_number, store_type, store_open_time, store_delivery_condition, "alive",group_id,store_note, "", "", "", "", join_time)

    # #=========================================================================================================
    print("Check5")
    menu_fail_items = []
    menu_table_all = root.find_all("table", {"style": "margin-bottom: 0.5em;"})
    for menu_table in menu_table_all:
        menu_list = menu_table.find_all("tr")
        print(len(menu_list))
        if menu_table.find_all("tr")[0] == menu_table.find("tr", {"class": "even"}) or menu_table.find_all("tr")[0] == menu_table.find("tr", {"class": "odd"}):
            print("withOut type")
            menu_type = ""
            count_menu_value=0
        else:
            print("with type")
            menu_type = menu_list[0].find("td", {"class": "categoryHeader"}).span.text
            count_menu_value=1

        tttt=0
        tttt=+1
        print("CheckTTTT",tttt)
        while count_menu_value<len(menu_list):
            tttt=+1
            print("CheckTTTT",tttt)
            print("check6")
            name_cell = menu_list[count_menu_value].find("td", {"style": "width: 10em;"})
            menu_name = name_cell.div.text.strip()
            price_cell = menu_list[count_menu_value].find("td", {"style": "width: 20em;"})
            price_cell_lenth = len(price_cell.find_all("span", {"style": "white-space: nowrap;"}))
            menu_size = ""
            menu_note = ""
            if price_cell_lenth == 1:
                tttt=+1
                print("CheckTTTT",tttt)
                try:
                    tttt=+1
                    print("CheckTTTT",tttt)
                    print("check7",)
                    price_cell = price_cell.span.text
                    
                    menu_note = ""
                    tttt=+1
                    print("CheckTTTT",tttt)
                    print("len",len(price_cell.split(" ")))
                    if len(price_cell.split(" ")) > 1:
                        print("check7.1")
                        menu_size = price_cell.rsplit(" ",1)[0]
                        menu_price = float(price_cell.split(" ")[-1])
                    else:
                        tttt=+1
                        print("CheckTTTT",tttt)
                        print("check7.2",price_cell)
                        menu_price = float(price_cell)
                    print("menu_price",menu_price)

                    if menu_price == 0:
                        tttt=+1
                        print("CheckTTTT",tttt)
                        count_menu_value+=1
                        print("menu_name price=0",menu_name)
                        break
                    tttt=+1
                    print("CheckTTTT",tttt)
                    print("menu_name,menu_size,menu_type",menu_name,menu_size,menu_type)
                    # 
                    sql_result = menu_info_crawler_to_sql(store_name,group_id,menu_name,menu_size,menu_type,menu_price,menu_note)
                    print("sql_result",sql_result)
                    tttt=+1
                    print("CheckTTTT",tttt)
                    try:
                        tttt=+1
                        print("CheckTTTT",tttt)
                        if sql_result["error"] == True:
                                menu_fail_item = sql_result["message"]
                                menu_fail_items = menu_fail_items + [menu_fail_item]
                    except:
                        break
                except:
                    menu_fail_item = {
                        menu_type+" "+menu_name+" "+menu_size+" "+"建立失敗"
                    }
                    menu_fail_items = menu_fail_items +[menu_fail_item]

            if price_cell_lenth > 1:
                menu_muti_list = price_cell.find_all("span", {"style": "white-space: nowrap;"})
                try:
                    for menu_muti in menu_muti_list:
                        menu_muti_date = menu_muti.text
                        menu_size = menu_muti_date.rsplit(" ",1)[0]
                        menu_price = float(menu_muti_date.split(" ")[-1])
                        if menu_price == 0:
                            count_menu_value+=1
                            break
                        menu_note = ""
                        print("menu_name,menu_size,menu_type",menu_name,menu_size,menu_type)
                        # 
                        sql_result = menu_info_crawler_to_sql(store_name,group_id,menu_name,menu_size,menu_type,menu_price,menu_note)
                        try:
                            if sql_result["error"] == True:
                                menu_fail_item = sql_result["message"]
                                menu_fail_items = menu_fail_items + [menu_fail_item]
                        except:
                            break
                except:
                    menu_fail_item = {
                        menu_type+" "+menu_name+" "+menu_size+" "+"建立失敗"
                    }
                    menu_fail_items = menu_fail_items +[menu_fail_item]
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


def parse_input(s):
    words = s.split()  # 将字符串按空格分割成单词
    result_str = ''
    result_num = None
    
    for word in words:
        if word.isnumeric():
            # 如果单词是数字，则直接将其转换为整数
            result_num = int(word)
        else:
            # 如果单词不是数字，则将其添加到字符串结果中
            result_str += word + ' '
    
    if result_num is None:
        # 如果没有数字，则返回所有单词组成的字符串
        return result_str.strip()
    else:
        # 如果有数字，则返回最后一个数字及其之前的所有单词组成的字符串
        return result_str.strip(), result_num
