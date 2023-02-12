#!bin/bash
mkdir /etc/nginx/sites-available
mkdir /etc/nginx/sites-enabled

# mv /etc/nginx/test.conf /etc/nginx/sites-available/test.conf #/nginx에 있는 파일을 conf.d

ln -s /etc/nginx/test.conf /etc/nginx/conf.d/test.conf #추가
ln -s /etc/nginx/test.conf /etc/nginx/sites-available/test.conf #추가한거
ln -s /etc/nginx/test.conf /etc/nginx/sites-enabled/test.conf

# mv /etc/nginx/default.conf /etc/nginx/conf.d/default.conf

