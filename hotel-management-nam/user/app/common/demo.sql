DROP DATABASE IF EXISTS demo_node_api;
CREATE DATABASE demo_node_api DEFAULT CHARACTER SET utf8 COLLATE utf8_unicode_ci;

use demo_node_api;

CREATE TABLE IF NOT EXISTS author   
(
    id INT PRIMARY key AUTO_INCREMENT,
    name VARCHAR(100) UNIQUE 
);


CREATE TABLE if NOT EXISTS book
(
    id int PRIMARY key AUTO_INCREMENT,
    name varchar(100) not null,
    image varchar(100) null,
    author_id INT NOT NULL,
    FOREIGN KEY (author_id) REFERENCES author(id)
);


CREATE TABLE if NOT EXISTS users
(
    id int PRIMARY key AUTO_INCREMENT,
    name varchar(100) not null,
    email varchar(100) not null UNIQUE,
    password varchar(100) not null
);

CREATE TABLE if NOT EXISTS rooms
(
    id int PRIMARY key AUTO_INCREMENT,
    room_no VARCHAR(100) not null,
    room_type VARCHAR(100) not null, 
    price decimal(8) NOT NULL,     
    room_satus VARCHAR(100) not null, 
    clean_status VARCHAR(100) not null 
);


INSERT INTO author(name) VALUES 
("Nam Cao"),
("Ngo Tat To"),
("To Huu");

insert INTO book(name, author_id) VALUES
('Lão hạc và con chó vàng', 1),
('chí phèo',1),
('lượm',3),
('chị dậu',2);


insert INTO users(name, email, password) VALUES
('Admin', 'admin@email.com',  '123abc@@')



insert INTO rooms(id, room_no, room_type, price, room_satus, clean_status) VALUES
(1,'P101','VIP', '1000', 'booked', 'not'),
(2,'P301','Standard', '200', 'using', 'cleaned');