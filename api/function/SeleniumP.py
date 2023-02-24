from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.chrome.options import Options

import os
import sys

# 1 驅動路徑
chromedriver_path = "/Users/sc/Documents/100_Work/140_WeHelp/Food_chosen/chromedriver"

# 2 視窗顯示
# # 不顯示瀏覽器
# chrome_options = Options()
# chrome_options.add_argument('--headless')
# driver = webdriver.Chrome(executable_path=chromedriver_path,options=chrome_options)

# 顯示瀏覽器
driver = webdriver.Chrome(executable_path=chromedriver_path)
driver.maximize_window()

# 3 進入網頁並點擊
driver.get("https://dinbendon.net/do/idine")
link = driver.find_element(By.XPATH, "//span[text()='找一下']")
link.click()

# 4 點擊後輸入值
input_field = driver.find_element(By.ID, "navigation_panel_form_term")
print("input_field",input_field)
input_field.send_keys("指定資訊") 
# print(driver.page_source)
# driver.save_screenshot("test.png")
# driver.close()
