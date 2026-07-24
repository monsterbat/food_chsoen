-- Food Chosen 資料庫建表語句
-- 建立資料庫
CREATE DATABASE IF NOT EXISTS food_chosen;
USE food_chosen;

-- 1. 使用者資料表
CREATE TABLE IF NOT EXISTS user (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_name VARCHAR(100) NOT NULL,
    user_email VARCHAR(255) NOT NULL UNIQUE,
    user_password VARCHAR(255) NOT NULL,
    user_status VARCHAR(50) DEFAULT 'alive'
);

-- 2. 群組資料表
CREATE TABLE IF NOT EXISTS user_group (
    id INT AUTO_INCREMENT PRIMARY KEY,
    group_name VARCHAR(100) NOT NULL,
    group_password VARCHAR(255),
    group_manager INT,
    group_status VARCHAR(50) DEFAULT 'alive'
);

-- 3. 使用者與群組關聯資料表
CREATE TABLE IF NOT EXISTS user_in_group (
    id INT AUTO_INCREMENT PRIMARY KEY,
    group_id INT NOT NULL,
    user_id INT NOT NULL,
    join_time DATETIME,
    user_in_group_status VARCHAR(50) DEFAULT 'alive'
);

-- 4. 店家資料表
CREATE TABLE IF NOT EXISTS store (
    id INT AUTO_INCREMENT PRIMARY KEY,
    store_name VARCHAR(255) NOT NULL,
    store_address VARCHAR(500),
    store_phone_number VARCHAR(50),
    store_type VARCHAR(100),
    store_open_time VARCHAR(255),
    store_delivery_condition VARCHAR(255),
    store_status VARCHAR(50) DEFAULT 'alive',
    group_id INT NOT NULL,
    store_note TEXT,
    store_order_time VARCHAR(100),
    store_order_frequence INT DEFAULT 0,
    store_distance VARCHAR(100),
    store_price_range VARCHAR(100),
    store_latest_data DATETIME
);

-- 5. 菜單資料表
CREATE TABLE IF NOT EXISTS menu (
    id INT AUTO_INCREMENT PRIMARY KEY,
    group_id INT NOT NULL,
    store_id INT NOT NULL,
    menu_name VARCHAR(255) NOT NULL,
    menu_size VARCHAR(100),
    menu_type VARCHAR(100),
    menu_price INT,
    menu_note TEXT,
    menu_status VARCHAR(50) DEFAULT 'alive'
);

-- 6. 訂單列表資料表
CREATE TABLE IF NOT EXISTS order_list (
    id INT AUTO_INCREMENT PRIMARY KEY,
    store_id INT NOT NULL,
    group_id INT NOT NULL,
    user_id INT NOT NULL,
    stop_time DATETIME,
    order_list_number VARCHAR(100),
    order_list_status VARCHAR(50) DEFAULT 'alive',
    order_list_note TEXT
);

-- 7. 使用者訂單資料表
CREATE TABLE IF NOT EXISTS user_order (
    id INT AUTO_INCREMENT PRIMARY KEY,
    order_list_id INT NOT NULL,
    user_id INT NOT NULL,
    menu_id INT NOT NULL,
    order_quantity INT DEFAULT 1,
    order_price INT,
    order_status VARCHAR(50) DEFAULT 'alive',
    order_note TEXT
);

-- 8. 帳單資料表
CREATE TABLE IF NOT EXISTS bill (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    group_id INT NOT NULL,
    order_id INT,
    order_price INT,
    balance INT DEFAULT 0,
    bill_time DATETIME,
    bill_judgment VARCHAR(100),
    bill_status VARCHAR(50) DEFAULT 'alive'
);
