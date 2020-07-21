import React from 'react'
import { AppProps } from 'next/app'
import { Auth0Provider } from '@auth0/auth0-react'
import Router from 'next/router'
import { AppState } from '@auth0/auth0-react/dist/auth0-provider'
import { Nav } from '../components/Nav'
import configuration, { validateAppConfiguration } from '../utils/configuration/configuration'

const onRedirectCallback = (appState: AppState) => {
    Router.replace(appState?.returnTo || '/')
}

export default function App({ Component, pageProps }: AppProps): JSX.Element {
    validateAppConfiguration()

    return (
        <Auth0Provider
            domain={configuration.auth0.domain}
            clientId={configuration.auth0.clientId}
            audience={configuration.auth0.audience}
            redirectUri={typeof window !== 'undefined' ? window.location.origin : ''}
            onRedirectCallback={onRedirectCallback}
        >
            <Nav />
            <Component {...pageProps} />
        </Auth0Provider>
    )
}
