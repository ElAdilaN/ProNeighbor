#!/bin/bash
echo "Waiting for SQL Server to start..."
sleep 30s  # Ensure the database engine is up

echo "Running database initialization script..."
/opt/mssql-tools/bin/sqlcmd -S localhost -U sa -P "$SA_PASSWORD" -d master -i /init-db.sql

echo "Database setup complete!"
tail -f /dev/null  # Keep the container running
