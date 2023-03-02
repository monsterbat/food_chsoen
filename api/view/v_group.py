# import python function
from flask import *

# group_post
def group_post_200():
    data=jsonify({"ok":True})
    return data, 200

def group_post_400():
    errorr_message = jsonify({
            "error": True,
            "message": "名字已經被取走了"
        })
    return errorr_message, 400

# group_get
def group_get_403():
    errorr_message = jsonify({
            "error": True,
            "message": "no token"
        })
    return errorr_message, 403

# group_patch
def group_patch_200():
    data=jsonify({"ok":True})
    return data, 200

def group_patch_400_same_name():
    errorr_message = jsonify({
            "error": True,
            "message": "此名稱已存在"
        })
    return errorr_message, 400

def group_patch_400_same_pw():
    errorr_message = jsonify({
            "error": True,
            "message": "輸入相同密碼"
        })
    return errorr_message, 400

def group_patch_400_wrong_pw():
    errorr_message = jsonify({
            "error": True,
            "message": "輸入錯誤密碼"
        })
    return errorr_message, 400

def group_patch_400_empty_pw():
    errorr_message = jsonify({
            "error": True,
            "message": "未輸入密碼"
        })
    return errorr_message, 400

def group_patch_400_else():
    errorr_message = jsonify({
            "error": True,
            "message": "未知錯誤"
        })
    return errorr_message, 400

# group_put
def group_put_200():
    data=jsonify({"ok":True})
    return data, 200

def group_put_400_not_exist_user():
    errorr_message = jsonify({
            "error": True,
            "message": "user doesn't exist"
        })
    return errorr_message, 400

def group_put_400_already_join():
    errorr_message = jsonify({
            "error": True,
            "message": "already member"
        })
    return errorr_message, 400

def group_put_400_wrong_password():
    errorr_message = jsonify({
            "error": True,
            "message": "wrong group password"
        })
    return errorr_message, 400

# group_delete
def group_delete_200():
    data=jsonify({"ok":True})
    return data, 200

def group_delete_400_wrong_password():
    errorr_message = jsonify({
            "error": True,
            "message": "wrong group password"
        })
    return errorr_message, 400

# group_manager patch
def group_manager_patch_200():
    data=jsonify({"ok":True})
    return data, 200

def group_manager_patch_400_same_manager():
    errorr_message = jsonify({
            "error": True,
            "message": "same manager"
        })
    return errorr_message, 400

def group_manager_patch_400_no_exist_user():
    errorr_message = jsonify({
            "error": True,
            "message": "user not exist"
        })
    return errorr_message, 400

def group_manager_patch_400_not_in_group():
    errorr_message = jsonify({
            "error": True,
            "message": "user not in group"
        })
    return errorr_message, 400
# group check

def group_check_post_200():
    data=jsonify({"ok":True})
    return data, 200

def group_check_post_400():
    errorr_message = jsonify({
            "error": True,
            "message": "not in group"
        })
    return errorr_message, 400