import mysql.connector
import mysql.connector.pooling

from dotenv import load_dotenv
import os
load_dotenv()
MySQL_host = os.getenv("MySQL_host")
MySQL_user = os.getenv("MySQL_user")
MySQL_password = os.getenv("MySQL_password")
MySQL_database = os.getenv("MySQL_database")
MySQL_pool_name = os.getenv("MySQL_pool_name")
MySQL_pool_size = os.getenv("MySQL_pool_size")

connector_pool = mysql.connector.pooling.MySQLConnectionPool(
	host = MySQL_host,
	user = MySQL_user,
	password = MySQL_password,
	database = MySQL_database,
	pool_name = MySQL_pool_name,
	pool_size = 5,
)
    
def query_data_read(sql_command):
    conn=connector_pool.get_connection()
    try:
        cursor=conn.cursor(dictionary=True)
        cursor.execute(sql_command)
        return cursor.fetchall()
    finally:
        conn.close()

def query_data(sql_command,input):
    conn=connector_pool.get_connection()
    try:
        cursor=conn.cursor(dictionary=True)
        cursor.execute(sql_command,input)
        return cursor.fetchall()
    finally:
        conn.close()

def insert_or_update_data(sql_command,input):
    conn=connector_pool.get_connection()
    try:
        cursor=conn.cursor(dictionary=True)
        cursor.execute(sql_command,input)
        conn.commit()
        return cursor.fetchall()
    finally:
        conn.close()
