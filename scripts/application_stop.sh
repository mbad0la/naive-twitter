#!/bin/bash

# Stop application
pm2 stop naive-twitter
pm2 delete naive-twitter

# Delete application code
rm -rf /home/ubuntu/naive-twitter