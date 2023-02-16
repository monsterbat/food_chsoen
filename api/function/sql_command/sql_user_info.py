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
def sql_user_email_find_id(user_email, user_status):
    sql_command="""
    SELECT id
    FROM user 
    WHERE user_email=%s AND user_status=%s;
    """
    value_input = (user_email,user_status)
    user_id_check = query_data(sql_command,value_input)
    if (user_id_check == []):
        return user_id_check
    user_id = user_id_check[0]["id"]
    return user_id

def sql_user_id_find_name(user_id):
    sql_command="""
    SELECT user_name
    FROM user 
    WHERE id=%s;
    """
    value_input = (user_id,)
    user_name_check = query_data(sql_command,value_input)
    if (user_name_check == []):
        return user_name_check
    user_name = user_name_check[0]["user_name"]
    return user_name

# INSERT INTO