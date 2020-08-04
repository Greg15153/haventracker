import React from 'react'
import { Auth0Provider } from '@auth0/auth0-react'
import { AppState } from '@auth0/auth0-react/dist/auth0-provider'
import { Box, ChakraProvider, ColorModeProvider, CSSReset, useColorMode, useColorModeValue } from '@chakra-ui/core'
import { Global } from '@emotion/core'
import { GetServerSideProps } from 'next'
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

type HavenApp = AppProps & {
    cookies?: string
}

export default function App({ Component, pageProps, cookies }: HavenApp): JSX.Element {
    const background = useColorModeValue('red.500', 'blue.500')

    return (
        <ChakraProvider theme={scoundrel}>
            <Box bg={background}>
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
            </Box>
        </ChakraProvider>
    )
}

export const getServerSideProps: GetServerSideProps = async (context) => {
    return {
        props: {
            cookies: context.req.headers.cookie
        }
    }
}
