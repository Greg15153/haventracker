import React from 'react'
import { Auth0Provider } from '@auth0/auth0-react'
import { AppState } from '@auth0/auth0-react/dist/auth0-provider'
import { ColorModeProvider, CSSReset, ThemeProvider } from '@chakra-ui/core'
import { AppProps } from 'next/app'
import Router from 'next/router'
import { SocketIOProvider } from 'use-socketio'
import { Nav } from '../components/Nav'
import scoundrel from '../themes/scoundrel'
import configuration, { validateConfiguration } from '../utils/configuration/configuration'

validateConfiguration()

const onRedirectCallback = (appState: AppState) => {
    Router.replace(appState?.returnTo || '/')
}

export default function App({ Component, pageProps }: AppProps): JSX.Element {
    return (
        <ThemeProvider theme={scoundrel}>
            <CSSReset />
            <ColorModeProvider>
                <Auth0Provider
                    domain={configuration.auth0.domain}
                    clientId={configuration.auth0.clientId}
                    audience={configuration.auth0.audience}
                    redirectUri={typeof window !== 'undefined' ? window.location.origin : ''}
                    onRedirectCallback={onRedirectCallback}>
                    <SocketIOProvider url="http://localhost:5000">
                        <Nav />
                        <Component {...pageProps} />
                    </SocketIOProvider>
                </Auth0Provider>
            </ColorModeProvider>
        </ThemeProvider>
    )
}
