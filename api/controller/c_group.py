from flask import *
import sys
sys.path.append('api/module')
import m_group 
sys.path.append('api/view')
import v_group

c_group = Blueprint(
    "c_group",
    __name__,
    static_folder="static",
    static_url_path="/static",
)

@c_group.route("/api/group", methods=["POST", "GET", "PATCH", "PUT", "DELETE"])
def group():
    if request.method == "POST":
        try:
            message = m_group.group_post()
            return message
        except Exception as ex:
            return jsonify(error="true", message=f"{ex}"), 500

    if request.method == "GET":
        try:
            page = int(request.args.get("page",0))
            keyword = request.args.get("keyword",False)
            message = m_group.group_get(page,keyword)
            return message
        except Exception as ex:
            return jsonify(error="true", message=f"{ex}"), 500

    if request.method == "PATCH":
        try:
            message = m_group.group_patch()
            return message
        except Exception as ex:
            return jsonify(error="true", message=f"{ex}"), 500

    if request.method == "PUT":
        try:
            message = m_group.group_put()
            return message
        except Exception as ex:
            return jsonify(error="true", message=f"{ex}"), 500

    if request.method == "DELETE":
        try:
            message = m_group.group_delete()
            return message
        except Exception as ex:
            return jsonify(error="true", message=f"{ex}"), 500
        

@c_group.route("/api/group/info", methods=["POST", "GET", "PATCH", "PUT", "DELETE"])
def group_info():
    if request.method == "GET":
        try:
            page = int(request.args.get("page",0))
            keyword = request.args.get("keyword",False)
            urlGroupName = request.args.get("urlGroupName",False)
            getStatus = request.args.get("getStatus",False)
            message = m_group.group_get_info(page,keyword,urlGroupName,getStatus)
            return message
        except Exception as ex:
            return jsonify(error="true", message=f"{ex}"), 500
        
@c_group.route("/api/group/user", methods=["POST", "GET", "PATCH", "PUT", "DELETE"])
def group_user():
    if request.method == "GET":
        try:
            page = int(request.args.get("page",0))
            keyword = request.args.get("keyword",False)
            urlGroupName = request.args.get("urlGroupName",False)
            message = m_group.group_get_user(page,keyword,urlGroupName)
            return message
        except Exception as ex:
            return jsonify(error="true", message=f"{ex}"), 500
        
@c_group.route("/api/group/manager", methods=["POST", "GET", "PATCH", "PUT", "DELETE"])
def group_manager():
    if request.method == "PATCH":
        try:
            message = m_group.group_manager_patch()
            return message
        except Exception as ex:
            return jsonify(error="true", message=f"{ex}"), 500   
        
@c_group.route("/api/group/check", methods=["POST", "GET", "PATCH", "PUT", "DELETE"])
def group_check():
    if request.method == "POST":
        try:
            message = m_group.group_check_post()
            return message
        except Exception as ex:
            return jsonify(error="true", message=f"{ex}"), 500