# import project function
import sys
sys.path.append('api/function')
from MySQL_con import *
from hash_code import *
from user_token import *

sys.path.append('api/view')
import v_user

# import python function
from flask import *
import jwt
import time

### Module function ###

# Create user account
def user_post():
    # Get data from front-end
    create_user_data = request.get_json()
    user_name = create_user_data["userName"]
    user_email = create_user_data["userEmail"]
    user_password = create_user_data["userPassword"]

    # Save password with hash coding
    user_password = create_hash(user_password)
    # Check email repeat
    sql_command="""
    SELECT user_email
    FROM user 
    WHERE user_email=%s AND user_status=%s;
    """
    value_input = (user_email,"alive")
    user_email_check = query_data(sql_command,value_input)
    # If no repeat save it
    if user_email_check == []:
        # Input information 
        sql_command = """
        INSERT INTO user (user_name, user_email, user_password,user_status)
        VALUES (%s,%s,%s,%s);
        """
        value_input = (user_name,user_email,user_password,"alive")
        insert_or_update_data(sql_command,value_input)
        data = v_user.user_post_200()
        data = user_token_create(data, user_email)
        return data, 200
    else:
        errorr_message = v_user.user_post_400()
        return errorr_message, 400

# Check user info
def user_get():
    # Use cookie to know which user
    user_info = user_token_check()
    if user_info["data"] == None:
        errorr_message = v_user.user_get_403()
        return errorr_message, 403
    user_email = user_info["data"]["user_email"]
    user_id = user_info["data"]["id"]
    user_name = user_info["data"]["user_name"]
    user_data = {
        "data": {
            "userId":user_id,
            "userName":user_name,
            "userEmail":user_email
        }
    }
    return jsonify(user_data) ,200

# Change user name or password
def user_patch():
    # Use cookie to know which user
    user_info = user_token_check()
    if user_info["data"] == None:
        errorr_message = v_user.user_get_403()
        return errorr_message, 403
    user_email = user_info["data"]["user_email"]

    # Get data from front-end
    change_user_data = request.get_json()
    user_new_name = change_user_data["userNewName"]
    user_new_email = change_user_data["userNewEmail"]
    user_password = change_user_data["userPassword"]
    user_new_password = change_user_data["userNewPassword"]
    user_status =  change_user_data["userStatus"]
    # Change name
    if user_new_name != None:
        sql_command="""
        UPDATE user
        SET user_name = %s
        WHERE user_email = %s AND user_status=%s;
        """
        value_input = (user_new_name,user_email,"alive")
        insert_or_update_data(sql_command,value_input)
        data = v_user.user_patch_200()
        return data, 200

    # Change email
    if user_new_email != None:
        # Check new email repeat or not
        sql_command="""
        SELECT user_email
        FROM user
        WHERE user_email = %s AND user_status=%s;
        """
        value_input=(user_new_email,"alive")
        user_email_check = query_data(sql_command,value_input)
        if user_email_check == []:
            sql_command="""
            UPDATE user
            SET user_email = %s
            WHERE user_email = %s AND user_status=%s;
            """
            value_input = (user_new_email,user_email,"alive")
            insert_or_update_data(sql_command,value_input)
            # Change token
            user_token_delete()
            data = v_user.user_patch_200()
            data = user_token_create(data, user_new_email)
            
            return data, 200
        else:
            errorr_message = v_user.group_patch_400_same_email()
            return errorr_message, 400

    # Change password
    if user_password != None and user_new_password != None and user_new_password !="" and user_password != user_new_password:
        sql_command="""
        SELECT user_password
        FROM user 
        WHERE user_email=%s AND user_status=%s;
        """
        value_input = (user_email,"alive")
        user_check = query_data(sql_command,value_input)
        user_password_check = user_check[0]["user_password"]
        if decode_hash(user_password, user_password_check) == True:
            user_new_password = create_hash(user_new_password)
            sql_command="""
            UPDATE user
            SET user_password = %s
            WHERE user_email = %s AND user_status=%s;
            """
            value_input = (user_new_password,user_email)
            insert_or_update_data(sql_command,value_input)
            data = v_user.user_patch_200()
            return data, 200
    if user_password == user_new_password:
        errorr_message = v_user.user_patch_400_same_pw()
        return errorr_message, 400
    if user_new_password == "":
        errorr_message = v_user.user_patch_400_empty_pw()
        return errorr_message, 400
    else:
        errorr_message = v_user.user_patch_400_else()
        return errorr_message, 400

# User signin
def user_put():
    # Get data from front-end
    sign_in_data = request.get_json()
    user_email = sign_in_data["userEmail"]
    user_password = sign_in_data["userPassword"]

    # Check email
    sql_command="""
    SELECT user_password
    FROM user 
    WHERE user_email=%s AND user_status=%s;
    """
    value_input = (user_email,"alive")
    user_check = query_data(sql_command,value_input)
    if user_check != []:
        user_password_check = user_check[0]["user_password"]
        if decode_hash(user_password, user_password_check) == True:
            data = v_user.user_put_200()
            data = user_token_create(data,user_email)
            return data, 200
        else:
            errorr_message = v_user.user_put_400_wrong_password()
            return errorr_message, 400
    else:
        errorr_message = v_user.user_put_400_empty_email()
        return errorr_message, 400

# User logout
def user_delete():
    user_token_delete()
    data = v_user.user_delete_200()
    return data, 200