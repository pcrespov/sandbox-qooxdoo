

docker run --rm -it -d --name my_db -p 5432:5432 postgres:10 

docker exec -it my_db -<<EOF
psql -U postgres -h localhost -c \
"CREATE DATABASE aiohttpdemo_polls; \
CREATE USER aiohttpdemo_user WITH PASSWORD 'aiohttpdemo_pass'; \
GRANT ALL PRIVILEGES ON DATABASE aiohttpdemo_polls TO aiohttpdemo_user; \
"
EOF