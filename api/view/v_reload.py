# import python function
from flask import *

# reload_post
def reload_post_200():
    data=jsonify({"ok":True})
    return data, 200

# reload_get
def reload_get_403():
    errorr_message = jsonify({
            "error": True,
            "message": "no token"
        })
    return errorr_message, 403

# reload_patch
def reload_patch_200():
    data=jsonify({"ok":True})
    return data, 200

def group_patch_400_same_email():
    errorr_message = jsonify({
            "error": True,
            "message": "此信箱已存在"
        })
    return errorr_message, 400

def reload_patch_400_same_pw():
    errorr_message = jsonify({
            "error": True,
            "message": "輸入相同密碼"
        })
    return errorr_message, 400

def reload_patch_400_empty_pw():
    errorr_message = jsonify({
            "error": True,
            "message": "輸入相同密碼"
        })
    return errorr_message, 400

def reload_patch_400_else():
    errorr_message = jsonify({
            "error": True,
            "message": "未知錯誤"
        })
    return errorr_message, 400

# reload_put
def reload_put_200():
    data=jsonify({"ok":True})
    return data, 200

def reload_put_400_wrong_password():
    errorr_message = jsonify({
            "error": True,
            "message": "密碼錯誤"
        })
    return errorr_message, 400

def reload_put_400_empty_email():
    errorr_message = jsonify({
            "error": True,
            "message": "無此用戶"
        })
    return errorr_message, 400

# reload_delete
def reload_delete_200():
    data=jsonify({"ok":True})
    return data, 200
