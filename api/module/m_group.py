# import project function
import sys
sys.path.append('api/function')
from MySQL_con import *
from hash_code import *
from user_token import *

sys.path.append('api/function/sql_command')
from sql_command.sql_user_info import *
from sql_command.sql_group_info import *
from sql_command.sql_user_in_group_info import *
from sql_command.sql_bill_info import *

sys.path.append('api/view')
import v_group

# import python function
from flask import *
import datetime

### Module function ###

# Create group account
def group_post():
    # Use cookie to know which user
    user_info = user_token_check()
    if user_info["data"] == None:
        errorr_message = v_group.group_get_403()
        return errorr_message
    # Use token get email then get id to join foreign key
    user_id = user_info["data"]["id"]
    # Get data from front-end
    create_group_data = request.get_json()
    group_name = create_group_data["groupName"]
    group_password = create_group_data["groupPassword"]
    # Save password with hash coding
    group_password = create_hash(group_password)
    # Check name repeat
    sql_command="""
    SELECT group_name
    FROM user_group 
    WHERE group_name=%s AND group_status=%s;
    """
    value_input = (group_name,"alive")
    group_name_check = query_data(sql_command,value_input)
    # If no repeat save it
    if group_name_check == []:
        # Input information into user_group
        sql_command = """
        INSERT INTO user_group (group_name, group_password, group_manager, group_status)
        VALUES (%s,%s,%s,%s);
        """
        value_input = (group_name,group_password,user_id,"alive")
        insert_or_update_data(sql_command,value_input)
        # Find group id
        sql_command="""
        SELECT id
        FROM user_group 
        WHERE group_name=%s AND group_password=%s AND group_manager=%s AND group_status=%s;
        """
        value_input = (group_name,group_password,user_id,"alive")
        group_id_check = query_data(sql_command,value_input)
        group_id = group_id_check[0]["id"]
        # Input information into user_in_group
        join_time = datetime.datetime.now().strftime("%Y%m%d%H%M%S")
        sql_command = """
        INSERT INTO user_in_group (group_id, user_id, join_time, user_in_group_status)
        VALUES (%s,%s,%s,%s);
        """
        value_input = (group_id,user_id,join_time,"alive")
        insert_or_update_data(sql_command,value_input)
        
        data = v_group.group_post_200()
        return data
    else:
        errorr_message = v_group.group_post_400()
        return errorr_message

# Check group info
def group_get(page, keyword=None):
    # Define page Qty
    one_page_quanity=100
    data_start=int(page*one_page_quanity)
    # keyword setting
    group_keyword = "%"+keyword+"%"
    # Use cookie to know which user
    user_info = user_token_check()
    if user_info["data"] == None:
        errorr_message = v_group.group_get_403()
        return errorr_message
    user_email = user_info["data"]["user_email"]

    sql_command = """
    SELECT user_group.id, user_group.group_name, user_group.group_manager
    FROM user
    INNER JOIN user_in_group ON user.id = user_in_group.user_id
    INNER JOIN user_group ON user_in_group.group_id = user_group.id
    WHERE user.user_email = %s
    AND user_in_group.user_in_group_status = %s
    AND user.user_status = %s
    AND user_group.group_status = %s
    ORDER BY id DESC
    LIMIT %s, %s;
    """
    value_input=(user_email,"alive","alive","alive",data_start,one_page_quanity+1)
    group_data_list = query_data(sql_command,value_input)


    # If no group
    if group_data_list == []:
        group_data = {
            "nextPage":None,
            "group":None
        }
        return jsonify(group_data) ,200

    if len(group_data_list)==one_page_quanity+1:
        next_page=page+1
        group_data_list.pop()
    else:
        next_page=None

    group_data = {
        "nextPage":next_page,
        "group":[]
    }

    if group_data_list != []:
        for i in range(len(group_data_list)):
            group_info = {
                "groupName": group_data_list[i]["group_name"], 
                "groupManager": group_data_list[i]["group_manager"],
                "groupId":group_data_list[i]["id"]
                }
            group_data["group"].append(group_info)
    
    # If no group
    if group_data_list == []:
        group_data = {
            "nextPage":None,
            "group":None
        }
        return jsonify(group_data) ,200
    return jsonify(group_data) ,200

