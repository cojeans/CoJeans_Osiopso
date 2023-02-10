CREATE DATABASE osiopso;

create user 'ssafy'@'%' identified by 'ssafy';
grant all privileges on DB_CREATEDB.* to 'ssafy'@'%' identified by 'ssafy';
flush privileges;