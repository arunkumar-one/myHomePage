#!/bin/bash


stop()
{
    local PORT=$1
    if [ -f "node_$PORT.pid" ];then
        kill $(cat node_$PORT.pid)
        rm  node_$PORT.pid
    fi
}


start()
{
    stopPort $1
    export PORT=$1
    setsid sudo -E node app.js &
    echo $! > node_$PORT.pid
}

$@
exit 0
