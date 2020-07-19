import React from 'react'
import { useAuth0 } from '@auth0/auth0-react'
import Link from 'next/link'

export function Nav(): JSX.Element {
    const { isAuthenticated, isLoading, user, loginWithRedirect, logout } = useAuth0()

    if (isLoading) {
        return <div>{'Loading...'}</div>
    }

    return (
        <nav>
            <Link href="/">Home</Link>
            <Link href="/campaign">Campaign</Link>

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
