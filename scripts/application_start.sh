#!/bin/bash

# Move to application code directory
cd /home/ubuntu/naive-twitter

# Start application
pm2 start app.js --name "app"