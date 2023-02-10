# import project function
import sys
sys.path.append('api/function')
from MySQL_con import *
from hash_code import *
from user_token import *
from group_token import *
from store_token import *

sys.path.append('api/view')
import v_order_list

# import python function
from flask import *
import jwt
import time
import datetime

### Module function ###

# Create order_list account
def order_list_post():
    # Use cookie to know which user
    user_info = user_token_check()
    if user_info["data"] == None:
        errorr_message = v_order_list.order_list_get_403()
        return errorr_message
    user_id = user_info["data"]["id"]
    
    # Current time as order list
    current_time_code = datetime.datetime.now().strftime("%Y%m%d%H%M%S")
    unite_id_len = str(user_id).rjust(7,"0")
    order_list_number = str(current_time_code+unite_id_len)
    # Get data from front-end
    create_order_list_data = request.get_json()
    group_name = create_order_list_data["groupName"]
    user_name = create_order_list_data["userName"]
    store_name = create_order_list_data["storeName"]
    stop_time = create_order_list_data["stopTime"]
    order_list_note = create_order_list_data["orderListNote"]

    # Find group id
    sql_command="""
    SELECT id
    FROM user_group 
    WHERE group_name=%s AND group_status=%s
    """
    value_input = (group_name,"alive")
    group_info_check = query_data(sql_command,value_input)
    group_id = group_info_check[0]["id"]

    # Use store_name find store id
    sql_command="""
    SELECT id
    FROM store 
    WHERE store_name=%s AND group_id=%s AND store_status=%s;
    """
    value_input = (store_name,group_id,"alive")
    store_id_check = query_data(sql_command,value_input)
    store_id = store_id_check[0]["id"]
    
    # Input information 
    sql_command = """
    INSERT INTO order_list (store_id, group_id, user_id, stop_time, order_list_number, order_list_status,order_list_note)
    VALUES (%s,%s,%s,%s,%s,%s,%s);
    """
    value_input = (store_id, group_id, user_id, stop_time, order_list_number,"alive", order_list_note)
    insert_or_update_data(sql_command,value_input)
    data = v_order_list.order_list_post_200()
    return data


# Check order_list info
def order_list_get(page, keyword=None,urlGroupName=None,urlStoreName=None,urlStopTime=None,getStatus=None):
    # Define page Qty
    one_page_quanity=100
    data_start=int(page*one_page_quanity)

    # Use cookie to know which user
    user_info = user_token_check()
    if user_info["data"] == None:
        errorr_message = v_order_list.order_list_get_403()
        return errorr_message
    user_id = user_info["data"]["id"]

    # Find group id
    sql_command="""
    SELECT id
    FROM user_group 
    WHERE group_name=%s AND group_status=%s
    """
    value_input = (urlGroupName,"alive")
    group_info_check = query_data(sql_command,value_input)
    group_id = group_info_check[0]["id"]
    print("olc1")
    # Already in orderlist to find orderlist id
    if urlStoreName != "" and urlStopTime != "":
        print("olc2",getStatus)
        # Use store_name find store id
        sql_command="""
        SELECT id
        FROM store 
        WHERE store_name=%s AND group_id=%s AND store_status=%s;
        """
        value_input = (urlStoreName,group_id,"alive")
        store_id_check = query_data(sql_command,value_input)
        store_id = store_id_check[0]["id"]
        print("olc3")
        # Find order list info
        sql_command="""
        SELECT id, user_id, stop_time, order_list_note
        FROM order_list
        WHERE group_id = %s AND store_id=%s AND stop_time=%s AND order_list_status=%s;
        """
        value_input=(group_id,store_id,urlStopTime, getStatus)
        order_list_info_check = query_data(sql_command,value_input)
        print("123order_list_info_check",order_list_info_check)
        if order_list_info_check == []:
            print("?")
            order_list_result = {
                "orderListStatus":"empty"
            }
            return jsonify(order_list_result) ,200
        print("(group_id,store_id,urlStopTime",group_id,store_id,urlStopTime)
        print("√",order_list_info_check)
        order_list_id = order_list_info_check[0]["id"]
        order_user_name = order_list_info_check[0]["user_id"]
        stop_time = order_list_info_check[0]["stop_time"]
        order_list_note = order_list_info_check[0]["order_list_note"]
        print("olc4",order_list_id)
        order_list_data =  {
                "orderListId":order_list_id,
                "storeName":urlStoreName,
                "orderUserName":order_user_name,
                "stopTime":stop_time,
                "orderListNote":order_list_note,
                "orderListStatus":getStatus
                }
        return jsonify(order_list_data) ,200

    # Use group_id to check order_list info
    print("J1")
    sql_command="""
    SELECT id, store_id,user_id, stop_time, order_list_note
    FROM order_list
    WHERE group_id = %s AND order_list_status=%s
    LIMIT %s, %s;
    """
    value_input=(group_id, getStatus, data_start,one_page_quanity+1)
    order_list_info_check = query_data(sql_command,value_input)
    print("J2",order_list_info_check)
    # No data
    if order_list_info_check == []:
        order_list_data = {
            "nextPage":None,
            "orderList":None
        }
        return jsonify(order_list_data) ,200

    # page judge
    if len(order_list_info_check)==one_page_quanity+1:
        next_page=page+1
        order_list_info_check.pop()
    else:
        next_page=None

    order_list_data = {
        "nextPage":next_page,
        "orderList":[]
    }
    # Create data
    if order_list_info_check != []:
        for order_list_ls in order_list_info_check:
            print("J2")
            order_list_id = order_list_ls["id"]
            store_id = order_list_ls["store_id"]
            order_user_id = order_list_ls["user_id"]
            stop_time = order_list_ls["stop_time"]
            order_list_note = order_list_ls["order_list_note"]

            # Find store name
            sql_command="""
            SELECT store_name
            FROM store 
            WHERE id=%s AND store_status=%s;
            """
            value_input = (store_id,"alive")
            store_name_check = query_data(sql_command,value_input)
            print("J3",store_name_check)
            store_name = store_name_check[0]["store_name"]
            # Find order name
            sql_command="""
            SELECT user_name
            FROM user 
            WHERE id=%s AND user_status=%s;
            """
            value_input = (order_user_id,"alive")
            order_user_name_check = query_data(sql_command,value_input)
            order_user_name = order_user_name_check[0]["user_name"]

            order_list_ls_data =  {
                "orderListId":order_list_id,
                "storeName":store_name,
                "orderUserName":order_user_name,
                "stopTime":stop_time,
                "orderListNote":order_list_note,
                "orderListStatus":getStatus
                }
            order_list_data["orderList"].append(order_list_ls_data)

    return jsonify(order_list_data) ,200

