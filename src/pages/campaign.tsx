import React from 'react'
import Head from 'next/head'
import { withAuthenticationRequired } from '@auth0/auth0-react'

function Campaign() {
    return (
        <div className="container">
            <Head>
                <title>Create Next App</title>
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <main>
                <div>{'Hello'}</div>
            </main>
        </div>
    )
}

export default withAuthenticationRequired(Campaign)
