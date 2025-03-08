# db/init-db.sh
#!/bin/bash

echo "Starting SQL Server..."
/opt/mssql/bin/sqlservr &

echo "Waiting for SQL Server to start..."
until /opt/mssql-tools/bin/sqlcmd -S localhost -U sa -P "$SA_PASSWORD" -Q "SELECT 1" &> /dev/null
do
    echo "SQL Server is not ready yet. Waiting..."
    sleep 2
done

echo "Running database initialization script..."
/opt/mssql-tools/bin/sqlcmd -S localhost -U sa -P "$SA_PASSWORD" -d master -i /init-db.sql

echo "Database setup complete!"
wait