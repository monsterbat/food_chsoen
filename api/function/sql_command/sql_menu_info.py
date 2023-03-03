# import project function
import sys
sys.path.append('api/function')
from MySQL_con import *
from hash_code import *
from user_token import *

# import python function
from flask import *

# ==== SELECT FROM =====
# Menu ID
def sql_menu_info_find_menu_id( group_id, store_id,menu_name, menu_size,menu_status):
    sql_command="""
    SELECT id
    FROM menu
    WHERE group_id = %s AND store_id = %s AND menu_name = %s AND menu_size=%s AND menu_status=%s;
    """
    value_input=(group_id, store_id,menu_name, menu_size,menu_status)
    menu_id_check = query_data(sql_command,value_input)
    if (menu_id_check == []):
        return menu_id_check
    menu_id = menu_id_check[0]["id"]
    return menu_id

# Check repeat
def sql_menu_name_and_size_check_repeat(group_id,store_id,menu_name,menu_size,menu_status):
    sql_command="""
    SELECT id
    FROM menu 
    WHERE group_id=%s AND store_id = %s AND menu_name=%s AND menu_size =%s AND menu_status=%s;
    """
    value_input = (group_id,store_id,menu_name,menu_size,menu_status)
    menu_heck = query_data(sql_command,value_input)
    return menu_heck

# Menu info (From menu ID)
def sql_menu_id_find_info(menu_id):
    sql_command="""
    SELECT store_id, menu_name, menu_size
    FROM menu 
    WHERE id=%s;
    """
    value_input = (menu_id,)
    menu_info_check = query_data(sql_command,value_input)
    return menu_info_check

# Menu info (From menu Info) muti data
def sql_group_id_and_store_id_and_menu_name_FIND_menu_info(group_id,store_id, menu_name_keyword,menu_status):
    sql_command="""
    SELECT id, menu_name, menu_size, menu_type, menu_price, menu_status, menu_note
    FROM menu
    WHERE group_id = %s AND store_id = %s AND menu_name LIKE %s AND menu_status=%s;
    """
    value_input=(group_id,store_id, menu_name_keyword,menu_status)
    menu_info_check = query_data(sql_command,value_input)
    return menu_info_check

# ==== INSERT INTO ====
# Insert menu data
def sql_insert_into_menu(group_id, store_id,menu_name, menu_size, menu_type,menu_price,menu_note,menu_status):
    sql_command = """
    INSERT INTO menu (group_id, store_id,menu_name, menu_size,menu_type, menu_price,menu_note,menu_status)
    VALUES (%s,%s,%s,%s,%s,%s,%s,%s);
    """
    value_input = (group_id, store_id,menu_name, menu_size, menu_type,menu_price,menu_note,menu_status)
    insert_or_update_data(sql_command,value_input)

# ==== PATCH UPDATE ====
def sql_menu_id_update_menu_type(update_data, menu_id, menu_status):
    sql_command="""
    UPDATE menu
    SET menu_type = %s
    WHERE id = %s AND menu_status=%s;
    """
    value_input = (update_data, menu_id, menu_status)
    insert_or_update_data(sql_command,value_input)     