# Change group name or password
def group_patch():
    change_group_data = request.get_json()
    group_name = change_group_data["groupName"]
    group_new_name = change_group_data["groupNewName"]
    group_password = change_group_data["groupPassword"]
    group_new_password = change_group_data["groupNewPassword"]
    group_status = change_group_data["groupStatus"]
    # Change name
    if group_new_name != None:
        # Check group name repeat
        sql_command="""
        SELECT group_name
        FROM user_group 
        WHERE group_name=%s AND group_status=%s;
        """
        value_input = (group_new_name,"alive")
        group_name_check = query_data(sql_command,value_input)
        if group_name_check == []:
            sql_command="""
            UPDATE user_group
            SET group_name = %s
            WHERE group_name = %s AND group_status=%s;
            """
            value_input = (group_new_name,group_name,"alive")
            insert_or_update_data(sql_command,value_input)
            data = v_group.group_patch_200()
            return data
        else:
            errorr_message = v_group.group_patch_400_same_name()
            return errorr_message

    # Change password
    if group_password != None and group_new_password !=None and group_new_password !="" and group_password != group_new_password:
        sql_command="""
        SELECT group_password
        FROM user_group 
        WHERE group_name=%s AND group_status=%s;
        """
        value_input = (group_name,"alive")
        group_check = query_data(sql_command,value_input)
        group_password_check = group_check[0]["group_password"]
        if decode_hash(group_password, group_password_check) == True:
            group_new_password = create_hash(group_new_password)
            sql_command="""
            UPDATE user_group
            SET group_password = %s
            WHERE group_name = %s AND group_status=%s;
            """
            value_input = (group_new_password,group_name,"alive")
            insert_or_update_data(sql_command,value_input)
            data = v_group.group_patch_200()
            return data
        else:
            errorr_message = v_group.group_patch_400_wrong_pw()
            return errorr_message
    if group_password == group_new_password:
        errorr_message = v_group.group_patch_400_same_pw()
        return errorr_message
    if group_new_password == "":
        errorr_message = v_group.group_patch_400_empty_pw()
        return errorr_message
    if group_status == "stop":
        sql_command="""
        SELECT group_password
        FROM user_group 
        WHERE group_name=%s AND group_status=%s;
        """
        value_input = (group_name,"alive")
        group_check = query_data(sql_command,value_input)
        group_password_check = group_check[0]["group_password"]
        if decode_hash(group_password, group_password_check) == True:
            sql_command="""
            UPDATE user_group
            SET group_status = %s
            WHERE group_name = %s AND group_status=%s;
            """        
            value_input = ("stop",group_name,"alive")
            insert_or_update_data(sql_command,value_input)
            data = v_group.group_patch_200()
            return data
        else:
            errorr_message = v_group.group_patch_400_wrong_pw()
            return errorr_message
    else:
        errorr_message = v_group.group_patch_400_else()
        return errorr_message

# Join the group
def group_put():
    # Use cookie to know which user
    user_info = user_token_check()
    if user_info["data"] == None:
        errorr_message = v_group.group_get_403()
        return errorr_message
    user_email = user_info["data"]["user_email"]

    # Get data from front-end
    join_group_data = request.get_json()
    join_user_email = join_group_data["joinUserEmail"]
    group_name = join_group_data["groupName"]
    group_password = join_group_data["groupPassword"]
    use_for = join_group_data["useFor"]
    # Check password
    sql_command="""
    SELECT group_password
    FROM user_group 
    WHERE group_name=%s AND group_status=%s;
    """
    value_input = (group_name,"alive")
    group_check = query_data(sql_command,value_input)
    group_password_check = group_check[0]["group_password"]
    if decode_hash(group_password, group_password_check) == True or use_for == "invite":
        # Use token get email then get id to join foreign key
        sql_command="""
        SELECT id
        FROM user 
        WHERE user_email=%s AND user_status=%s;
        """
        value_input = (join_user_email,"alive")
        join_user_id = query_data(sql_command,value_input)
        if join_user_id != []:
            # Find group_id
            sql_command="""
            SELECT id
            FROM user_group 
            WHERE group_name=%s AND group_status=%s;
            """
            value_input = (group_name,"alive")
            group_id = query_data(sql_command,value_input)
            group_id = group_id[0]["id"]
            # Check id the joinner had join the group or not
            join_user_id = join_user_id[0]["id"]
            sql_command="""
            SELECT id, join_time, user_in_group_status
            FROM user_in_group 
            WHERE user_id=%s AND group_id=%s;
            """
            value_input = (join_user_id,group_id)
            group_join_check = query_data(sql_command,value_input)
            # If no repeat save it
            if group_join_check == []:
                # Input joinner information 
                join_time = datetime.datetime.now().strftime("%Y%m%d%H%M%S")
                sql_command = """
                INSERT INTO user_in_group (user_id,group_id,join_time,user_in_group_status)
                VALUES (%s,%s,%s,%s);
                """
                value_input = (join_user_id,group_id,join_time,"alive")
                insert_or_update_data(sql_command,value_input)
                data = v_group.group_put_200()
                return data
            else:
                print("1234",group_join_check)
                if group_join_check[0]["user_in_group_status"] == "alive":
                    join_time = group_join_check[0]["join_time"]
                    errorr_message = v_group.group_put_400_already_join()
                    return errorr_message
                else:
                    print(group_join_check)
                    user_in_group_id = group_join_check[0]["id"]
                    print("user_in_group_id",user_in_group_id)
                    # update user_in_group_status
                    sql_command="""
                    UPDATE user_in_group
                    SET user_in_group_status = %s
                    WHERE id = %s AND user_in_group_status=%s;
                    """
                    value_input = ("alive",user_in_group_id,"stop")
                    insert_or_update_data(sql_command,value_input)
                    data = v_group.group_put_200()
                    return data
        else:
            errorr_message = v_group.group_put_400_not_exist_user()
            return errorr_message
    else:
        errorr_message = v_group.group_put_400_wrong_password()
        return errorr_message

