-- Inventory App database schema for MySQL / MySQL Workbench
-- This schema reflects the current API data model: orders -> products (1:N)

CREATE DATABASE IF NOT EXISTS inventory_app
  CHARACTER SET utf8mb4
  COLLATE utf8mb4_unicode_ci;

USE inventory_app;

CREATE TABLE IF NOT EXISTS orders (
  id BIGINT UNSIGNED NOT NULL,
  title VARCHAR(255) NOT NULL,
  order_date DATETIME NOT NULL,
  description TEXT NULL,
  location_lat DECIMAL(10, 7) NULL,
  location_lng DECIMAL(10, 7) NULL,
  location_address VARCHAR(255) NULL,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (id),
  KEY idx_orders_order_date (order_date)
) ENGINE=InnoDB;

CREATE TABLE IF NOT EXISTS products (
  id BIGINT UNSIGNED NOT NULL,
  order_id BIGINT UNSIGNED NOT NULL,
  serial_number VARCHAR(100) NULL,
  is_new TINYINT(1) NOT NULL DEFAULT 0,
  photo VARCHAR(512) NULL,
  title VARCHAR(255) NOT NULL,
  type VARCHAR(100) NOT NULL,
  specification VARCHAR(255) NULL,
  guarantee_start DATETIME NULL,
  guarantee_end DATETIME NULL,
  usd_price DECIMAL(12, 2) NULL,
  uah_price DECIMAL(12, 2) NULL,
  product_date DATETIME NULL,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (id),
  KEY idx_products_order_id (order_id),
  KEY idx_products_type (type),
  KEY idx_products_guarantee_end (guarantee_end),
  CONSTRAINT fk_products_orders
    FOREIGN KEY (order_id)
    REFERENCES orders(id)
    ON DELETE CASCADE
    ON UPDATE CASCADE
) ENGINE=InnoDB;
