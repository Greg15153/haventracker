import Auth0Configuration from './auth0Configuration'
import EnvironmentConfiguration, { NodeEnvironment } from './environment'
import MSSQLConfiguration from './mssqlConfiguration'

export interface Configuration {
    auth0: Auth0Configuration
    environment: EnvironmentConfiguration
    database: MSSQLConfiguration
}

function getNodeEnvironment() {
    switch (process.env.NODE_ENV.toLowerCase()) {
        case 'development':
            return NodeEnvironment.Development
        case 'staging':
            return NodeEnvironment.Staging
        case 'production':
        default:
            return NodeEnvironment.Production
    }
}

const configuration: Configuration = {
    auth0: {
        domain: process.env.NEXT_PUBLIC_AUTH0_DOMAIN ?? '',
        clientId: process.env.NEXT_PUBLIC_AUTH0_CLIENT_ID ?? '',
        audience: process.env.NEXT_PUBLIC_AUTH0_AUDIENCE ?? ''
    },
    environment: {
        nodeEnvironment: getNodeEnvironment()
    },
    database: {
        host: process.env.DATABASE_HOST ?? '',
        databaseName: process.env.DATABASE_NAME ?? '',
        username: process.env.DATABASE_USERNAME ?? '',
        password: process.env.DATABASE_PASSWORD ?? ''
    }
}

export const isProduction = configuration.environment.nodeEnvironment === NodeEnvironment.Production

// TODO: Make these smarter and consistent and tell which variables are used
export function validateAppConfiguration(): void {
    if (configuration.auth0.domain === '') {
        throw new Error('Auth0 Domain is required')
    }
    if (configuration.auth0.clientId === '') {
        throw new Error('Auth0 ClientId is required')
    }

    if (configuration.auth0.audience === '') {
        throw new Error('Auth0 Audience is required')
    }
}

export function validateApiConfiguration(): void {
    if (configuration.database.databaseName === '') {
        throw new Error('Database Name is required')
    }

    if (configuration.database.username === '') {
        throw new Error('Database Username is required')
    }

    if (configuration.database.password === '') {
        throw new Error('Database Password is required')
    }

    if (configuration.database.host === '') {
        throw new Error('Database Host is required')
    }
}

export default configuration
