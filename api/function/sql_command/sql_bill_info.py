# import project function
import sys
sys.path.append('api/function')
from MySQL_con import *
from hash_code import *
from user_token import *

# import python function
from flask import *

# SELECT FROM
# Balance find
def sql_bill_latest_balance(user_id,group_id,bill_status):
    sql_command="""
    SELECT balance
    FROM bill 
    WHERE user_id=%s AND group_id=%s AND bill_status=%s
    ORDER BY id 
    DESC LIMIT 1;
    """
    value_input = (user_id,group_id,bill_status)
    user_balance_check = query_data(sql_command,value_input)
    if (user_balance_check == []):
        return user_balance_check
    user_balance = user_balance_check[0]["balance"]
    return user_balance


# INSERT INTO
def sql_insert_into_bill(user_id,group_id,order_id, order_price, balance, bill_time,bill_judgment,bill_status):
    sql_command = """
    INSERT INTO bill (user_id,group_id,order_id, order_price, balance, bill_time, bill_judgment,bill_status)
    VALUES (%s,%s,%s,%s,%s,%s,%s,%s);
    """
    value_input = (user_id,group_id,order_id, order_price, balance, bill_time, bill_judgment,bill_status)
    insert_or_update_data(sql_command,value_input)

