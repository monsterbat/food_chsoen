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
def sql_get_group_muti_order_list_info(group_id,order_list_status,data_start,one_page_quanity):
    sql_command="""
    SELECT id, store_id, user_id, stop_time, order_list_note
    FROM order_list
    WHERE group_id = %s AND order_list_status=%s
    ORDER BY id DESC
    LIMIT %s, %s;
    """
    value_input=(group_id,order_list_status,data_start,one_page_quanity+1)
    order_list_info_check = query_data(sql_command,value_input)
    return order_list_info_check
# order list id find lrder info
def sql_order_list_id_find_info(order_list_id):
    sql_command="""
    SELECT store_id, group_id, user_id, stop_time,order_list_status, order_list_note
    FROM order_list
    WHERE id = %s;
    """
    value_input=(order_list_id,)
    order_list_info_check = query_data(sql_command,value_input)
    return order_list_info_check