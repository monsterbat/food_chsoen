# import project function
import sys
sys.path.append('api/function')
from MySQL_con import *

# import python function
from flask import *
import jwt
import time

# import env file
from dotenv import load_dotenv
import os
load_dotenv()
jwt_key = os.getenv("jwt_key")

def group_token_check():
    # Use cookie to know which group
    token = request.cookies.get('group_token')
    # If no token
    if token == None:
        no_token_msg = {
                "data":None,
                "message": "no token"
            }
        return no_token_msg
    else:
        # token_data = jwt.decode(token, jwt_key, algorithms="HS256")
        group_name = token["group_name"]
        # Check token and get other information
        sql_command="""
        SELECT id,group_name,group_manager
        FROM user_group 
        WHERE group_name=%s AND group_status=%s;
        """
        value_input = (group_name,"alive")
        group_info = query_data(sql_command,value_input)
        # Judge token right or wrong
        if group_info == []:
            verify_msg = {
                "data":None,
                "message": "no token"
            }
            return verify_msg
        else:
            verify_msg = {
                "data":{
                    "id":group_info[0]["id"],
                    "group_name":group_info[0]["group_name"],
                    "group_manager":group_info[0]["group_manager"]
                }
            }
            return verify_msg

def group_token_create(result,group_name):
    
    # JWT token sgould not include password
    sign_in_data_group_name = {
        "group_name":group_name
    }
    # token = jwt.encode(sign_in_data_group_name, jwt_key, algorithm="HS256")    
    cookie_sustain_days = 1
    result.set_cookie(key="group_token", value=sign_in_data_group_name, expires=time.time()+cookie_sustain_days*60*60*24)
    return result

def group_token_delete():
    token_del = Response('delete cookies')
    token_del = jsonify({"ok":True})
    token_del.set_cookie(key='group_token', value='', expires=0)