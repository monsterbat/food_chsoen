# import project function
import sys
sys.path.append('api/function')
from MySQL_con import *
from hash_code import *
from user_token import *

sys.path.append('api/view')
import v_reload

# import python function
from flask import *
import datetime

### Module function ###

# Create reload account
def reload_post():
    # Use cookie to know which user
    user_info = user_token_check()
    user_id = user_info["data"]["id"]
    # Get data from front-end
    create_reload_data = request.get_json()
    groupName = create_reload_data["groupName"]
    reload_price = create_reload_data["reloadPrice"]
    reload_note = create_reload_data["reloadNote"]

    # group id
    sql_command="""
    SELECT id
    FROM user_group 
    WHERE group_name=%s AND group_status=%s
    """
    value_input = (groupName,"alive")
    group_info_check = query_data(sql_command,value_input)
    group_id = group_info_check[0]["id"]

    # Calculate time
    current_time_code = datetime.datetime.now().strftime("%Y%m%d%H%M%S")
    reload_time = current_time_code
    # Input information 
    sql_command = """
    INSERT INTO reload (user_id, group_id, reload_price, reload_note, reload_time, reload_status)
    VALUES (%s,%s,%s,%s,%s,%s);
    """
    value_input = (user_id,group_id,reload_price,reload_note,reload_time,"alive")
    insert_or_update_data(sql_command,value_input)
    data = v_reload.reload_post_200()
    return data
