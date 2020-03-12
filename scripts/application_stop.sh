#!/bin/bash

# Stop application
pm2 stop app
pm2 delete app

# Delete application code
rm -rf /home/ubuntu/naive-twitter