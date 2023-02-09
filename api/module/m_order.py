# import project function
import sys
sys.path.append('api/function')
from MySQL_con import *
from hash_code import *
from user_token import *
from group_token import *
from store_token import *

sys.path.append('api/view')
import v_order

# import python function
from flask import *
import jwt
import time

### Module function ###

# Create order account
def order_post():
    print("c1")
    # Use cookie to know which user
    user_info = user_token_check()
    user_email = user_info["data"]["user_email"]
    user_id = user_info["data"]["id"]
    # Get data from front-end
    create_order_data = request.get_json()
    stop_time = create_order_data["urlStopTime"]
    store_id = create_order_data["storeId"]
    group_id = create_order_data["groupId"]
    order_quantity = create_order_data["menuOrderQuantity"]
    menu_name = create_order_data["menuName"]
    menu_size = create_order_data["menuSize"]
    order_price = create_order_data["menuPriceTotal"]
    order_note = create_order_data["menuNote"]
    print("C2",stop_time)
    # Find order list number id
    sql_command="""
    SELECT id
    FROM order_list 
    WHERE store_id=%s AND group_id=%s AND user_id=%s AND stop_time=%s AND order_list_status=%s;
    """
    value_input = (store_id,group_id,user_id,stop_time,"alive")
    order_list_check = query_data(sql_command,value_input)
    order_list_id = order_list_check[0]["id"]
    print("C3")
    # Find menu id
    sql_command="""
    SELECT id
    FROM menu 
    WHERE group_id=%s AND store_id=%s AND menu_name=%s AND menu_size=%s AND menu_status=%s;
    """
    value_input = (group_id,store_id,menu_name,menu_size,"alive")
    menu_id_check = query_data(sql_command,value_input)
    menu_id = menu_id_check[0]["id"]
    print("C4")
    # Input information 
    sql_command = """
    INSERT INTO user_order (order_list_id, user_id, menu_id, order_quantity, order_price, order_status, order_note)
    VALUES (%s,%s,%s,%s,%s,%s,%s);
    """
    value_input = (order_list_id,user_id,menu_id,order_quantity,order_price,"alive",order_note)
    insert_or_update_data(sql_command,value_input)
    print("C5")
    data = v_order.order_post_200()
    return data


# Get all order info
def order_get(page, keyword=None,orderListId=None):
    # Use cookie to know which user
    user_info = user_token_check()
    user_id = user_info["data"]["id"]
    # order list number should be get
    order_id = ""
    order_list_id = orderListId
    order_user_name = ""
    # Use email to check order info
    sql_command="""
    SELECT id, user_id, menu_id, order_quantity, order_price, order_note
    FROM user_order
    WHERE order_list_id = %s AND order_status=%s;
    """
    value_input=(order_list_id,"alive")
    order_info_check = query_data(sql_command,value_input)
    print("order_info_check",order_info_check)
    # No data
    if order_info_check == []:
        order_list_data = {
            "orderNumber":order_id,
            "orderUserName":order_user_name,
            "order":None
        }
        return jsonify(order_list_data) ,200

    order_list_data = {
            "orderNumber":order_id,
            "orderUserName":order_user_name,
            "order":[]
    }
    # Create data    
    if order_info_check != []:
        print("V1")
        for order_info_ls in order_info_check:
            order_id = order_info_ls["id"]
            user_id_member = order_info_ls["user_id"]
            menu_id = order_info_ls["menu_id"]
            order_quantity = order_info_ls["order_quantity"]
            order_price = order_info_ls["order_price"]
            order_note = order_info_ls["order_note"]
            # Find user name
            sql_command="""
            SELECT user_name
            FROM user
            WHERE id = %s AND user_status=%s;
            """
            value_input=(user_id_member,"alive")
            user_name_check = query_data(sql_command,value_input)
            user_name = user_name_check[0]["user_name"]
            # Find menu name and size
            sql_command="""
            SELECT menu_name, menu_size
            FROM menu
            WHERE id = %s AND menu_status=%s;
            """
            value_input=(menu_id,"alive")
            menu_check = query_data(sql_command,value_input)
            menu_name = menu_check[0]["menu_name"]      
            menu_size = menu_check[0]["menu_size"]          
            order_ls_data =  {
                "userName":user_name,
                "menuName":menu_name,
                "menuSize":menu_size,
                "orderQuantity":order_quantity,
                "orderPrice":order_price,
                "orderNote":order_note,
                "orderId":order_id
                }
            order_list_data["order"].append(order_ls_data)
    return jsonify(order_list_data) ,200

# Change order_list info
def order_list_patch():
    # Use cookie to know which user
    user_info = user_token_check()
    user_id = user_info["data"]["id"]
    # Use cookie to get syore info
    group_info = group_token_check()
    group_id = group_info["data"]["id"]

    # Get data from front-end
    change_order_data = request.get_json()
    order_id = change_order_data["orderId"]
    order_list_id = change_order_data["orderListId"]
    menu_new_name = change_order_data["menuNewName"]
    menu_new_size = change_order_data["menuNewSize"]
    order_new_note = change_order_data["orderNewNote"]
    order_status = change_order_data["orderStatus"]

    # Find store id
    sql_command="""
    SELECT store_id
    FROM order_list 
    WHERE order_list_id=%s AND order_list_status=%s;
    """
    value_input = (order_list_id,"alive")
    store_id_check = query_data(sql_command,value_input)
    store_id = store_id_check[0]["id"]

    # Change name size price together
    if menu_new_name != None:
        # Find new menu id
        sql_command="""
        SELECT id, menu_price
        FROM menu 
        WHERE store_id=%s AND group_id=%s AND menu_name=%s AND menu_size=%s AND menu_status=%s;
        """
        value_input = (store_id,group_id,menu_new_name,menu_new_size,"alive")
        menu_id_check = query_data(sql_command,value_input)
        menu_new_id = menu_id_check[0]["id"]
        menu_new_price = menu_id_check[0]["menu_price"]

        # update store id
        sql_command="""
        UPDATE user_order
        SET menu_id = %s, menu_price=%s
        WHERE order_id = %s AND order_list_status=%s;
        """
        value_input = (menu_new_id,menu_new_price,order_id,"alive")
        insert_or_update_data(sql_command,value_input)
        data = v_order.order_patch_200()
        return data

    # Change size
    if order_new_note != None:
        # update order user id
        sql_command="""
        UPDATE user_order
        SET order_note = %s
        WHERE order_id = %s AND order_status=%s;
        """
        value_input = (order_new_note,order_id,"alive")
        insert_or_update_data(sql_command,value_input)
        data = v_order.order_patch_200()
        return data

    # Cancle the order
    if order_status == "stop":
        sql_command="""
        UPDATE user_order
        SET order_status = %s
        WHERE order_id = %s AND order_list_status=%s;
        """
        value_input = ("stop",order_id,"alive")
        insert_or_update_data(sql_command,value_input)
        data = v_order.order_patch_200()
        return data

    else:
        errorr_message = v_order.order_patch_400_else()
        return errorr_message
