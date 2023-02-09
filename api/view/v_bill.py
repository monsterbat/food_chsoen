# import python function
from flask import *

# bill_post
def bill_post_200():
    data=jsonify({"ok":True})
    return data, 200

# bill_get
def bill_get_403():
    errorr_message = jsonify({
            "error": True,
            "message": "no token"
        })
    return errorr_message, 403

# bill_patch
def bill_patch_200():
    data=jsonify({"ok":True})
    return data, 200

def group_patch_400_same_email():
    errorr_message = jsonify({
            "error": True,
            "message": "此信箱已存在"
        })
    return errorr_message, 400

def bill_patch_400_same_pw():
    errorr_message = jsonify({
            "error": True,
            "message": "輸入相同密碼"
        })
    return errorr_message, 400

def bill_patch_400_empty_pw():
    errorr_message = jsonify({
            "error": True,
            "message": "輸入相同密碼"
        })
    return errorr_message, 400

def bill_patch_400_else():
    errorr_message = jsonify({
            "error": True,
            "message": "未知錯誤"
        })
    return errorr_message, 400

# bill_put
def bill_put_200():
    data=jsonify({"ok":True})
    return data, 200

def bill_put_400_wrong_password():
    errorr_message = jsonify({
            "error": True,
            "message": "密碼錯誤"
        })
    return errorr_message, 400

def bill_put_400_empty_email():
    errorr_message = jsonify({
            "error": True,
            "message": "無此用戶"
        })
    return errorr_message, 400

# bill_delete
def bill_delete_200():
    data=jsonify({"ok":True})
    return data, 200
