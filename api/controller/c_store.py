from flask import *
import sys
sys.path.append('api/module')
import m_store
sys.path.append('api/view')
import v_store

c_store = Blueprint(
    "c_store",
    __name__,
    static_folder="static",
    static_url_path="/static",
)

@c_store.route("/api/store", methods=["POST", "GET", "PATCH"])
def store():
    if request.method == "POST":
        try:
            message = m_store.store_post()
            return message
        except Exception as ex:
            return jsonify(error="true", message=f"{ex}"), 500

    if request.method == "GET":
        try:
            page = int(request.args.get("page",0))
            keyword = request.args.get("keyword",False)
            urlGroupName = request.args.get("urlGroupName",False)
            message = m_store.store_get(page,keyword,urlGroupName)
            return message
        except Exception as ex:
            return jsonify(error="true", message=f"{ex}"), 500

    if request.method == "PATCH":
        try:
            message = m_store.store_patch()
            return message
        except Exception as ex:
            return jsonify(error="true", message=f"{ex}"), 500
        
@c_store.route("/api/store/drawLots", methods=["POST", "GET", "PATCH"])
def store_drawLots():
    if request.method == "GET":
        try:
            page = int(request.args.get("page",0))
            keyword = request.args.get("keyword",False)
            urlGroupName = request.args.get("urlGroupName",False)
            message = m_store.store_drawLots_get(page,keyword,urlGroupName)
            return message
        except Exception as ex:
            return jsonify(error="true", message=f"{ex}"), 500
        
@c_store.route("/api/store/type", methods=["POST", "GET", "PATCH"])
def store_type():
    if request.method == "GET":
        try:
            page = int(request.args.get("page",0))
            keyword = request.args.get("keyword",False)
            urlGroupName = request.args.get("urlGroupName",False)
            message = m_store.store_type_get(page,keyword,urlGroupName)
            return message
        except Exception as ex:
            return jsonify(error="true", message=f"{ex}"), 500