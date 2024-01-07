# Rest api authentication

## installing and configuring
* requires `nodejs` and `mysql`

### Install dependency
```bash
yarn
```
### Configure `.env`
firt create a `.env` file
```bash
touch .env
```
copy of value from the `.env.example` file and set your values:
```env
PORT=<port-server>

DB_HOST=<host-mysql>
DB_PORT=<port-mysql>
DB_USER=<user-mysql>
DB_PASSWORD=<password-mysql>
DB_DATABASE=<database-mysql>
DATABASE_URL="mysql://${DB_USER}:${DB_PASSWORD}@${DB_HOST}:${DB_PORT}/${DB_DATABASE}"


JWT_SECRET=<you-key-secret>
JWT_EXPIRES_IN=<date-expires>
```

## Run migration
```bash
yarn prisma migrate dev
```

## Start server
```bash
yarn dev
```
