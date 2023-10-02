#!/bin/sh

if [ -d /app/database/mysql-data ]; then
    rm -rf /app/database/mysql-data
fi

if [ -d /app/database/mysql-data-backup ]; then
    rm -rf /app/database/mysql-data-backup
fi
