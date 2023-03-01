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
def sql_group_id_find_user_id(group_id, user_in_group_status):
    sql_command="""
    SELECT user_id
    FROM user_in_group 
    WHERE group_id=%s AND user_in_group_status=%s
    """
    value_input = (group_id,user_in_group_status)
    user_in_group_user_id_check = query_data(sql_command,value_input)
    return user_in_group_user_id_check

