import requests
import numpy as np
import pandas as pd

from bs4 import BeautifulSoup


infoDic = {"학사":[],"장학":[],"행사":[],"채용/취업":[],"일반/봉사":[]}
idx = ["학사","장학","행사","채용/취업","일반/봉사"]
filename ='/home/pbl/bot-server/onyu-server/web-server/web-server/data/info.csv'

url = "https://www.swu.ac.kr/index.do"

r = requests.get(url).text
html = BeautifulSoup(r,"html.parser")
selectedHtml = (html.find_all("div","board_tab_child")).__str__()
selectedHtml = BeautifulSoup(selectedHtml,"html.parser")
##print(selectedHtml)
num = 0
tmp_list = []
id= 0



for selected in selectedHtml.find_all("a"):
    print(num,":",selected)

    tmp_list.append(selected.string.replace('\ufeff',''))
    num+=1
    if(num==8):
        infoDic[idx[id]] = tmp_list
        tmp_list =[]
        id+=1
        num=0


print('실행됨')

df = pd.DataFrame(infoDic)
df.to_csv(filename,index=False)
print(df)









