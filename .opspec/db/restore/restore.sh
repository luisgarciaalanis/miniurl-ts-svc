#!/bin/sh

if [ ! -d /app/database/mysql-data-backup ]; then
    echo "Nothing to restore!"
    exit 1
fi

if [ -d /app/database/mysql-data ]; then
    rm -rf /app/database/mysql-data
fi

mkdir /app/database/mysql-data

echo "Restoring database...(START)"
cp -ra /app/database/mysql-data-backup/* /app/database/mysql-data/
echo "Restoring database...(DONE)"