# leave the group
def group_delete():
    # Use cookie to know which user
    user_info = user_token_check()
    if user_info["data"] == None:
        errorr_message = v_group.group_get_403()
        return errorr_message
    user_id = user_info["data"]["id"]

    # Get data from front-end
    delete_group_data = request.get_json()
    group_name = delete_group_data["groupName"]
    # Find group id
    group_id = sql_group_name_find_id(group_name, "alive")
    # Delete from group table
    sql_command="""
    UPDATE user_in_group
    SET user_in_group_status = %s
    WHERE user_id=%s AND group_id=%s AND user_in_group_status=%s;
    """
    value_input = ("stop",user_id,group_id,"alive")
    insert_or_update_data(sql_command,value_input)    
    
    data = v_group.group_delete_200()
    return data

def group_get_info(page, keyword=None,urlGroupName=None,getStatus=None):
    user_info = user_token_check()
    if user_info["data"] == None:
        errorr_message = v_group.group_get_403()
        return errorr_message
    user_email = user_info["data"]["user_email"]
    group_info = sql_group_name_find_info(urlGroupName,getStatus)
    group_data = {
        "nextPage":None,
        "group":[{
                "groupName": urlGroupName, 
                "groupManager": group_info[0]["group_manager"],
                "groupId":group_info[0]["id"]
        }]
    }
    return jsonify(group_data) ,200

def group_get_user(page, keyword=None,urlGroupName=None):
    user_info = user_token_check()
    if user_info["data"] == None:
        errorr_message = v_group.group_get_403()
        return errorr_message
    group_info_check = sql_group_name_find_info(urlGroupName, "alive")
    group_id = group_info_check[0]["id"]
    group_manager_id = group_info_check[0]["group_manager"]
    user_in_group_user_id_check = sql_group_id_find_user_id(group_id)
    group_user_info = []
    for user_in_group_user_id_ls in user_in_group_user_id_check:
        user_in_group_user_id = user_in_group_user_id_ls["user_id"]
        user_in_group_status = user_in_group_user_id_ls["user_in_group_status"]
        if user_in_group_user_id == group_manager_id:
            user_position = "管理者"
        else:
            user_position = "成員"
        
        user_name = sql_user_id_find_name(user_in_group_user_id)
        user_balance = sql_bill_latest_balance(user_in_group_user_id,group_id,"alive")
        
        user_info_into = {
            "userPosition":user_position,
            "userName":user_name,
            "userBalance":user_balance,
            "userInGroupStatus":user_in_group_status
        }

        group_user_info = group_user_info +[user_info_into]

    return jsonify(group_user_info) ,200


def group_manager_patch():
    # Use cookie to know which user
    user_info = user_token_check()
    if user_info["data"] == None:
        errorr_message = v_group.group_get_403()
        return errorr_message
    user_id = user_info["data"]["id"]

    change_group_data = request.get_json()
    group_name = change_group_data["groupName"]
    new_manager_email = change_group_data["userEmail"]

    group_id = sql_group_name_find_id(group_name, "alive")
    new_manager_id = sql_user_email_find_id(new_manager_email, "alive")
    if new_manager_id == []:
        errorr_message = v_group.group_manager_patch_400_no_exist_user()
        return errorr_message
    
    user_in_group_check = sql_user_in_group_or_not(group_id,new_manager_id,"alive")
    if user_in_group_check == []:
        errorr_message = v_group.group_manager_patch_400_not_in_group()
        return errorr_message
    
    if new_manager_id == user_id:
        errorr_message = v_group.group_manager_patch_400_same_manager()
        return errorr_message

    
    sql_update_group_manager(new_manager_id,group_id)

    result = v_group.group_manager_patch_200()
    return result 

def group_check_post():
    # Use cookie to know which user
    user_info = user_token_check()
    if user_info["data"] == None:
        errorr_message = v_group.group_get_403()
        return errorr_message
    user_id = user_info["data"]["id"]

    change_group_data = request.get_json()
    group_name = change_group_data["groupName"]
    group_id = sql_group_name_find_id(group_name, "alive")
    user_in_group_check = sql_user_in_group_or_not(group_id,user_id,"alive")
    if user_in_group_check == []:
        errorr_message = v_group.group_check_post_400()
        return errorr_message
    result = v_group.group_check_post_200()
    return result