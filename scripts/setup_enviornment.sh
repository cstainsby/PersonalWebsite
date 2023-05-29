#!/bin/bash
cd /home/ec2-user/app

# update dependancies
sudo yum update nginx
sudo npm install

# copy new nginx file to the 
cp nginx.conf /etc/nginx/conf.d/
sudo systemctl restart nginx