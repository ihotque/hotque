/*
  define tables for hotque
  version: 0.0.1
  date: 2016/06/22
*/

DROP DATABASE IF EXISTS `hotque_api`;
CREATE DATABASE IF NOT EXISTS `hotque_api`;
USE `hotque_api`;

DROP TABLE IF EXISTS `domain`;
CREATE TABLE IF NOT EXISTS `domain` (
	id VARCHAR(64) PRIMARY KEY,
	name VARCHAR(256) NOT NULL UNIQUE,
	create_datetime DATETIME NOT NULL,
	block_datetime DATETIME DEFAULT 0,
	remove_datetime DATETIME DEFAULT 0
);

DROP TABLE IF EXISTS `account`;
CREATE TABLE IF NOT EXISTS `account` (
	id VARCHAR(64) PRIMARY KEY,
	name VARCHAR(256) NOT NULL UNIQUE,
	domain_id VARCHAR(64),
	is_domain_owner BOOLEAN DEFAULT 0,
	is_domain_master BOOLEAN DEFAULT 0,
	open_status INT DEFAULT 0, -- 0:public, 1:domain, 2:private
	profile_pic VARCHAR(1024) DEFAULT NULL,
	primary_email VARCHAR(1024) NOT NULL,
	secondary_email VARCHAR(1024) DEFAULT NULL,
	mobile_phone_number VARCHAR(32),
	fix_phone_number VARCHAR(32),
	zipcode VARCHAR(32),
	location_address VARCHAR(1024) DEFAULT NULL,
	home_address VARCHAR(1024) DEFAULT NULL,
	gender INT DEFAULT 0, -- 0:other, 1:male, 2:female
	given_name VARCHAR(256) DEFAULT NULL,
	middle_name VARCHAR(256) DEFAULT NULL,
	family_name VARCHAR(256) DEFAULT NULL,
	create_datetime DATETIME NOT NULL,
	update_datetime DATETIME DEFAULT 0,
	block_datetime DATETIME DEFAULT 0,
	remove_datetime DATETIME DEFAULT 0,
	login_datetime DATETIME DEFAULT 0,
	logout_datetime DATETIME DEFAULT 0,
	FOREIGN KEY(domain_id) REFERENCES domain(id)
);

DROP TABLE IF EXISTS `group`;
CREATE TABLE IF NOT EXISTS `group` (
	id VARCHAR(64) PRIMARY KEY,
	name VARCHAR(256) NOT NULL UNIQUE,
	creater_id VARCHAR(64) NOT NULL,
	create_datetime DATETIME NOT NULL,
	block_datetime DATETIME DEFAULT 0,
	remove_datetime DATETIME DEFAULT 0,
	FOREIGN KEY(creater_id) REFERENCES account(id)
);

DROP TABLE IF EXISTS `member`;
CREATE TABLE IF NOT EXISTS `member` (
	id VARCHAR(64) PRIMARY KEY,
	account_id VARCHAR(64) NOT NULL,
	group_id VARCHAR(64) NOT NULL,
	create_datetime DATETIME NOT NULL,
	blocker_id VARCHAR(64) NOT NULL,
	block_datetime DATETIME DEFAULT 0,
	remove_datetime DATETIME DEFAULT 0,
	FOREIGN KEY(creater_id) REFERENCES account(id)
	FOREIGN KEY(group_id) REFERENCES group(id)
);

DROP TABLE IF EXISTS `follow`;
CREATE TABLE IF NOT EXISTS `account_follow` (
	followee_id VARCHAR(64) NOT NULL,
	follower_id VARCHAR(64) NOT NULL,
	create_datetime DATETIME NOT NULL,
	remove_datetime DATETIME DEFAULT 0,
	FOREIGN KEY(followee_id) REFERENCES account(id),
	FOREIGN KEY(follower_id) REFERENCES account(id)
);

DROP TABLE IF EXISTS `block`;
CREATE TABLE IF NOT EXISTS `account_block` (
	blocker_id VARCHAR(64) NOT NULL,
	blockee_id VARCHAR(64) NOT NULL,
	create_datetime DATETIME NOT NULL,
	remove_datetime DATETIME DEFAULT 0,
	FOREIGN KEY(blocker_id) REFERENCES account(id),
	FOREIGN KEY(blockee_id) REFERENCES account(id)
);

DROP TABLE IF EXISTS `post`;
CREATE TABLE IF NOT EXISTS `post` (
	id VARCHAR(64) PRIMARY KEY,
	writer_id VARCHAR(64) NOT NULL,
	type INT NOT NULL, -- 0:blog, 1:schedule, 2:vote, 3:checklist, 4:question
	title VARCHAR(256),
	digest VARCHAR(256),
	content VARCHAR(21800) DEFAULT NULL,
	remover_id VARCHAR(64) DEFAULT NULL,
	create_datetime DATETIME NOT NULL,
	update_datetime DATETIME DEFAULT 0,
	block_datetime DATETIME DEFAULT 0,
	remove_datetime DATETIME DEFAULT 0,
	FOREIGN KEY(writer_id) REFERENCES account(id),
	FOREIGN KEY(remover_id) REFERENCES account(id)
);

DROP TABLE IF EXISTS `comment`;
CREATE TABLE IF NOT EXISTS `comment` (
	id VARCHAR(64) PRIMARY KEY,
	parent_id VARCHAR(64) DEFAULT NULL,
	writer_id VARCHAR(64) NOT NULL,
	content VARCHAR(256) DEFAULT NULL,
	remover_id VARCHAR(64) DEFAULT NULL,
	create_datetime DATETIME NOT NULL,
	update_datetime DATETIME DEFAULT 0,
	block_datetime DATETIME DEFAULT 0,
	remove_datetime DATETIME DEFAULT 0,
	FOREIGN KEY(writer_id) REFERENCES account(id),
	FOREIGN KEY(remover_id) REFERENCES account(id)
);

DROP TABLE IF EXISTS `chat`;
CREATE TABLE IF NOT EXISTS `chat` (
	id VARCHAR(64) PRIMARY KEY,
	speaker_id VARCHAR(64) NOT NULL,
	partner_id VARCHAR(64) NOT NULL,
	content VARCHAR(256) DEFAULT NULL,
	remover_id VARCHAR(64) DEFAULT NULL,
	create_datetime DATETIME NOT NULL,
	update_datetime DATETIME DEFAULT 0,
	block_datetime DATETIME DEFAULT 0,
	remove_datetime DATETIME DEFAULT 0,
	FOREIGN KEY(speaker_id) REFERENCES account(id),
	FOREIGN KEY(partner_id) REFERENCES account(id)
);
