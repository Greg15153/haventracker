This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

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
