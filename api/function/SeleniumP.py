from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.chrome.options import Options

import os
import sys

chromedriver_path = "/Users/sc/Documents/100_Work/140_WeHelp/Food_chosen/chromedriver"
os.environ["PATH"] += os.pathsep + chromedriver_path

chromedriver_path = "/Users/sc/Documents/100_Work/140_WeHelp/Food_chosen/chromedriver"
driver = webdriver.Chrome(executable_path=chromedriver_path)
driver.maximize_window()
# driver.get("https://en.cloverworks.co.jp/")
# # tag = driver.find_element(By.CLASS_NAME,"tabpanel")
# # print(tag.text)
# link = driver.find_element(By.XPATH, "//a[@href='/news/']")
# link.click()




driver.get("https://dinbendon.net/do/idine")
link = driver.find_element(By.XPATH, "//span[text()='找一下']")
link.click()

# driver.get("https://dinbendon.net/do/idine")
input_field = driver.find_element(By.ID, "navigation_panel_form_term")
input_field.send_keys("指定資訊")
# print(driver.page_source)
# driver.save_screenshot("test.png")
# driver.close()
