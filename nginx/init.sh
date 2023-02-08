#!bin/bsdh
mkdir /etc/nginx/sites-available
mkdir /etc/nginx/sites-enabled

mv /etc/nginx/test.conf /etc/nginx/sites-available/test.conf
ln -s /etc/nginx/sites-available/test.conf /etc/nginx/sites-enabled/test.conf

mv /etc/nginx/default.conf /etc/nginx/conf.d/default.conf
