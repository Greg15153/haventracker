## Development

### VS Code

Preconfigured extensions for workspace.

-   [ESLint: dbaeumer.vscode-eslint ](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint)
-   [Prettier: esbenp.prettier-vscode](https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode)

### Database

You can start a local DB instance by utilizing the docker-compose file to launch a MSSQL instance.

`docker-compuse up -d`

To properly utilize it fill your .env.local with the default values:

```
DATABASE_NAME=haventracker
DATABASE_HOST=localhost
DATABASE_USERNAME=sa
DATABASE_PASSWORD=yourStrong(!)Password
```
