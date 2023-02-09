from flask import *
import sys
sys.path.append('api/module')
import m_menu
sys.path.append('api/view')
import v_menu

c_menu = Blueprint(
    "c_menu",
    __name__,
    static_folder="static",
    static_url_path="/static",
)

@c_menu.route("/api/menu", methods=["POST", "GET", "PATCH"])
def menu():
    if request.method == "POST":
        try:
            print("C0")
            message = m_menu.menu_post()
            return message
        except Exception as ex:
            return jsonify(error="true", message=f"{ex}"), 500

    if request.method == "GET":
        try:
            page = int(request.args.get("page",0))
            keyword = request.args.get("keyword",False)
            urlGroupName = request.args.get("urlGroupName",False)
            urlStoreName = request.args.get("urlStoreName",False)
            message = m_menu.menu_get(page, keyword, urlGroupName, urlStoreName)
            return message
        except Exception as ex:
            return jsonify(error="true", message=f"{ex}"), 500

    if request.method == "PATCH":
        try:
            message = m_menu.menu_patch()
            return message
        except Exception as ex:
            return jsonify(error="true", message=f"{ex}"), 500