# Change order_list info
def order_list_patch():
    # Get data from front-end
    change_order_list_data = request.get_json()
    order_list_id = change_order_list_data["orderListId"]
    group_id = change_order_list_data["groupId"]
    new_store_name = change_order_list_data["newStoreName"]
    new_order_list_manager_email = change_order_list_data["newOrderListManagerEmail"]
    new_stop_time = change_order_list_data["newStopTime"]
    order_list_status = change_order_list_data["orderListStatus"]
    new_order_list_note = change_order_list_data["newOrderListNote"]

    # Change name
    if new_store_name != None:
        # Find store id
        sql_command="""
        SELECT id
        FROM store 
        WHERE store_new_name=%s AND group_id=%s AND store_status=%s;
        """
        value_input = (new_store_name,group_id,"alive")
        store_id_check = query_data(sql_command,value_input)
        new_store_id = store_id_check[0]["id"]

        # update store id
        sql_command="""
        UPDATE order_list
        SET store_id = %s
        WHERE id = %s AND order_list_status=%s;
        """
        value_input = (new_store_id,order_list_id,"alive")
        insert_or_update_data(sql_command,value_input)
        

    # Change new_order_list_manager
    if new_order_list_manager_email != None:
        # Find manager user id
        sql_command="""
        SELECT id
        FROM user 
        WHERE user_email=%s AND store_status=%s;
        """
        value_input = (new_order_list_manager_email,"alive")
        new_order_list_manager_id_check = query_data(sql_command,value_input)
        new_order_list_manager_id = new_order_list_manager_id_check[0]["id"]

        # update store id
        sql_command="""
        UPDATE order_list
        SET user_id = %s
        WHERE id = %s AND order_list_status=%s;
        """
        value_input = (new_order_list_manager_id,order_list_id,"alive")
        insert_or_update_data(sql_command,value_input)
 

    # Change stop time
    if new_stop_time != None:
        sql_command="""
        UPDATE order_list
        SET stop_time = %s
        WHERE id = %s AND order_list_status=%s;
        """
        value_input = (new_stop_time,order_list_id,"alive")
        insert_or_update_data(sql_command,value_input)
 
    # Change order_list_status 
    if order_list_status != None and order_list_status != "alive":
        if order_list_status == "ordering":
            sql_command="""
            UPDATE order_list
            SET order_list_status = %s
            WHERE id = %s AND order_list_status=%s;
            """
            value_input = (order_list_status,order_list_id,"alive")

            print("value_input",value_input)
            print("order_list_status",order_list_status)
            insert_or_update_data(sql_command,value_input)           
        if order_list_status == "finish":
            sql_command="""
            UPDATE order_list
            SET order_list_status = %s
            WHERE id = %s AND order_list_status=%s;
            """
            value_input = (order_list_status,order_list_id,"ordering")

            print("value_input",value_input)
            print("order_list_status",order_list_status)
            insert_or_update_data(sql_command,value_input)

    # Change order_list_new_note
    if new_order_list_note != None:
        sql_command="""
        UPDATE order_list
        SET order_list_note = %s
        WHERE id = %s AND order_list_status=%s;
        """
        value_input = (new_order_list_note,order_list_id,"alive")
        insert_or_update_data(sql_command,value_input)

    else:
        data = v_order_list.order_list_patch_200()
        return data

