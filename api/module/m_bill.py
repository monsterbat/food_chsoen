# import project function
import sys
sys.path.append('api/function')
from MySQL_con import *
from hash_code import *
from user_token import *

sys.path.append('api/function/sql_command')
from sql_command.sql_user_info import *
from sql_command.sql_group_info import *
from sql_command.sql_bill_info import *

sys.path.append('api/view')
import v_bill

# import python function
from flask import *
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
    print("create_bill_data",create_bill_data)
    bill_user_email = create_bill_data["billUserEmail"]
    order_list_id = create_bill_data["orderListId"]
    group_id = create_bill_data["groupId"]
    group_name = create_bill_data["groupName"]
    print("c1")
    # Calculate time
    current_time_code = datetime.datetime.now().strftime("%Y%m%d%H%M%S")
    bill_time = current_time_code
    if bill_user_email != None:
        init_order_id = 1
        init_order_price = 0
        balance = 0
        # Use token get email then get id to join foreign key
        join_user_id = sql_user_email_find_id(bill_user_email, "alive")
        group_id = sql_group_name_find_id(group_name, "alive")
        sql_insert_into_bill(join_user_id,group_id,init_order_id, init_order_price, balance, bill_time,"","alive")
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
    print("user_order_check",user_order_check)
    for user_order_check_ls in user_order_check:
        order_id = user_order_check_ls["id"]
        order_user_id = user_order_check_ls["user_id"]
        order_price = user_order_check_ls["order_price"]
        # Find balance
        user_balance_check = sql_bill_latest_balance(order_user_id,group_id,"alive")
        user_balance = user_balance_check        

        #Calculate balance
        balance = float(user_balance) - float(order_price)
        # Input information 
        sql_insert_into_bill(user_id,group_id,order_id, order_price, balance, bill_time,"","alive")
    data = v_bill.bill_post_200()
    return data

def bill_get(page, keyword=None, urlGroupName=None):
    user_info = user_token_check()
    user_id = user_info["data"]["id"]
    group_id = sql_group_name_find_id(urlGroupName, "alive")    
    # find bill reload
    user_balance = sql_bill_latest_balance(user_id,group_id,"alive")
    data = {
        "userBalance":user_balance
    }
    return jsonify(data), 200

def bill_reload_post():
    user_info = user_token_check()
    # Get data
    create_bill_reload_data = request.get_json()
    bill_user_email = create_bill_reload_data["billUserEmail"]
    group_name = create_bill_reload_data["groupName"]
    bill_reload_price = create_bill_reload_data["billPrice"]
    bill_user_id = sql_user_email_find_id(bill_user_email,"alive")
    group_id = sql_group_name_find_id(group_name,"alive",)
    latest_balance = sql_bill_latest_balance(bill_user_id,group_id,"alive")

    order_id = 1
    order_price = 0
    balance = float(latest_balance)+float(bill_reload_price)
    # Calculate time
    current_time_code = datetime.datetime.now().strftime("%Y%m%d%H%M%S")
    bill_time = current_time_code
    sql_insert_into_bill(bill_user_id,group_id,order_id,order_price,balance,bill_time,"","alive")
    
    data = v_bill.bill_post_200()
    return data