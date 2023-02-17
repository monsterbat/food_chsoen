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
def sql_group_name_find_id(group_name, group_status):
    sql_command="""
    SELECT id
    FROM user_group 
    WHERE group_name=%s AND group_status=%s
    """
    value_input = (group_name,group_status)
    group_info_check = query_data(sql_command,value_input)
    if (group_info_check == []):
        return group_info_check
    group_id = group_info_check[0]["id"]
    return group_id

def sql_group_name_find_info(group_name, group_status):
    sql_command="""
    SELECT id,group_manager
    FROM user_group 
    WHERE group_name=%s AND group_status=%s
    """
    value_input = (group_name,group_status)
    group_info_check = query_data(sql_command,value_input)
    return group_info_check