# 1. capture the souce code
from distutils.file_util import move_file
import ssl
ssl._create_default_https_context=ssl._create_unverified_context

import urllib.request as req
import bs4
url1 = "https://dinbendon.net/do/idine?wicket%3ApageMapName=wicket-0&shop=500517"
url2 = "https://en.cloverworks.co.jp/"
url3 = "https://www.ptt.cc/bbs/LoL/index.html"
url4 = "https://www.google.com/search?gs_ssp=eJzj4tVP1zc0TM8wNkoxzktTYDRgdGDw4k7OyS9LLSrPL8ouBgCNQAmG&q=cloverworks&rlz=1C5CHFA_enTW986TW986&oq=cl&aqs=chrome.1.69i57j46i39i199i465j0i433i512j0i512j0i433i512j69i60l3.1440j0j7&sourceid=chrome&ie=UTF-8"
request3=req.Request(url1, headers={
    "cookie":"over18=1", # add cookie for Gossip oyther don't need
    "User-Agent":"Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/109.0.0.0 Safari/537.36" # add Agent
})
with req.urlopen(request3) as response:
    data=response.read().decode("utf-8")


root=bs4.BeautifulSoup(data, "html.parser")
title = root.find("td",class_="content ")
print(root)
# def getData(url):
#     # build a request object, addition Requrest Header information
#     request=req.Request(url, headers={
#         "cookie":"over18=1", # add cookie for Gossip oyther don't need
#         "User-Agent":"Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/105.0.0.0 Safari/537.36" # add Agent
#     })
#     with req.urlopen(request) as response:
#         data=response.read().decode("utf-8")

#     # 2. analysis data
#     import bs4
#     root=bs4.BeautifulSoup(data, "html.parser")
#     titles=root.find_all("div", class_="title")
#     movie_title=[]    
#     for title in titles:
#         if title.a !=None:
#             # print(title.a.string)
#             movie_title=movie_title+[title.a.string]

#     # 3. capture lots pages of web
#     nextLink=root.find("a", string="‹ 上頁") # find the <a> tag with 上頁
#     return [nextLink["href"],movie_title]

# # Choose which need analysis
# pageurl="https://www.ptt.cc/bbs/movie/index.html"
# movie_title_totle=[]

# # Choose data need analysis
# count=0
# while count<10:
#     pageurl="https://www.ptt.cc"+getData(pageurl)[0]
#     print("Loading page:",pageurl)
#     count+=1
#     movie_title_totle=movie_title_totle+getData(pageurl)[1]

# # Creat file and clean previous data
# with open("PTT Movie list.txt", "w",encoding="utf-8",newline='') as f:
#     f.write("")

# # Importing data
# for movie_title_filter in movie_title_totle:
#     if movie_title_filter.string[1:3]=="好雷":
#                 with open("PTT Movie list.txt", "a",encoding="utf-8",newline='') as f:
#                     f.write(str(movie_title_filter))
#                     f.write("\n")
# for movie_title_filter in movie_title_totle:
#     if movie_title_filter.string[1:3]=="普雷":
#             with open("PTT Movie list.txt", "a",encoding="utf-8",newline='') as f:
#                 f.write(str(movie_title_filter))
#                 f.write("\n")
# for movie_title_filter in movie_title_totle:                
#     if movie_title_filter.string[1:3]=="負雷":
#                 with open("PTT Movie list.txt", "a",encoding="utf-8",newline='') as f:
#                     f.write(str(movie_title_filter))
#                     f.write("\n")
# print("Finish!")