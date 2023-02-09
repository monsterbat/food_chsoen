from flask import *
import sys
sys.path.append('api/module')
import m_reload
sys.path.append('api/view')
import v_reload

c_reload = Blueprint(
    "c_reload",
    __name__,
    static_folder="static",
    static_url_path="/static",
)

@c_reload.route("/api/reload", methods=["POST", "GET", "PATCH", "PUT", "DELETE"])
def reload():
    if request.method == "POST":
        try:
            message = m_reload.reload_post()
            return message
        except Exception as ex:
            return jsonify(error="true", message=f"{ex}"), 500

    if request.method == "GET":
        try:
            message = m_reload.reload_get()
            return message
        except Exception as ex:
            return jsonify(error="true", message=f"{ex}"), 500

    if request.method == "PATCH":
        try:
            message = m_reload.reload_patch()
            return message
        except Exception as ex:
            return jsonify(error="true", message=f"{ex}"), 500

    if request.method == "PUT":
        try:
            message = m_reload.reload_put()
            return message
        except Exception as ex:
            return jsonify(error="true", message=f"{ex}"), 500

    if request.method == "DELETE":
        try:
            message = m_reload.reload_delete()
            return message
        except Exception as ex:
            return jsonify(error="true", message=f"{ex}"), 500