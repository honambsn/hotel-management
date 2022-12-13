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
