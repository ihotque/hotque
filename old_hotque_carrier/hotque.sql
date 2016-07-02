/*
  define tables for hotque
  version: 0.0.1
  date: 2016/06/22
*/

CREATE DATABASE IF NOT EXISTS hotque_service;
USE hotque_service;

CREATE TABLE IF NOT EXISTS domain (
	id INTEGER PRIMARY KEY,
	name TEXT NOT NULL UNIQUE,
	create_datetime NUMERIC NOT NULL,
	block_datetime NUMERIC DEFAULT 0,
	remove_datetime NUMERIC DEFAULT 0
);

CREATE TABLE IF NOT EXISTS account (
	id INTEGER PRIMARY KEY,
	name TEXT NOT NULL UNIQUE,
	domain_id INTEGER,
	is_domain_owner BOOLEAN DEFAULT 0,
	is_domain_master BOOLEAN DEFAULT 0,
	open_status INTEGER DEFAULT 0, -- 0:public, 1:domain, 2:private
	profile_pic TEXT DEFAULT NULL,
	primary_email TEXT NOT NULL,
	secondary_email TEXT DEFAULT NULL,
	mobile_phone_number NUMERIC DEFAULT 0,
	fix_phone_number NUMERIC DEFAULT 0,
	zipcode NUMERIC DEFAULT 0,
	location_address TEXT DEFAULT NULL,
	gender NUMERIC DEFAULT 0, -- 0:other, 1:male, 2:female
	given_name TEXT DEFAULT NULL,
	middle_name TEXT DEFAULT NULL,
	family_name TEXT DEFAULT NULL,
	group_id TEXT DEFAULT NULL, -- JSON list
	create_datetime NUMERIC NOT NULL,
	update_datetime NUMERIC DEFAULT 0,
	block_datetime NUMERIC DEFAULT 0,
	remove_datetime NUMERIC DEFAULT 0,
	login_datetime NUMERIC DEFAULT 0,
	logout_datetime NUMERIC DEFAULT 0,
	FOREIGN KEY(domain_id) REFERENCES domain(id)
);

CREATE TABLE IF NOT EXISTS group (
	id INTEGER PRIMARY KEY,
	name TEXT NOT NULL UNIQUE,
	creater_id INTEGER NOT NULL,
	member_id TEXT NOT NULL, -- JSON list
	create_datetime NUMERIC NOT NULL,
	block_datetime NUMERIC DEFAULT 0,
	remove_datetime NUMERIC DEFAULT 0,
	FOREIGN KEY(creater_id) REFERENCES account(id)
);

CREATE TABLE IF NOT EXISTS account_follow (
	followee_id INTEGER NOT NULL,
	follower_id INTEGER NOT NULL,
	create_datetime NUMERIC NOT NULL,
	remove_datetime NUMERIC DEFAULT 0,
	FOREIGN KEY(followee_id) REFERENCES account(id),
	FOREIGN KEY(follower_id) REFERENCES account(id)
);

CREATE TABLE IF NOT EXISTS account_block (
	blocker_id INTEGER NOT NULL,
	blockee_id INTEGER NOT NULL,
	create_datetime NUMERIC NOT NULL,
	remove_datetime NUMERIC DEFAULT 0,
	FOREIGN KEY(blocker_id) REFERENCES account(id),
	FOREIGN KEY(blockee_id) REFERENCES account(id)
);

CREATE TABLE IF NOT EXISTS post (
	id INTEGER PRIMARY KEY,
	writer_id INTEGER NOT NULL,
	type INTEGER NOT NULL, -- 0:blog, 1:schedule, 2:vote, 3:question
	title TEXT NOT NULL,
	content TEXT DEFAULT NULL,
	remover_id INTEGER DEFAULT 0,
	create_datetime NUMERIC NOT NULL,
	update_datetime NUMERIC DEFAULT 0,
	block_datetime NUMERIC DEFAULT 0,
	remove_datetime NUMERIC DEFAULT 0,
	FOREIGN KEY(writer_id) REFERENCES account(id),
	FOREIGN KEY(remover_id) REFERENCES account(id)
);

CREATE TABLE IF NOT EXISTS comment (
	id INTEGER PRIMARY KEY,
	parent_id INTEGER DEFAULT 0,
	writer_id INTEGER NOT NULL,
	content TEXT DEFAULT NULL,
	remover_id INTEGER DEFAULT 0,
	create_datetime NUMERIC NOT NULL,
	update_datetime NUMERIC DEFAULT 0,
	block_datetime NUMERIC DEFAULT 0,
	remove_datetime NUMERIC DEFAULT 0,
	FOREIGN KEY(writer_id) REFERENCES account(id),
	FOREIGN KEY(remover_id) REFERENCES account(id)
);

CREATE TABLE IF NOT EXISTS chat (
	id INTEGER PRIMARY KEY,
	speaker_id INTEGER NOT NULL,
	partner_id INTEGER NOT NULL,
	content TEXT DEFAULT NULL,
	create_datetime NUMERIC NOT NULL,
	update_datetime NUMERIC DEFAULT 0,
	block_datetime NUMERIC DEFAULT 0,
	remove_datetime NUMERIC DEFAULT 0,
	FOREIGN KEY(speaker_id) REFERENCES account(id),
	FOREIGN KEY(partner_id) REFERENCES account(id)
);
