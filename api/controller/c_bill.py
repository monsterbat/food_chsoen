from flask import *
import sys
sys.path.append('api/module')
import m_bill
sys.path.append('api/view')
import v_bill

c_bill = Blueprint(
    "c_bill",
    __name__,
    static_folder="static",
    static_url_path="/static",
)

@c_bill.route("/api/bill", methods=["POST", "GET", "PATCH", "PUT", "DELETE"])
def bill():
    if request.method == "POST":
        try:
            message = m_bill.bill_post()
            return message
        except Exception as ex:
            return jsonify(error="true", message=f"{ex}"), 500

    if request.method == "GET":
        try:
            page = int(request.args.get("page",0))
            keyword = request.args.get("keyword",False)
            urlGroupName = request.args.get("urlGroupName",False)
            message = m_bill.bill_get(page, keyword, urlGroupName)
            return message
        except Exception as ex:
            return jsonify(error="true", message=f"{ex}"), 500

    if request.method == "PATCH":
        try:
            message = m_bill.bill_patch()
            return message
        except Exception as ex:
            return jsonify(error="true", message=f"{ex}"), 500

    if request.method == "PUT":
        try:
            message = m_bill.bill_put()
            return message
        except Exception as ex:
            return jsonify(error="true", message=f"{ex}"), 500

    if request.method == "DELETE":
        try:
            message = m_bill.bill_delete()
            return message
        except Exception as ex:
            return jsonify(error="true", message=f"{ex}"), 500
        
@c_bill.route("/api/bill/reload", methods=["POST", "GET", "PATCH", "PUT", "DELETE"])
def bill_reload():
    if request.method == "POST":
        print("V#")
        try:
            message = m_bill.bill_reload_post()
            return message
        except Exception as ex:
            return jsonify(error="true", message=f"{ex}"), 500
        
