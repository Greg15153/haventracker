import React from 'react'
import { Auth0Provider } from '@auth0/auth0-react'
import { AppState } from '@auth0/auth0-react/dist/auth0-provider'
import { Box, ChakraProvider, cookieStorageManager, CSSReset } from '@chakra-ui/core'
import { GetServerSideProps } from 'next'
import App, { AppContext, AppProps } from 'next/app'
import Router from 'next/router'
import { SocketIOProvider } from 'use-socketio'
import { Nav } from '../components/Nav'
import scoundrel from '../themes/scoundrel'
import configuration, { validateConfiguration } from '../utils/configuration/configuration'

validateConfiguration()

const onRedirectCallback = (appState: AppState) => {
    Router.replace(appState?.returnTo || '/')
}

type HavenApp = AppProps & {
    cookies?: string
}

export default function HaventrackerApp({ Component, pageProps, cookies }: HavenApp): JSX.Element {
    return (
        <ChakraProvider theme={scoundrel} storageManager={cookieStorageManager(cookies)}>
            <CSSReset />
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
        </ChakraProvider>
    )
}

HaventrackerApp.getInitialProps = async (appContext: AppContext) => {
    const appProps = await App.getInitialProps(appContext)
    const cookies = appContext.ctx.req?.headers.cookie
    return { ...appProps, cookies }
}
