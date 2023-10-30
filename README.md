
# Golang-Angular-CRUD

Frontend: Angular
Backend: Golang
Database: PostgreSQL


## Installation

make .env in /backend
example in .env.example

```bash
CORS_ALLOW_ORIGINS=http://localhost:4200
CORS_ALLOW_METHODS=GET,POST,PUT,DELETE
CORS_ALLOW_CREDENTIALS=true

# PG_HOST="localhost"
PG_HOST="postgres"
PG_USER="postgres"
PG_PASSWORD="root"
PG_DB_NAME="postgres"
PG_PORT="5432"
```

http://localhost:4200 = frontend path\
PG_HOST="postgres" = database hostname\
PG_USER="postgres" = database username\
PG_PASSWORD="postgres" = database password\
PG_DB_NAME="postgres" = database name\
PG_PORT="postgres" = database port

## Build
```bash
Build By Run Script
  ./build_script.sh
  
Build By Command
  docker-compose up -d --build
```
    