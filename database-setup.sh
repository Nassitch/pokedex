#!/bin/bash

echo "Granting privileges to user ${DB_USER}..."

mysql -u root -p"${MYSQL_ROOT_PASSWORD}" --execute \
"GRANT ALL PRIVILEGES ON *.* TO '${DB_USER}'@'%'; FLUSH PRIVILEGES;"