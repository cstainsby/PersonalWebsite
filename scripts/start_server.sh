#!/bin/bash
cd /home/ec2-user/PersonalWebsite/
pm2 delete all
pm2 start server.js