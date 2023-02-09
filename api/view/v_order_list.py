# import python function
from flask import *

# order_list_post
def order_list_post_200():
    data=jsonify({"ok":True})
    return data, 200

def order_list_post_400():
    errorr_message = jsonify({
            "error": True,
            "message": "此菜單重複匯入"
        })
    return errorr_message, 400

# order_list_get
def order_list_get_403():
    errorr_message = jsonify({
            "error": True, 
            "message": "no token"
        })
    return errorr_message, 403

# order_list_patch
def order_list_patch_200():
    data=jsonify({"ok":True})
    return data, 200

def order_list_patch_400_same_name():
    errorr_message = jsonify({
            "error": True,
            "message": "餐點重複"
        })
    return errorr_message, 400

def order_list_patch_400_size_name():
    errorr_message = jsonify({
            "error": True,
            "message": "大小重複"
        })
    return errorr_message, 400

def order_list_patch_400_else():
    errorr_message = jsonify({
            "error": True,
            "message": "未知錯誤"
        })
    return errorr_message, 400

