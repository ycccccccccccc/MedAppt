# MedAppt

## 🚀 How to reproduce the project? (Localhost)
1. Download MedAppt from https://github.com/ycccccccccccc/MedAppt
2. The local side needs to support Node.js, PostgreSQL.
3. Configure the `.env` parameters: `SECRET` for JWT, `DATABASE_URL` for Prisma, `DB_USER`, `DB_HOST`, `DB_DATABASE`, `DB_PASSWORD`, and `DB_PORT` for PostgreSQL.

Example:
```
    DATABASE_URL="postgresql://postgres:PASSWORD@localhost:5432/postgres"
    DB_USER="postgres"
    DB_HOST="localhost"
    DB_DATABASE="postgres"
    DB_PASSWORD="PASSWORD"
    DB_PORT="5432"
    SECRET="SECRET"
```
4. Under MedAppt folder, Run `npx prisma migrate dev --name init --preview-feature ` and `npm start`.
5. You can test it using Postman at `http://localhost:3000/`.

[API design](https://github.com/ycccccccccccc/MedAppt/blob/main/API_Doc.md)


## 🚀 How to reproduce the project? (Docker)
1. Download MedAppt from https://github.com/ycccccccccccc/MedAppt
2. Configure the `.env` parameters: `SECRET` for JWT, `DATABASE_URL` for Prisma, `DB_USER`, `DB_HOST`, `DB_DATABASE`, `DB_PASSWORD`, and `DB_PORT` for PostgreSQL.

Congigure example:
```
    DATABASE_URL="postgresql://postgres:PASSWORD@postgres:5432/postgres"
    DB_USER="postgres"
    DB_HOST="postgres"
    DB_DATABASE="postgres"
    DB_PASSWORD="PASSWORD"
    DB_PORT="5432"
    SECRET="pw"
```
3. Under MedAppt file, Run `docker-compose up --build`.
4. Congratulations! You can test it using Postman at `http://localhost:3000/`.