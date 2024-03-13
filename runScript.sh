#!/bin/bash


stopPort()
{
    local PORT=$1
    if [ -f "node_$PORT.pid" ];then
        kill $(cat node_$PORT.pid)
        rm  node_$PORT.pid
    fi
}


startPort()
{
    
    stopPort $1
    export PORT=$1
    setsid sudo -E node app.js &
    echo $! > node_$PORT.pid
}

startAll()
{
    startPort 80
    startPort 443
}

stopAll()
{
    stopPort 80
    stopPort 443
}

$@
exit 0
