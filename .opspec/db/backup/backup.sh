#!/bin/sh

if [ ! -d /app/database/mysql-data ]; then
    echo "Nothing to backup!"
    exit 1
fi

if [ -d /app/database/mysql-data-backup ]; then
    rm -rf /app/database/mysql-data-backup
fi

mkdir /app/database/mysql-data-backup

echo "Backing up database...(START)"
cp -ra /app/database/mysql-data/* /app/database/mysql-data-backup/
echo "Backing up database...(DONE)"
