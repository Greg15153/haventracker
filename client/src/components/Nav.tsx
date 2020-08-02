import { useAuth0 } from '@auth0/auth0-react'
import Link from 'next/link'
import React, { useEffect } from 'react'

export function Nav(): JSX.Element {
    const { isAuthenticated, isLoading, user, loginWithRedirect, logout, getAccessTokenSilently } = useAuth0()

    useEffect(() => {
        async function test() {
            const token = '' //await getAccessTokenSilently()
            console.log(token)
        }

        test()
    }, [])

    if (isLoading) {
        return <div>{'Loading...'}</div>
    }

    return (
        <nav>
            <Link href="/">
                <a>{'Home'}</a>
            </Link>
            <Link href="/campaign">
                <a>{'Campaign'}</a>
            </Link>
            <Link href="/party">
                <a>{'Party'}</a>
            </Link>
            {isAuthenticated ? (
                <>
                    <span>{`Hello, ${user.name}`}</span>
                    <button id="logout" onClick={() => logout()}>
                        Logout
                    </button>
                </>
            ) : (
                <button id="login" onClick={loginWithRedirect}>
                    Login
                </button>
            )}
        </nav>
    )
}
