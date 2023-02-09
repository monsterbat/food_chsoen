from flask import *
import sys
sys.path.append('api/module')
import m_user
sys.path.append('api/view')
import v_user

c_user = Blueprint(
    "c_user",
    __name__,
    static_folder="static",
    static_url_path="/static",
)

@c_user.route("/api/user", methods=["POST", "GET", "PATCH", "PUT", "DELETE"])
def user():
    if request.method == "POST":
        try:
            message = m_user.user_post()
            return message
        except Exception as ex:
            return jsonify(error="true", message=f"{ex}"), 500

    if request.method == "GET":
        try:
            message = m_user.user_get()
            return message
        except Exception as ex:
            return jsonify(error="true", message=f"{ex}"), 500

    if request.method == "PATCH":
        try:
            message = m_user.user_patch()
            return message
        except Exception as ex:
            return jsonify(error="true", message=f"{ex}"), 500

    if request.method == "PUT":
        try:
            message = m_user.user_put()
            return message
        except Exception as ex:
            return jsonify(error="true", message=f"{ex}"), 500

    if request.method == "DELETE":
        try:
            message = m_user.user_delete()
            return message
        except Exception as ex:
            return jsonify(error="true", message=f"{ex}"), 500