# import project function
import sys
sys.path.append('api/function')
from MySQL_con import *
from hash_code import *
from user_token import *

sys.path.append('api/function/sql_command')
from sql_command.sql_user_info import *
from sql_command.sql_group_info import *
from sql_command.sql_order_info import *
from sql_command.sql_order_list_info import *
from sql_command.sql_store_info import *
from sql_command.sql_menu_info import *
from sql_command.sql_bill_info import *

sys.path.append('api/view')
import v_menu

# import python function
from flask import *

### Module function ###

# Create menu account
def menu_post():
    # Get data from front-end
    create_menu_data = request.get_json()
    store_name = create_menu_data["storeName"]
    group_id = create_menu_data["groupId"]
    menu_name = create_menu_data["menu"]["menuName"]
    menu_size = create_menu_data["menu"]["menuSize"]
    menu_type = create_menu_data["menu"]["menuType"]
    menu_price = create_menu_data["menu"]["menuPrice"]
    menu_status = create_menu_data["menu"]["menuStatus"]
    menu_note = create_menu_data["menu"]["menuNote"]
    # Use store_name find store id
    store_id = sql_store_name_find_id(store_name,group_id,menu_status)
    # Check menu repeat
    menu_name_check = sql_menu_name_and_size_check_repeat(group_id,store_id,menu_name,menu_size,menu_status)
    # If no repeat save it
    if menu_name_check == []:
        # Input information 
        sql_insert_into_menu(group_id, store_id,menu_name, menu_size, menu_type,menu_price,menu_note,menu_status)
        data = v_menu.menu_post_200()
        return data
    else:
        errorr_message = v_menu.menu_post_400()
        return errorr_message

# Check menu info
def menu_get(page, keyword=None, urlGroupName=None, urlStoreName=None):
    # Define page Qty
    # one_page_quanity=100
    # data_start=int(page*one_page_quanity)

    # keyword generate can be OK to name and type
    menu_name_keyword = "%"+keyword+"%"
 
    # group id
    group_id = sql_group_name_find_id(urlGroupName,"alive")
    # store id
    store_id = sql_store_name_find_id(urlStoreName,group_id,"alive")

    # Use group_id to check menu info
    menu_info_check = sql_group_id_and_store_id_and_menu_name_FIND_menu_info(group_id,store_id, menu_name_keyword,"alive" )
    
    # No data
    if menu_info_check == []:
        menu_data = {
            "menu":None
        }
        return jsonify(menu_data) ,200

    menu_data = {
        "menu":[]
    }
    # Create data
    if menu_info_check != []:
        for menu_ls in menu_info_check:
            menu_id = menu_ls["id"]
            menu_name = menu_ls["menu_name"]
            menu_size = menu_ls["menu_size"]
            menu_type = menu_ls["menu_type"]
            menu_price = menu_ls["menu_price"]
            menu_status = menu_ls["menu_status"]
            menu_note = menu_ls["menu_note"]

            menu_ls_data =  {
                "menuId":menu_id,
                "menuName":menu_name,
                "menuSize":menu_size,
                "menuType":menu_type,
                "menuPrice":menu_price,
                "menuStatus":menu_status,
                "menuNote":menu_note
                }
            menu_data["menu"].append(menu_ls_data)

    return jsonify(menu_data) ,200

# Change menu info
def menu_patch():
    # Get data from front-end
    change_menu_data = request.get_json()
    group_id = change_menu_data["groupId"]
    store_name = change_menu_data["storeName"]
    menu_name = change_menu_data["menu"]["menuName"]
    menu_size = change_menu_data["menu"]["menuSize"]
    menu_type = change_menu_data["menu"]["menuType"]
    menu_price = change_menu_data["menu"]["menuPrice"]  
    menu_note = change_menu_data["menu"]["menuNote"]  
    menu_new_name = change_menu_data["menu"]["menuNewName"]
    menu_new_size = change_menu_data["menu"]["menuNewSize"]
    menu_new_type = change_menu_data["menu"]["menuNewType"]
    menu_new_price = change_menu_data["menu"]["menuNewPrice"]
    menu_new_status = change_menu_data["menu"]["menuNewStatus"]
    menu_new_note = change_menu_data["menu"]["menuNewNote"]

    # Use store_name find store id
    store_id = sql_store_name_find_id(store_name,group_id,"alive")

    # Find menu id 
    menu_id = sql_menu_info_find_menu_id(group_id, store_id,menu_name, menu_size,"alive")

    # Change name
    if menu_new_name != menu_name or menu_new_size != menu_size:
        # Find menu name and size repeat
        menu_check=sql_menu_name_and_size_check_repeat(group_id, store_id, menu_new_name, menu_new_size, "alive")

        if menu_check == []:
            if menu_new_name != menu_name:
                sql_command="""
                UPDATE menu
                SET menu_name = %s
                WHERE id = %s AND menu_status=%s;
                """
                value_input = (menu_new_name,menu_id,"alive")
                insert_or_update_data(sql_command,value_input)
            if menu_new_size != menu_size:
                sql_command="""
                UPDATE menu
                SET menu_size = %s
                WHERE id = %s AND menu_status=%s;
                """
                value_input = (menu_new_size,menu_id,"alive")
                insert_or_update_data(sql_command,value_input)
            # data = v_menu.menu_patch_200()
            # return data
        else:
            errorr_message = v_menu.menu_patch_400_same_name()
            return errorr_message
    if menu_new_type != menu_type:
        sql_menu_id_update_menu_info("menu_type",menu_new_type,menu_id,"alive")

    # Change price
    if menu_new_price != menu_price:
        sql_command="""
        UPDATE menu
        SET menu_price = %s
        WHERE id = %s AND menu_status=%s;
        """
        value_input = (menu_new_price,menu_id,"alive")
        insert_or_update_data(sql_command,value_input)
        # data = v_menu.menu_patch_200()
        # return data

    # Change status
    if menu_new_status == "stop":
        sql_command="""
        UPDATE menu
        SET menu_status = %s
        WHERE id = %s AND menu_status=%s;
        """
        value_input = ("stop",menu_id,"alive")
        insert_or_update_data(sql_command,value_input)
        # data = v_menu.menu_patch_200()
        # return data

    # Change note
    if menu_new_note != menu_note:
        sql_command="""
        UPDATE menu
        SET menu_note = %s
        WHERE id = %s AND menu_status=%s;
        """
        value_input = (menu_new_note,menu_id,"alive")
        insert_or_update_data(sql_command,value_input)

    else:
        data = jsonify({
            "ok":True,
            "menuId":menu_id
        })
        return data, 200
