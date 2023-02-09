# import project function
import sys
sys.path.append('api/function')
from MySQL_con import *
from hash_code import *
from user_token import *
from group_token import *
from store_token import *

sys.path.append('api/view')
import v_menu

# import python function
from flask import *
import jwt
import time

### Module function ###

# Create menu account
def menu_post():
    print("c1")
    # Get data from front-end
    create_menu_data = request.get_json()
    print("create_menu_data",create_menu_data)
    store_name = create_menu_data["storeName"]
    group_id = create_menu_data["groupId"]
    menu_name = create_menu_data["menu"]["menuName"]
    menu_size = create_menu_data["menu"]["menuSize"]
    menu_price = create_menu_data["menu"]["menuPrice"]
    menu_status = create_menu_data["menu"]["menuStatus"]
    menu_note = create_menu_data["menu"]["menuNote"]
    # Use store_name find store id
    print("c1menu_name",menu_name)
    sql_command="""
    SELECT id
    FROM store 
    WHERE group_id=%s AND store_name=%s AND store_status=%s;
    """
    value_input = (group_id,store_name,"alive")
    store_id_check = query_data(sql_command,value_input)
    store_id = store_id_check[0]["id"]
    print("store_id",store_id)
    # Check menu repeat
    sql_command="""
    SELECT menu_name
    FROM menu 
    WHERE menu_name=%s AND group_id=%s AND store_id = %s AND menu_size =%s AND menu_status=%s;
    """
    value_input = (menu_name,group_id,store_id,menu_size,"alive")
    menu_name_check = query_data(sql_command,value_input)
    print("menu_name_check",menu_name_check)
    # If no repeat save it
    if menu_name_check == []:
        print("INTO menu_name_check")
        # Input information 
        sql_command = """
        INSERT INTO menu (menu_name, menu_size, menu_price, menu_status, group_id, store_id, menu_note)
        VALUES (%s,%s,%s,%s,%s,%s,%s);
        """
        value_input = (menu_name, menu_size, menu_price, menu_status, group_id, store_id, menu_note)
        insert_or_update_data(sql_command,value_input)
        print("Done")
        data = v_menu.menu_post_200()
        return data
    else:
        errorr_message = v_menu.menu_post_400()
        return errorr_message

# Check menu info
def menu_get(page, keyword=None, urlGroupName=None, urlStoreName=None):
    print("urlGroupName",urlGroupName)
    print("urlStoreName",urlStoreName)
    # Define page Qty
    one_page_quanity=100
    data_start=int(page*one_page_quanity)

    # keyword generate can be OK to name and type
    menu_name_keyword = "%"+keyword+"%"

    # group id
    sql_command="""
    SELECT id
    FROM user_group 
    WHERE group_name=%s AND group_status=%s
    """
    value_input = (urlGroupName,"alive")
    group_info_check = query_data(sql_command,value_input)
    group_id = group_info_check[0]["id"]
    print("C1",group_id)

    # store id
    sql_command="""
    SELECT id
    FROM store 
    WHERE store_name=%s AND group_id=%s AND store_status=%s
    """
    value_input = (urlStoreName,group_id,"alive")
    store_info_check = query_data(sql_command,value_input)
    store_id = store_info_check[0]["id"]
    print("C2",store_id)

    # Use group_id to check menu info
    sql_command="""
    SELECT id, menu_name, menu_size, menu_price, menu_status, menu_note
    FROM menu
    WHERE group_id = %s AND store_id = %s AND menu_name LIKE %s AND menu_status=%s
    LIMIT %s, %s;
    """
    value_input=(group_id,store_id, menu_name_keyword,"alive" , data_start,one_page_quanity+1)
    menu_info_check = query_data(sql_command,value_input)
    print("menu_info_check",menu_info_check)
    # No data
    if menu_info_check == []:
        menu_data = {
            "nextPage":None,
            "group":None
        }
        return jsonify(menu_data) ,200

    # page judge
    if len(menu_info_check)==one_page_quanity+1:
        next_page=page+1
        menu_info_check.pop()
    else:
        next_page=None

    menu_data = {
        "nextPage":next_page,
        "menu":[]
    }
    # Create data
    if menu_info_check != []:
        for menu_ls in menu_info_check:
            menu_id = menu_ls["id"]
            menu_name = menu_ls["menu_name"]
            menu_size = menu_ls["menu_size"]
            menu_price = menu_ls["menu_price"]
            menu_status = menu_ls["menu_status"]
            menu_note = menu_ls["menu_note"]

            menu_ls_data =  {
                "menuId":menu_id,
                "menuName":menu_name,
                "menuSize":menu_size,
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
    menu_price = change_menu_data["menu"]["menuPrice"]  
    menu_note = change_menu_data["menu"]["menuNote"]  
    menu_new_name = change_menu_data["menu"]["menuNewName"]
    menu_new_size = change_menu_data["menu"]["menuNewSize"]
    menu_new_price = change_menu_data["menu"]["menuNewPrice"]
    menu_new_status = change_menu_data["menu"]["menuNewStatus"]
    menu_new_note = change_menu_data["menu"]["menuNewNote"]

    # Use store_name find store id
    print("c1menu_name",menu_name)
    sql_command="""
    SELECT id
    FROM store 
    WHERE group_id=%s AND store_name=%s AND store_status=%s;
    """
    value_input = (group_id,store_name,"alive")
    store_id_check = query_data(sql_command,value_input)
    store_id = store_id_check[0]["id"]

    # Find menu id 
    sql_command="""
    SELECT id
    FROM menu
    WHERE menu_name = %s AND menu_size=%s AND group_id = %s AND store_id = %s AND menu_status=%s;
    """
    value_input=(menu_name, menu_size, group_id, store_id,"alive")
    menu_id_check = query_data(sql_command,value_input)
    menu_id = menu_id_check[0]["id"]

    # Change name
    if menu_new_name != menu_name or menu_new_size != menu_size:
        # Find menu name and size repeat
        sql_command="""
        SELECT id
        FROM menu
        WHERE menu_name = %s AND menu_size=%s AND group_id = %s AND store_id = %s AND menu_status=%s;
        """
        value_input=(menu_new_name, menu_new_size, group_id, store_id,"alive")
        menu_check = query_data(sql_command,value_input)

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
        data = v_menu.menu_patch_200()
        return data
