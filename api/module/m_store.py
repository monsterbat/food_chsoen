# import project function
import sys
sys.path.append('api/function')
from MySQL_con import *
from hash_code import *
from user_token import *
from group_token import *

sys.path.append('api/view')
import v_store

# import python function
from flask import *
import jwt
import time
import datetime

### Module function ###

# Create store account
def store_post():

    # Get data from front-end
    create_store_data = request.get_json()
    group_id = create_store_data["groupId"]
    store_name = create_store_data["storeName"]
    store_address = create_store_data["storeAddress"]
    store_phone_number = create_store_data["storePhoneNumber"]
    store_type = create_store_data["storeType"]
    store_open_time = create_store_data["storeOpenTime"]
    store_delivery_condition = create_store_data["storeDeliveryCondition"]
    store_note =  create_store_data["storeNote"]
    join_time = datetime.datetime.now().strftime("%Y%m%d%H%M%S")
    print("??",store_delivery_condition)
    # Check store repeat
    sql_command="""
    SELECT store_name
    FROM store 
    WHERE store_name=%s AND group_id=%s AND store_status=%s;
    """
    value_input = (store_name,group_id,"alive")
    store_name_check = query_data(sql_command,value_input)
    print("c1")
    # If no repeat save it
    if store_name_check == []:
        print("c2")
        # Input information 
        sql_command = """
        INSERT INTO store (store_name, store_address, store_phone_number, store_type, store_open_time, store_delivery_condition, store_status, group_id, store_note, store_order_time, store_order_frequence, store_distance, store_price_range, store_latest_data)
        VALUES (%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s);
        """
        value_input = (store_name, store_address, store_phone_number, store_type, store_open_time, store_delivery_condition, "alive",group_id,store_note, "null", "null", "null", "null", join_time)
        insert_or_update_data(sql_command,value_input)
        print("c3")
        data = v_store.store_post_200()
        return data
    else:
        errorr_message = v_store.store_post_400()
        return errorr_message

# Check store info
def store_get(page, keyword=None, urlGroupName=None):
    # Define page Qty
    one_page_quanity=12
    data_start=int(page*one_page_quanity)
    
    # keyword generate can be OK to name and type
    store_name_keyword = "%"+keyword+"%"
    store_type_keyword = keyword

    sql_command="""
    SELECT id
    FROM user_group 
    WHERE group_name=%s AND group_status=%s
    """
    value_input = (urlGroupName,"alive")
    group_info_check = query_data(sql_command,value_input)
    group_id = group_info_check[0]["id"]
    print("C1",group_id)
    # Use group_id to check store info
    sql_command="""
    SELECT id, store_name, store_address, store_phone_number, store_type, store_price_range, store_open_time, store_delivery_condition, store_order_time, store_order_frequence, store_distance, store_latest_data, store_status, store_note
    FROM store
    WHERE group_id = %s AND (store_name LIKE %s OR store_type LIKE %s OR store_name IS NULL OR store_type IS NULL) AND store_status=%s
    LIMIT %s, %s;
    """
    value_input=(group_id,store_name_keyword,store_type_keyword,"alive",data_start,one_page_quanity+1)
    store_info_check = query_data(sql_command,value_input)
    # print("store_info_check",store_info_check)
    print("OK")
    # No data
    if store_info_check == []:
        print("X")
        store_data = {
            "nextPage":None,
            "store":None
        }
        return jsonify(store_data) ,200

    # page judge
    if len(store_info_check)==one_page_quanity+1:
        next_page=page+1
        store_info_check.pop()
    else:
        next_page=None

    store_data = {
        "nextPage":next_page,
        "store":[]
    }
    # Create data
    if store_info_check != []:
        for store_ls in store_info_check:
            store_id = store_ls["id"]
            store_name = store_ls["store_name"]
            store_address = store_ls["store_address"]
            store_phone_number = store_ls["store_phone_number"]
            store_type = store_ls["store_type"]
            store_price_range = store_ls["store_price_range"]
            store_open_time = store_ls["store_open_time"]
            store_delivery_condition = store_ls["store_delivery_condition"]
            store_order_time = store_ls["store_order_time"]
            store_order_frequence = store_ls["store_order_frequence"]
            store_distance = store_ls["store_distance"]
            store_latest_data = store_ls["store_latest_data"]
            store_status = store_ls["store_status"]
            store_note = store_ls["store_note"]

            store_ls_data =  {
                "storeId":store_id,
                "storeName":store_name,
                "storeaddress":store_address,
                "storePhoneNumber":store_phone_number,
                "storeType":store_type,
                "storePriceRange":store_price_range,
                "storeOpenTime":store_open_time,
                "storeDeliveryCondition":store_delivery_condition,
                "storeOrderTime":store_order_time,
                "storeOrderFrequence":store_order_frequence,
                "storeDistance":store_distance,
                "storeLatestData":store_latest_data,
                "storeStatus":store_status,
                "storeNote":store_note
                }
            store_data["store"].append(store_ls_data)

    return jsonify(store_data) ,200

