CREATE DATABASE osiopso;

create user 'ssafy'@'%' identified by 'ssafy';
grant all privileges on osiopso.* to 'ssafy';
flush privileges;