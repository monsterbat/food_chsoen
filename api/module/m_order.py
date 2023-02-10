# import project function
import sys
sys.path.append('api/function')
from MySQL_con import *
from hash_code import *
from user_token import *

sys.path.append('api/view')
import v_order

# import python function
from flask import *
import jwt
import time

### Module function ###

# Create order account
def order_post():
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
    menu_price = create_order_data["menuPrice"]
    order_price = int(menu_price)*int(order_quantity)
    order_note = create_order_data["menuNote"]
    # Find order list number id
    sql_command="""
    SELECT id
    FROM order_list 
    WHERE store_id=%s AND group_id=%s AND stop_time=%s AND order_list_status=%s;
    """
    value_input = (store_id,group_id,stop_time,"alive")
    order_list_check = query_data(sql_command,value_input)
    order_list_id = order_list_check[0]["id"]
    # Find menu id
    sql_command="""
    SELECT id
    FROM menu 
    WHERE group_id=%s AND store_id=%s AND menu_name=%s AND menu_size=%s AND menu_status=%s;
    """
    value_input = (group_id,store_id,menu_name,menu_size,"alive")
    menu_id_check = query_data(sql_command,value_input)
    menu_id = menu_id_check[0]["id"]
    # Input information 
    sql_command = """
    INSERT INTO user_order (order_list_id, user_id, menu_id, order_quantity, order_price, order_status, order_note)
    VALUES (%s,%s,%s,%s,%s,%s,%s);
    """
    value_input = (order_list_id,user_id,menu_id,order_quantity,order_price,"alive",order_note)
    insert_or_update_data(sql_command,value_input)
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
def order_patch():
    # Use cookie to know which user
    user_info = user_token_check()
    user_id = user_info["data"]["id"]

    # Get data from front-end
    change_order_data = request.get_json()
    group_id = change_order_data["groupId"]
    user_update_id = change_order_data["userId"]
    store_name = change_order_data["storeName"]
    order_list_id = change_order_data["orderListId"]
    menu_name = change_order_data["menuName"]
    menu_size = change_order_data["menuSize"]
    menu_new_name = change_order_data["menuNewName"]
    menu_new_size = change_order_data["menuNewSize"]
    order_quantity = change_order_data["orderQuantity"]
    order_new_note = change_order_data["orderNote"]
    order_status = change_order_data["orderStatus"]
    if order_status == "stop":
        # Find store id
        sql_command="""
        SELECT id
        FROM store 
        WHERE group_id=%s AND store_name=%s AND store_status=%s;
        """
        value_input = (group_id,store_name,"alive")
        store_id_check = query_data(sql_command,value_input)
        store_id = store_id_check[0]["id"]
        # Find menu id
        sql_command="""
        SELECT id
        FROM menu 
        WHERE group_id=%s AND store_id=%s AND menu_name=%s AND menu_size=%s AND menu_status=%s;
        """
        value_input = (group_id,store_id,menu_name,menu_size,"stop")
        menu_id_check = query_data(sql_command,value_input)
        menu_id = menu_id_check[0]["id"]
        # update user_order
        sql_command="""
        UPDATE user_order
        SET order_status=%s
        WHERE menu_id=%s AND order_status=%s;
        """
        value_input = (order_status,menu_id,"alive")
        insert_or_update_data(sql_command,value_input)
        data = v_order.order_patch_200()
        return data
    
    # Find store id
    sql_command="""
    SELECT store_id
    FROM order_list 
    WHERE id=%s AND order_list_status=%s;
    """
    value_input = (order_list_id,"alive")
    store_id_check = query_data(sql_command,value_input)
    store_id = store_id_check[0]["store_id"]

    # Find menu id
    sql_command="""
    SELECT id, menu_price
    FROM menu 
    WHERE group_id=%s AND store_id=%s AND menu_name=%s AND menu_size=%s AND menu_status=%s;
    """
    value_input = (group_id,store_id,menu_name,menu_size,"alive")
    menu_id_check = query_data(sql_command,value_input)
    menu_id = menu_id_check[0]["id"]
    menu_price = menu_id_check[0]["menu_price"]
    if user_update_id == None:
        # Find user_order id, order_quantity
        sql_command="""
        SELECT id, order_quantity, user_id
        FROM user_order 
        WHERE order_list_id=%s AND menu_id=%s AND order_status=%s;
        """
        value_input = (order_list_id,menu_id,"alive")
        user_order_check = query_data(sql_command,value_input)
        if user_order_check != []:
            for user_order_check_ls in user_order_check:
                usder_id_each = user_order_check_ls["user_id"]
                # order price
                # order quantity define
                order_quantity_each = user_order_check_ls["order_quantity"]
                if order_quantity != None:
                    order_quantity_each = order_quantity
                # calculate order price
                order_total_price = int(order_quantity_each)*int(menu_price)
                # If Change menu
                if menu_name != menu_new_name or menu_size != menu_new_size:
                    # Find new menu id
                    sql_command="""
                    SELECT id, menu_price
                    FROM menu 
                    WHERE group_id=%s AND store_id=%s AND menu_name=%s AND menu_size=%s AND menu_status=%s;
                    """
                    value_input = (group_id,store_id,menu_new_name,menu_new_size,"alive")
                    menu_id_check = query_data(sql_command,value_input)
                    menu_new_id = menu_id_check[0]["id"]
                    menu_new_price = menu_id_check[0]["menu_price"]
                    order_total_price = int(order_quantity_each)*int(menu_new_price)
                    # Not done yet!

                # update user_order
                sql_command="""
                UPDATE user_order
                SET order_quantity = %s, order_price=%s
                WHERE order_list_id=%s AND user_id=%s AND menu_id=%s AND order_status=%s;
                """
                value_input = (order_quantity_each,order_total_price,order_list_id,usder_id_each,menu_id,"alive")
                insert_or_update_data(sql_command,value_input)
        data = v_order.order_patch_200()
        return data

    else:
        errorr_message = v_order.order_patch_400_else()
        return errorr_message
