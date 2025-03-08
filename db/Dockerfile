# db/Dockerfile
FROM mcr.microsoft.com/mssql/server:2019-latest

USER root

RUN apt-get update && \
    apt-get install -y curl apt-transport-https gnupg && \
    curl https://packages.microsoft.com/keys/microsoft.asc | apt-key add - && \
    curl https://packages.microsoft.com/config/ubuntu/20.04/prod.list > /etc/apt/sources.list.d/mssql-release.list && \
    apt-get update && \
    ACCEPT_EULA=Y apt-get install -y mssql-tools unixodbc-dev

ENV ACCEPT_EULA=Y
ENV SA_PASSWORD=StrongP@ssword123

EXPOSE 1433

COPY ScriptProNeighbor2.sql /init-db.sql
COPY init-db.sh /init-db.sh
RUN chmod +x /init-db.sh
CMD ["/init-db.sh"]