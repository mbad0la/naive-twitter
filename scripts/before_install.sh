#!/bin/bash

# Install Node v10.x
curl -sL https://deb.nodesource.com/setup_10.x | bash -
apt-get install -y nodejs

# Install pm2
npm i -g pm2