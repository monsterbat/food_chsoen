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