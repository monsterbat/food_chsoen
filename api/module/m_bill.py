# import project function
import sys
sys.path.append('api/function')
from MySQL_con import *
from hash_code import *
from user_token import *

sys.path.append('api/view')
import v_bill

# import python function
from flask import *
import jwt
import time
import datetime

### Module function ###

# Create bill account
def bill_post():
    # Use cookie to know which user
    user_info = user_token_check()
    user_email = user_info["data"]["user_email"]
    user_id = user_info["data"]["id"]
    # Get data
    create_bill_data = request.get_json()
    join_user_email = create_bill_data["joinUserEmail"]
    order_list_id = create_bill_data["orderListId"]
    group_id = create_bill_data["groupId"]
    group_name = create_bill_data["groupName"]

    # Calculate time
    current_time_code = datetime.datetime.now().strftime("%Y%m%d%H%M%S")
    bill_time = current_time_code

    if join_user_email != None:
        init_order_id = 1
        init_order_price = 0
        balance = 0
        # Use token get email then get id to join foreign key
        sql_command="""
        SELECT id
        FROM user 
        WHERE user_email=%s AND user_status=%s;
        """
        value_input = (join_user_email,"alive")
        join_user_id = query_data(sql_command,value_input)
        join_user_id = join_user_id[0]["id"]
        # group id
        sql_command="""
        SELECT id
        FROM user_group 
        WHERE group_name=%s AND group_status=%s
        """
        value_input = (group_name,"alive")
        group_info_check = query_data(sql_command,value_input)
        group_id = group_info_check[0]["id"]

        # 
        sql_command = """
        INSERT INTO bill (user_id,group_id,order_id, order_price, balance, bill_time, bill_status,bill_judgment)
        VALUES (%s,%s,%s,%s,%s,%s,%s,%s);
        """
        value_input = (join_user_id,group_id,init_order_id,init_order_price,balance,bill_time,"alive","")
        insert_or_update_data(sql_command,value_input)
        data = v_bill.bill_post_200()
        return data
    # Find bill list number id
    sql_command="""
    SELECT id, user_id, order_price
    FROM user_order 
    WHERE order_list_id=%s AND order_status=%s;
    """
    value_input = (order_list_id,"alive")
    user_order_check = query_data(sql_command,value_input)
    if user_order_check ==[]:
        data = v_bill.bill_post_200()
        return data

    for user_order_check_ls in user_order_check:
        order_id = user_order_check_ls["id"]
        order_user_id = user_order_check_ls["user_id"]
        order_price = user_order_check_ls["order_price"]
        # Find balance
        sql_command="""
        SELECT balance
        FROM bill 
        WHERE user_id=%s AND group_id=%s AND bill_status=%s
        ORDER BY id 
        DESC LIMIT 1;
        """
        value_input = (order_user_id,group_id,"alive")
        user_balance_check = query_data(sql_command,value_input)
        if user_balance_check ==[]:
            # Find reload
            sql_command="""
            SELECT reload_price
            FROM reload 
            WHERE user_id=%s AND group_id=%s AND reload_status=%s;
            """
            value_input = (order_user_id,group_id,"alive")
            reload_price_check = query_data(sql_command,value_input)
            reload_price_total = 0
            for reload_price_check_ls in reload_price_check:
                reload_price_check_ls_each = reload_price_check_ls["reload_price"]
                reload_price_total = reload_price_total + int(reload_price_check_ls_each)
            user_balance = reload_price_total
        else:
            user_balance = user_balance_check[0]["balance"]
        # first order dont have bill
        

        #Calculate balance
        balance = int(user_balance) - int(order_price)

        # Input information 
        sql_command = """
        INSERT INTO bill (user_id,group_id,order_id, order_price, balance, bill_time, bill_status,bill_judgment)
        VALUES (%s,%s,%s,%s,%s,%s,%s,%s);
        """
        value_input = (user_id,group_id,order_id,order_price,balance,bill_time,"alive","")
        insert_or_update_data(sql_command,value_input)
    data = v_bill.bill_post_200()
    return data