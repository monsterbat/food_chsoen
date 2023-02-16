from flask import *
import sys
sys.path.append('api/module')
import m_order
sys.path.append('api/view')
import v_order

c_order = Blueprint(
    "c_order",
    __name__,
    static_folder="static",
    static_url_path="/static",
)

@c_order.route("/api/order", methods=["POST", "GET", "PATCH", "PUT", "DELETE"])
def order():
    if request.method == "POST":
        try:
            message = m_order.order_post()
            return message
        except Exception as ex:
            return jsonify(error="true", message=f"{ex}"), 500

    if request.method == "GET":
        try:
            page = int(request.args.get("page",0))
            keyword = request.args.get("keyword",False)
            orderListId = request.args.get("orderListId",False)
            message = m_order.order_get(page,keyword,orderListId)
            return message
        except Exception as ex:
            return jsonify(error="true", message=f"{ex}"), 500

    if request.method == "PATCH":
        try:
            message = m_order.order_patch()
            return message
        except Exception as ex:
            return jsonify(error="true", message=f"{ex}"), 500

    if request.method == "PUT":
        try:
            message = m_order.order_put()
            return message
        except Exception as ex:
            return jsonify(error="true", message=f"{ex}"), 500

    if request.method == "DELETE":
        try:
            message = m_order.order_delete()
            return message
        except Exception as ex:
            return jsonify(error="true", message=f"{ex}"), 500
        
@c_order.route("/api/order/user", methods=["POST", "GET", "PATCH", "PUT", "DELETE"])
def order_user():
    if request.method == "GET":
        try:
            page = int(request.args.get("page",0))
            keyword = request.args.get("keyword",False)
            getStatus = request.args.get("getStatus",False)
            message = m_order.order_user_get(page,keyword,getStatus)
            return message
        except Exception as ex:
            return jsonify(error="true", message=f"{ex}"), 500