#!/bin/bash -xe

exec > >(tee /var/log/user-data.log|logger -t user-data -s 2>/dev/console) 2>&1

apt-get update

curl -sL https://deb.nodesource.com/setup_10.x | bash -

apt-get install -y nodejs
apt-get install -y ruby
apt-get install -y wget

npm i -g pm2@4.2.3

cd /tmp

wget https://aws-codedeploy-us-west-2.s3.us-west-2.amazonaws.com/latest/install
chmod +x ./install
./install auto

service codedeploy-agent start
service codedeploy-agent restart