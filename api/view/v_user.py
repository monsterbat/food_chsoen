# import python function
from flask import *

# user_post
def user_post_200():
    data=jsonify({"ok":True})
    return data

def user_post_400():
    errorr_message = jsonify({
            "error": True,
            "message": "已使用過該信箱註冊"
        })
    return errorr_message

# user_get
def user_get_403():
    errorr_message = jsonify({
            "error": True,
            "message": "no token"
        })
    return errorr_message

# user_patch
def user_patch_200():
    data=jsonify({"ok":True})
    return data

def group_patch_400_same_email():
    errorr_message = jsonify({
            "error": True,
            "message": "此信箱已存在"
        })
    return errorr_message

def user_patch_400_same_pw():
    errorr_message = jsonify({
            "error": True,
            "message": "輸入相同密碼"
        })
    return errorr_message

def user_patch_400_empty_pw():
    errorr_message = jsonify({
            "error": True,
            "message": "輸入相同密碼"
        })
    return errorr_message

def user_patch_400_else():
    errorr_message = jsonify({
            "error": True,
            "message": "未知錯誤"
        })
    return errorr_message

# user_put
def user_put_200():
    data=jsonify({"ok":True})
    return data

def user_put_400_wrong_password():
    errorr_message = jsonify({
            "error": True,
            "message": "密碼錯誤"
        })
    return errorr_message

def user_put_400_empty_email():
    errorr_message = jsonify({
            "error": True,
            "message": "無此用戶"
        })
    return errorr_message

# user_delete
def user_delete_200():
    data=jsonify({"ok":True})
    return data
