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

def user_token_check():
    # Use cookie to know which user
    token = request.cookies.get('token')
    # If no token
    if token == None:
        no_token_msg = {
                "data":None,
                "message": "no token"
        }
        return no_token_msg
    else:
        token_data = jwt.decode(token, jwt_key, algorithms="HS256")
        user_email = token_data["user_email"]
        # Check token and get other information
        sql_command="""
        SELECT id,user_name,user_email
        FROM user   
        WHERE user_email=%s AND user_status=%s;
        """
        value_input = (user_email,"alive")
        user_info = query_data(sql_command,value_input)
        # Judge token right or wrong
        if user_info == []:
            verify_msg = {
                "data":None,
                "message": "no token"
            }
            return verify_msg
        else:
            verify_msg = {
                "data":{
                    "id":user_info[0]["id"],
                    "user_name":user_info[0]["user_name"],
                    "user_email":user_info[0]["user_email"]
                }
            }
            # verify_msg = json.dumps(verify_msg.get_json())
            return verify_msg

def user_token_create(result,user_email):
    # JWT token sgould not include password
    sign_in_data_email_only = {
        "user_email":user_email
    }
    token = jwt.encode(sign_in_data_email_only, jwt_key, algorithm="HS256")    
    cookie_sustain_days = 1
    result.set_cookie(key="token", value=token, expires=time.time()+cookie_sustain_days*60*60*24)
    return result

def user_token_delete():
    token_del = Response('delete cookies')
    token_del = jsonify({"ok":True})
    token_del.set_cookie(key='token', value='', expires=0)