# import project function
import sys
sys.path.append('api/function')
from MySQL_con import *
from hash_code import *
from user_token import *

# import python function
from flask import *

# SELECT FROM
# Store Name
def sql_menu_id_find_info(menu_id):
    sql_command="""
    SELECT store_id, menu_name, menu_size
    FROM menu 
    WHERE id=%s;
    """
    value_input = (menu_id,)
    menu_info_check = query_data(sql_command,value_input)
    return menu_info_check