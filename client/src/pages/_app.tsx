import configuration, { validateConfiguration } from '../utils/configuration/configuration'

import { AppProps } from 'next/app'
import { AppState } from '@auth0/auth0-react/dist/auth0-provider'
import { Auth0Provider } from '@auth0/auth0-react'
import { Nav } from '../components/Nav'
import React from 'react'
import Router from 'next/router'

const onRedirectCallback = (appState: AppState) => {
    Router.replace(appState?.returnTo || '/')
}

export default function App({ Component, pageProps }: AppProps): JSX.Element {
    validateConfiguration()

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
