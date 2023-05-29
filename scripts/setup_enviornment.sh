#!/bin/bash
cd /home/ec2-user/PersonalWebsite

# update dependancies
sudo yum update nginx
sudo npm install

# copy new nginx file to the 
cp nginx.conf /etc/nginx/conf.d/
# rename the file
mv /etc/nginx/conf.d/nginx.conf /etc/nginx/conf.d/colestainsby.com.conf
sudo systemctl restart nginx