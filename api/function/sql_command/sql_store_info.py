# import project function
import sys
sys.path.append('api/function')
from MySQL_con import *
from hash_code import *
from user_token import *

# import python function
from flask import *

# SELECT FROM
# ID find
def sql_store_name_find_id(store_name,group_id,store_status):
    sql_command="""
    SELECT id
    FROM store 
    WHERE store_name=%s AND group_id=%s AND store_status=%s;
    """
    value_input = (store_name,group_id,store_status)
    store_id_check = query_data(sql_command,value_input)
    if (store_id_check == []):
        return store_id_check
    store_id = store_id_check[0]["id"]
    return store_id

# Store Name
def sql_store_id_find_name_alive_and_stop(store_id):
    sql_command="""
    SELECT store_name
    FROM store 
    WHERE id=%s;
    """
    value_input = (store_id,)
    store_name_check = query_data(sql_command,value_input)

    if (store_name_check == []):
        return store_name_check
    store_name = store_name_check[0]["store_name"]
    return store_name

# Store info
def sql_group_id_find_all_store_info(group_id,store_status):
    sql_command="""
    SELECT *
    FROM store 
    WHERE group_id=%s AND store_status=%s;
    """
    value_input = (group_id,store_status)
    store_info_check = query_data(sql_command,value_input)

    return store_info_check