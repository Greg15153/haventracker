import { withAuthenticationRequired } from '@auth0/auth0-react'
import Head from 'next/head'
import React, { useState } from 'react'
import { useSocket } from 'use-socketio'

interface Event {
    name: string
    message: string
}

function Campaign() {
    const [events, setEvents] = useState([] as Event[])
    const { socket } = useSocket('events', (event: Event) => setEvents([...events, event]))

    const addEvent = () => {
        socket.emit('events', {
            name: 'Button Clicked',
            message: 'You clicked the button on ' + Date.now()
        })
    }

    const createNewCampaign = () => {}

    return (
        <div className="container">
            <Head>
                <title>{'Campaigns'}</title>
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <button onClick={createNewCampaign}>{'Create a new campaign'}</button>
            <button onClick={addEvent}>{'Click to add event'}</button>
            {events.map((e, i) => {
                return <div key={i}>{`${e.name}: ${e.message}`}</div>
            })}
        </div>
    )
}

export default withAuthenticationRequired(Campaign)
