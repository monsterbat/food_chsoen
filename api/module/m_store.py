# import project function
import sys
sys.path.append('api/function')
from MySQL_con import *
from hash_code import *
from user_token import *
from crawel_find_store import *

sys.path.append('api/function/sql_command')
from sql_command.sql_user_info import *
from sql_command.sql_group_info import *
from sql_command.sql_order_info import *
from sql_command.sql_order_list_info import *
from sql_command.sql_store_info import *
from sql_command.sql_menu_info import *
from sql_command.sql_bill_info import *

sys.path.append('api/view')
import v_store

# import python function
from flask import *
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
    # Check store repeat
    store_name_check = sql_check_store_repreat(store_name,group_id,"alive")   
    # If no repeat save it
    if store_name_check == []:
        # Input information 
        sql_store_inner_into(store_name, store_address, store_phone_number, store_type, store_open_time, store_delivery_condition, "alive",group_id,store_note, "", "", "", "", join_time)

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
    # Use group_id to check store info
    sql_command="""
    SELECT id, store_name, store_address, store_phone_number, store_type, store_price_range, store_open_time, store_delivery_condition, store_order_time, store_order_frequence, store_distance, store_latest_data, store_status, store_note
    FROM store
    WHERE group_id = %s AND (store_name LIKE %s OR store_type LIKE %s OR store_name IS NULL OR store_type IS NULL) AND store_status=%s
    LIMIT %s, %s;
    """
    value_input=(group_id,store_name_keyword,store_type_keyword,"alive",data_start,one_page_quanity+1)
    store_info_check = query_data(sql_command,value_input)
    # No data
    if store_info_check == []:
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
    # Get data from front-end
    print("C0")
    change_store_data = request.get_json()
    group_name = change_store_data["groupName"]
    store_name = change_store_data["storeName"]
    store_new_name = change_store_data["storeNewName"]
    store_new_address = change_store_data["storeNewaddress"]
    store_new_phone_number = change_store_data["storeNewPhoneNumber"]
    store_new_type = change_store_data["storeNewType"]
    store_new_open_time = change_store_data["storeNewOpenTime"]
    store_new_delivery_condition = change_store_data["storeNewDeliveryCondition"]
    store_new_status = change_store_data["storeNewStatus"]
    store_note =  change_store_data["storeNote"]
    print("C1")
    # Find Group id
    group_id = sql_group_name_find_id(group_name, "alive")
    # Find store id
    store_id = sql_store_name_find_id(store_name, group_id)

    try:
        # Change name
        if store_new_name != None:
            print("intostore_new_name",store_new_name)
            sql_command="""
            UPDATE store
            SET store_name = %s
            WHERE id = %s AND store_status=%s;
            """
            value_input = (store_new_name,store_id,"alive")
            insert_or_update_data(sql_command,value_input)

        # Change address
        if store_new_address != None:
            print("store_new_address",store_new_address)
            sql_command="""
            UPDATE store
            SET store_address = %s
            WHERE id = %s AND store_status=%s;
            """
            value_input = (store_new_address,store_id,"alive")
            insert_or_update_data(sql_command,value_input)

        # Change phone number
        if store_new_phone_number != None:
            sql_command="""
            UPDATE store
            SET store_phone_number = %s
            WHERE id = %s AND store_status=%s;
            """
            value_input = (store_new_phone_number,store_id,"alive")
            insert_or_update_data(sql_command,value_input)

        # Change type
        if store_new_type != None:
            sql_command="""
            UPDATE store
            SET store_type = %s
            WHERE id = %s AND store_status=%s;
            """
            value_input = (store_new_type,store_id,"alive")
            insert_or_update_data(sql_command,value_input)

        # Change open time
        if store_new_open_time != None:
            sql_command="""
            UPDATE store
            SET store_open_time = %s
            WHERE id = %s AND store_status=%s;
            """
            value_input = (store_new_open_time,store_id,"alive")
            insert_or_update_data(sql_command,value_input)

        # Change delivery condition
        if store_new_delivery_condition != None:
            sql_command="""
            UPDATE store
            SET store_delivery_condition = %s
            WHERE id = %s AND store_status=%s;
            """
            value_input = (store_new_delivery_condition,store_id,"alive")
            insert_or_update_data(sql_command,value_input)

        # Change status
        if store_new_status == "stop":
            print("store_new_status",store_new_status)
            sql_command="""
            UPDATE store
            SET store_status = %s
            WHERE id = %s AND store_status=%s;
            """
            value_input = ("stop",store_id,"alive")
            insert_or_update_data(sql_command,value_input)
        
        # Change note
        if store_note != "" and store_note != None:
            print("store_note",store_note)
            sql_command="""
            UPDATE store
            SET store_note = %s
            WHERE id = %s AND store_status=%s;
            """
            value_input = (store_note,store_id,"alive")
            insert_or_update_data(sql_command,value_input)
        data = v_store.store_patch_200()
        return data
    except:
        errorr_message = v_store.store_patch_400_else()
        return errorr_message

def store_drawLots_get(page, keyword=None, urlGroupName=None):
    # Define page Qty
    one_page_quanity=12
    data_start=int(page*one_page_quanity)
    
    # keyword generate can be OK to name and type
    store_name_keyword = "%"+keyword+"%"
    store_type_keyword = keyword
    group_id = sql_group_name_find_id(urlGroupName,"alive")
    store_info_check = sql_group_id_find_all_store_info(group_id,"alive")
    
    if store_info_check == []:
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

# Check store type
def store_type_get(page, keyword=None, urlGroupName=None):
    # Define page Qty
    one_page_quanity=12
    data_start=int(page*one_page_quanity)
    
    # keyword generate can be OK to name and type
    store_name_keyword = "%"+keyword+"%"
    store_type_keyword = keyword

    group_id = sql_group_name_find_id(urlGroupName,"alive")
    store_info_check = sql_group_id_find_all_store_info(group_id,"alive")

    
    # No data
    if store_info_check == []:
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

#  Create store account by foodChosen
def store_foodChosen_get(page, keyword=None, urlGroupName=None):
    store_name_data = store_keyword_get_correspond_name(keyword)
    return store_name_data


def store_foodChosen_post(page,keyword=None, urlGroupName=None):
    group_id = sql_group_name_find_id(urlGroupName, "alive")
    create_store_data = request.get_json()
    box_index = create_store_data["storeIndex"]
    store_name_keyword = create_store_data["intoKeywordValue"]
    store_name_data = store_name_create_menu(store_name_keyword,box_index,group_id)
    return store_name_data

def store_info_get(page,keyword=None,urlGroupName=None,urlStoreName=None):
    group_id = sql_group_name_find_id(urlGroupName, "alive")
    store_info_check = sql_group_id_find_one_store_info(group_id,urlStoreName,"alive")[0]
    store_id = store_info_check["id"]
    store_name = store_info_check["store_name"]
    store_address = store_info_check["store_address"]
    store_phone_number = store_info_check["store_phone_number"]
    store_type = store_info_check["store_type"]
    store_price_range = store_info_check["store_price_range"]
    store_open_time = store_info_check["store_open_time"]
    store_delivery_condition = store_info_check["store_delivery_condition"]
    store_order_time = store_info_check["store_order_time"]
    store_order_frequence = store_info_check["store_order_frequence"]
    store_distance = store_info_check["store_distance"]
    store_latest_data = store_info_check["store_latest_data"]
    store_status = store_info_check["store_status"]
    store_note = store_info_check["store_note"]
    store_info_data =  {
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
    return jsonify(store_info_data) ,200