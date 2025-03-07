#!/bin/bash
echo "Waiting for SQL Server to start..."
sleep 20s  # Wait for SQL Server to initialize

echo "Running database initialization script..."
/opt/mssql-tools/bin/sqlcmd -S localhost -U sa -P StrongP@ssword123 -d master -i /docker-entrypoint-initdb.d/FinalProNeighbor.sql

echo "Database setup complete!"