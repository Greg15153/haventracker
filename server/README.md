### Database

You can start a local DB instance by utilizing the docker-compose file to launch a MSSQL instance.

`docker-compuse up -d`

To properly utilize it fill your .env with the default values:

```
DATABASE_NAME=haventracker
DATABASE_HOST=localhost
DATABASE_USERNAME=sa
DATABASE_PASSWORD=yourStrong(!)Password
```
