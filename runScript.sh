#!/bin/bash
export PORT=80
setsid sudo -E node app.js &

export PORT=443
setsid sudo -E node app.js &

exit 0
