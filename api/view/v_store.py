# import python function
from flask import *

# store_post
def store_post_200():
    data=jsonify({"ok":True})
    return data, 200

def store_post_400():
    errorr_message = jsonify({
            "error": True,
            "message": "已使用過該信箱註冊"
        })
    return errorr_message, 400

# store_get
def store_get_403():
    errorr_message = jsonify({
            "error": True, 
            "message": "no token"
        })
    return errorr_message, 403

# store_patch
def store_patch_200():
    data=jsonify({"ok":True})
    return data, 200

def store_patch_400_else():
    errorr_message = jsonify({
            "error": True,
            "message": "未知錯誤"
        })
    return errorr_message, 400

