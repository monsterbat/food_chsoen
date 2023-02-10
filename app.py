# import project function
import sys
sys.path.append('api/function')

from flask import *
from flask_cors import CORS

# url chinese ability
import urllib.parse


import api.controller.c_group as c_group
import api.controller.c_user as c_user
import api.controller.c_order_list as c_order_list
import api.controller.c_store as c_store
import api.controller.c_menu as c_menu
import api.controller.c_order as c_order
import api.controller.c_reload as c_reload
import api.controller.c_bill as c_bill


app=Flask(
	__name__,
	static_folder="static",
    static_url_path="/static"
)
CORS(app)

app.register_blueprint(c_group.c_group)
app.register_blueprint(c_user.c_user)
app.register_blueprint(c_order_list.c_order_list)
app.register_blueprint(c_store.c_store)
app.register_blueprint(c_menu.c_menu)
app.register_blueprint(c_order.c_order)
app.register_blueprint(c_reload.c_reload)
app.register_blueprint(c_bill.c_bill)

print()

# Pages
@app.route("/")
def index():
	return render_template("index.html")
@app.route("/group")
def group():
	return render_template("group.html")

@app.route("/group/<group_name>")
def in_group(group_name):
	return render_template("group_into.html")

@app.route("/group/<group_name>/create_order")
def create_order(group_name):
	print("create_order")
	return render_template("create_order.html")

@app.route("/group/<group_name>/create_store")
def create_store(group_name):
	print("create_store")
	return render_template("create_store.html")

@app.route("/group/<group_name>/<store_name>")
def create_menu(group_name,store_name):
	print("create_menu",group_name)
	return render_template("create_menu.html")

@app.route("/group/<group_name>/<store_name>/order_edit")
def create_menu_order_edit(group_name,store_name):
	print("create_menu",group_name)
	return render_template("create_menu.html")

@app.route("/group/<group_name>/<store_name>/<stop_time>")
def order_menu(group_name,store_name,stop_time):
	print("order_menu",group_name)
	return render_template("order_menu.html")

@app.route("/group/dd")
def test():
	return render_template("menu.html")

app.debug = True
app.run(host = "0.0.0.0",port=3000)