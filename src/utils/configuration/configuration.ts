import Auth0Configuration from './auth0Configuration'
import EnvironmentConfiguration, { NodeEnvironment } from './environment'

export interface Configuration {
    auth0: Auth0Configuration
    environment: EnvironmentConfiguration
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
    }
}

export const isProduction = configuration.environment.nodeEnvironment === NodeEnvironment.Production

export function validateConfiguration(): void {
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

export default configuration