# Change store info
def store_patch():
    # Use cookie to get syore info
    group_info = group_token_check()
    group_id = group_info["data"]["id"]
    # Get data from front-end
    change_store_data = request.get_json()
    store_name = change_store_data["storeName"]
    store_new_name = change_store_data["storeNewName"]
    store_new_address = change_store_data["storeNewaddress"]
    store_new_phone_number = change_store_data["storeNewPhoneNumber"]
    store_new_type = change_store_data["storeNewType"]
    store_new_open_time = change_store_data["storeNewOpenTime"]
    store_new_delivery_condition = change_store_data["storeNewDeliveryCondition"]
    store_new_status = change_store_data["storeNewStatus"]
    store_note =  change_store_data["storeNote"]
    # Find store id
    sql_command="""
    SELECT id
    FROM store
    WHERE store_name = %s AND group_id = %s AND store_status=%s;
    """
    value_input=(store_name, group_id,"alive")
    store_id_check = query_data(sql_command,value_input)
    store_id = store_id_check[0]["id"]

    # Change name
    if store_new_name != None:
        sql_command="""
        UPDATE store
        SET store_name = %s
        WHERE id = %s AND store_status=%s;
        """
        value_input = (store_new_name,store_id,"alive")
        insert_or_update_data(sql_command,value_input)
        data = v_store.store_patch_200()
        return data

    # Change address
    if store_new_address != None:
        sql_command="""
        UPDATE store
        SET store_address = %s
        WHERE id = %s AND store_status=%s;
        """
        value_input = (store_new_address,store_id,"alive")
        insert_or_update_data(sql_command,value_input)
        data = v_store.store_patch_200()
        return data

    # Change phone number
    if store_new_phone_number != None:
        sql_command="""
        UPDATE store
        SET store_phone_number = %s
        WHERE id = %s AND store_status=%s;
        """
        value_input = (store_new_phone_number,store_id,"alive")
        insert_or_update_data(sql_command,value_input)
        data = v_store.store_patch_200()
        return data

    # Change type
    if store_new_type != None:
        sql_command="""
        UPDATE store
        SET store_type = %s
        WHERE id = %s AND store_status=%s;
        """
        value_input = (store_new_type,store_id,"alive")
        insert_or_update_data(sql_command,value_input)
        data = v_store.store_patch_200()
        return data

    # Change open time
    if store_new_open_time != None:
        sql_command="""
        UPDATE store
        SET store_open_time = %s
        WHERE id = %s AND store_status=%s;
        """
        value_input = (store_new_open_time,store_id,"alive")
        insert_or_update_data(sql_command,value_input)
        data = v_store.store_patch_200()
        return data

    # Change delivery condition
    if store_new_delivery_condition != None:
        sql_command="""
        UPDATE store
        SET store_delivery_condition = %s
        WHERE id = %s AND store_status=%s;
        """
        value_input = (store_new_delivery_condition,store_id,"alive")
        insert_or_update_data(sql_command,value_input)
        data = v_store.store_patch_200()
        return data

    # Change status
    if store_new_status == "stop":
        sql_command="""
        UPDATE store
        SET store_status = %s
        WHERE id = %s AND store_status=%s;
        """
        value_input = ("stop",store_id,"alive")
        insert_or_update_data(sql_command,value_input)
        data = v_store.store_patch_200()
        return data        
    
    # Change note
    if store_note != None:
        sql_command="""
        UPDATE store
        SET store_note = %s
        WHERE id = %s AND store_status=%s;
        """
        value_input = (store_note,store_id,"alive")
        insert_or_update_data(sql_command,value_input)
        data = v_store.store_patch_200()
        return data
    else:
        errorr_message = v_store.store_patch_400_else()
        return errorr_message
