# import python function
from flask import *

# menu_post
def menu_post_200():
    data=jsonify({"ok":True})
    return data, 200

def menu_post_400():
    errorr_message = jsonify({
            "error": True,
            "message": "此菜單重複匯入"
        })
    return errorr_message, 400

# menu_get
def menu_get_403():
    errorr_message = jsonify({
            "error": True, 
            "message": "no token"
        })
    return errorr_message, 403

# menu_patch
def menu_patch_200():
    data=jsonify({"ok":True})
    return data, 200

def menu_patch_400_same_name():
    errorr_message = jsonify({
            "error": True,
            "message": "餐點及大小重複"
        })
    return errorr_message, 400

def menu_patch_400_else():
    errorr_message = jsonify({
            "error": True,
            "message": "未變更"
        })
    return errorr_message, 400