# get order list status
def order_list_status_get(page, keyword=None,urlGroupName=None,urlStoreName=None,urlStopTime=None):
    # Define page Qty
    one_page_quanity=100
    data_start=int(page*one_page_quanity)

    # Use cookie to know which user
    user_info = user_token_check()
    if user_info["data"] == None:
        errorr_message = v_order_list.order_list_get_403()
        return errorr_message
    user_id = user_info["data"]["id"]

    # Find group id
    sql_command="""
    SELECT id
    FROM user_group 
    WHERE group_name=%s AND group_status=%s
    """
    value_input = (urlGroupName,"alive")
    group_info_check = query_data(sql_command,value_input)
    group_id = group_info_check[0]["id"]
    print("olc1")
    # Already in orderlist to find orderlist id
    if urlStoreName != "" and urlStopTime != "":
        print("olc2")
        # Use store_name find store id
        sql_command="""
        SELECT id
        FROM store 
        WHERE store_name=%s AND group_id=%s AND store_status=%s;
        """
        value_input = (urlStoreName,group_id,"alive")
        store_id_check = query_data(sql_command,value_input)
        store_id = store_id_check[0]["id"]
        print("olc3")
        # Find order list info
        sql_command="""
        SELECT id, user_id, stop_time, order_list_note
        FROM order_list
        WHERE group_id = %s AND store_id=%s AND stop_time=%s AND order_list_status=%s;
        """
        value_input=(group_id,store_id,urlStopTime, "alive")
        order_list_info_check = query_data(sql_command,value_input)
        print("(group_id,store_id,urlStopTime",group_id,store_id,urlStopTime)
        print("√",order_list_info_check)
        order_list_id = order_list_info_check[0]["id"]
        order_user_name = order_list_info_check[0]["user_id"]
        stop_time = order_list_info_check[0]["stop_time"]
        order_list_note = order_list_info_check[0]["order_list_note"]
        print("olc4")
        order_list_data =  {
                "orderListId":order_list_id,
                "storeName":urlStoreName,
                "orderUserName":order_user_name,
                "stopTime":stop_time,
                "orderListNote":order_list_note
                }
        return jsonify(order_list_data) ,200

    # Use group_id to check order_list info
    print("J1")
    sql_command="""
    SELECT id, store_id,user_id, stop_time, order_list_note
    FROM order_list
    WHERE group_id = %s AND order_list_status=%s
    LIMIT %s, %s;
    """
    value_input=(group_id, "alive", data_start,one_page_quanity+1)
    order_list_info_check = query_data(sql_command,value_input)
    print("J2",order_list_info_check)
    # No data
    if order_list_info_check == []:
        order_list_data = {
            "nextPage":None,
            "orderList":None
        }
        return jsonify(order_list_data) ,200

    # page judge
    if len(order_list_info_check)==one_page_quanity+1:
        next_page=page+1
        order_list_info_check.pop()
    else:
        next_page=None

    order_list_data = {
        "nextPage":next_page,
        "orderList":[]
    }
    # Create data
    if order_list_info_check != []:
        for order_list_ls in order_list_info_check:
            print("J2")
            order_list_id = order_list_ls["id"]
            store_id = order_list_ls["store_id"]
            order_user_id = order_list_ls["user_id"]
            stop_time = order_list_ls["stop_time"]
            order_list_note = order_list_ls["order_list_note"]

            # Find store name
            sql_command="""
            SELECT store_name
            FROM store 
            WHERE id=%s AND store_status=%s;
            """
            value_input = (store_id,"alive")
            store_name_check = query_data(sql_command,value_input)
            print("J3",store_name_check)
            store_name = store_name_check[0]["store_name"]
            # Find order name
            sql_command="""
            SELECT user_name
            FROM user 
            WHERE id=%s AND user_status=%s;
            """
            value_input = (order_user_id,"alive")
            order_user_name_check = query_data(sql_command,value_input)
            order_user_name = order_user_name_check[0]["user_name"]

            order_list_ls_data =  {
                "orderListId":order_list_id,
                "storeName":store_name,
                "orderUserName":order_user_name,
                "stopTime":stop_time,
                "orderListNote":order_list_note
                }
            order_list_data["orderList"].append(order_list_ls_data)

    return jsonify(order_list_data) ,200
