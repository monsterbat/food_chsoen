# import project function
import sys
sys.path.append('api/function')
from MySQL_con import *
from hash_code import *
from user_token import *

# import python function
from flask import *

# SELECT FROM
# Find order list information
def sql_user_id_get_muti_order_info(user_id,order_status,data_start,one_page_quanity):
    sql_command="""
    SELECT id, order_list_id, menu_id, order_quantity, order_price,order_note
    FROM user_order
    WHERE user_id = %s AND order_status=%s
    ORDER BY id DESC
    LIMIT %s, %s;
    """
    value_input=(user_id,order_status,data_start,one_page_quanity+1)
    order_info_check = query_data(sql_command,value_input)
    return order_info_check