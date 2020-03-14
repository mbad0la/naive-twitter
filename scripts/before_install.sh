#!/bin/bash

function install_package_if_needed() {
    local p=${1:-Package required}
    local v=${2:-Version required}
    shift 2
    local i=$($p --version 2>/dev/null)
    [ "$i" == "$v" ] || npm "$@" install "$p@$v"
}

# Install Node v10.x
curl -sL https://deb.nodesource.com/setup_10.x | bash -
apt-get install -y nodejs

# Install pm2 ( if first deployment )
install_package_if_needed pm2 4.2.3 -g