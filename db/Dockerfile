FROM mcr.microsoft.com/mssql/server:2019-latest

# Set environment variables
ENV ACCEPT_EULA=Y
ENV MSSQL_PID=Developer
ENV SA_PASSWORD=StrongP@ssword123 
#Add the SA_PASSWORD here.

# Switch to root user to install dependencies
USER root

# Copy the SQL script and initialization script into the container
COPY ScriptProNeighbor2.sql /init-db.sql
COPY init-db.sh /init-db.sh

# Fix permission issues and install required packages
RUN apt-get update && apt-get install -y curl gnupg2 \
    && curl -fsSL https://packages.microsoft.com/keys/microsoft.asc | gpg --dearmor -o /usr/share/keyrings/microsoft.gpg \
    && echo "deb [signed-by=/usr/share/keyrings/microsoft.gpg] https://packages.microsoft.com/ubuntu/20.04/prod focal main" | tee /etc/apt/sources.list.d/mssql-release.list \
    && apt-get update && apt-get install -y mssql-tools unixodbc-dev \
    && apt-get clean && rm -rf /var/lib/apt/lists/* \
    && chmod +x /init-db.sh # Make the script executable

# Add mssql-tools to PATH
ENV PATH=$PATH:/opt/mssql-tools/bin

# Switch back to the SQL Server user for security
USER mssql

# Expose SQL Server port
EXPOSE 1433

# Start SQL Server and run the initialization script
CMD ["/bin/bash", "-c", "/opt/mssql/bin/sqlservr & /init-db.sh"]