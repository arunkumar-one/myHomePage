#!/bin/bash

start()
{
    if [ -f "node_$PORT.pid" ];then
        kill $(cat node_$PORT.pid)
    fi
    setsid sudo -E node app.js &
    echo $! > node_$PORT.pid
}

export PORT=80
start 
export PORT=443
start

exit 0
