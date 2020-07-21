import React from 'react'
import ErrorDebug from './ErrorDebug'
import { isProduction } from '../../utils/configuration/configuration'

type Props = {
    error: Error
    context?: any // eslint-disable-line @typescript-eslint/no-explicit-any
}

/**
 * Default error layout, used by DefaultLayout to display errors instead of the page's content, when an error is caught
 *
 * Displays a report dialog modal allowing end-users to provide a manual feedback about what happened.
 * You may want to customise this component to display different error messages to the end users, based on statusCode or other information.
 *
 * @param props
 */
const DefaultErrorLayout = (props: Props): JSX.Element => {
    const { error } = props

    return (
        <div>
            <div className={'title'}>
                <h1>Service currently unavailable</h1>
                <pre>Error 500.</pre>
            </div>

            <div>
                <p>Try to refresh the page. Please contact our support below if the issue persists.</p>
                <button onClick={(): void => console.log(error)}>Contact support</button>
            </div>

            {isProduction && <ErrorDebug error={error} />}
        </div>
    )
}

export default DefaultErrorLayout
