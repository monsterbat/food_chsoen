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

def store_token_check():
    # Use cookie to know which store
    token = request.cookies.get('store_token')
    # If no token
    if token == None:
        no_token_msg = {
                "data":None,
                "message": "no token"
        }
        return no_token_msg
    else:
        # token_data = jwt.decode(token, jwt_key, algorithms="HS256")
        store_name = token["store_name"]
        group_id =  token["group_id"]
        # Check token and get other information
        sql_command="""
        SELECT id,store_name
        FROM store 
        WHERE store_name=%s AND group_id=%s AND store_status=%s;
        """
        value_input = (store_name,group_id,"alive")
        store_info = query_data(sql_command,value_input)
        # Judge token right or wrong
        if store_info == []:
            verify_msg = {
                "data":None,
                "message": "no token"
            }
            return verify_msg
        else:
            verify_msg = {
                "data":{
                    "id":store_info[0]["id"],
                    "store_name":store_info[0]["store_name"],
                    "group_id":group_id
                }
            }
            return verify_msg

def store_token_create(result,store_name,group_id):
    # JWT token sgould not include password
    sign_in_data_store_name = {
        "store_name":store_name,
        "group_id":group_id
    }
    # token = jwt.encode(sign_in_data_store_name, jwt_key, algorithm="HS256")    
    cookie_sustain_days = 1
    result.set_cookie(key="store_token", value=sign_in_data_store_name, expires=time.time()+cookie_sustain_days*60*60*24)
    return result

def store_token_delete():
    token_del = Response('delete cookies')
    token_del = jsonify({"ok":True})
    token_del.set_cookie(key='store_token', value='', expires=0)