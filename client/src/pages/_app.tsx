import { Auth0Provider } from '@auth0/auth0-react'
import { AppState } from '@auth0/auth0-react/dist/auth0-provider'
import { AppProps } from 'next/app'
import Router from 'next/router'
import React from 'react'
import { SocketIOProvider } from 'use-socketio'

import { Nav } from '../components/Nav'
import configuration, { validateConfiguration } from '../utils/configuration/configuration'

validateConfiguration()

const onRedirectCallback = (appState: AppState) => {
    Router.replace(appState?.returnTo || '/')
}

export default function App({ Component, pageProps }: AppProps): JSX.Element {
    return (
        <Auth0Provider
            domain={configuration.auth0.domain}
            clientId={configuration.auth0.clientId}
            audience={configuration.auth0.audience}
            redirectUri={typeof window !== 'undefined' ? window.location.origin : ''}
            onRedirectCallback={onRedirectCallback}
        >
            <SocketIOProvider url="http://localhost:5000" opts={{ transportOptions: {} }}>
                <Nav />
                <Component {...pageProps} />
            </SocketIOProvider>
        </Auth0Provider>
    )
}
