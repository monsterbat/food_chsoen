from flask import *
import sys
sys.path.append('api/module')
import m_order_list
sys.path.append('api/view')
import v_order_list

c_order_list = Blueprint(
    "c_order_list",
    __name__,
    static_folder="static",
    static_url_path="/static",
)

@c_order_list.route("/api/order_list", methods=["POST", "GET", "PATCH"])
def order_list():
    if request.method == "POST":
        try:
            message = m_order_list.order_list_post()
            return message
        except Exception as ex:
            return jsonify(error="true", message=f"{ex}"), 500

    if request.method == "GET":
        try:
            page = int(request.args.get("page",0))
            keyword = request.args.get("keyword",False)
            urlGroupName = request.args.get("urlGroupName",False)
            urlStoreName = request.args.get("urlStoreName",False)
            urlStopTime = request.args.get("urlStopTime",False)
            getStatus = request.args.get("getStatus",False)
            message = m_order_list.order_list_get(page, keyword,urlGroupName,urlStoreName,urlStopTime,getStatus)
            return message
        except Exception as ex:
            return jsonify(error="true", message=f"{ex}"), 500

    if request.method == "PATCH":
        try:
            message = m_order_list.order_list_patch()
            return message
        except Exception as ex:
            return jsonify(error="true", message=f"{ex}"), 500


@c_order_list.route("/api/order_list/history", methods=["POST", "GET", "PATCH"])
def order_list_history():
    if request.method == "POST":
        try:
            message = m_order_list.order_list_post()
            return message
        except Exception as ex:
            return jsonify(error="true", message=f"{ex}"), 500

    if request.method == "GET":
        try:
            page = int(request.args.get("page",0))
            keyword = request.args.get("keyword",False)
            urlGroupName = request.args.get("urlGroupName",False)
            urlStoreName = request.args.get("urlStoreName",False)
            urlStopTime = request.args.get("urlStopTime",False)
            getStatus = request.args.get("getStatus",False)
            message = m_order_list.order_list_history_get(page, keyword,urlGroupName,urlStoreName,urlStopTime,getStatus)
            return message
        except Exception as ex:
            return jsonify(error="true", message=f"{ex}"), 500