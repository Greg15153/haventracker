import React, { useState } from 'react'
import { withAuthenticationRequired } from '@auth0/auth0-react'
import Head from 'next/head'
import { useSocket } from 'use-socketio'
import { NewCampaign } from '../components/NewCampaign'

interface Event {
    name: string
    message: string
}

function Campaign() {
    const [events, setEvents] = useState<Event[]>([])
    const [startingNew, setStartingNew] = useState<boolean>(false)
    const { socket } = useSocket('events', (event: Event) => setEvents([...events, event]))

    const addEvent = () => {
        socket.emit('events', {
            name: 'Button Clicked',
            message: 'You clicked the button on ' + Date.now()
        })
    }

    const createNewCampaign = () => {
        setStartingNew(() => true)
    }

    return (
        <div className="container">
            <Head>
                <title>{'Campaigns'}</title>
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <button onClick={createNewCampaign}>{'Create a new campaign'}</button>
            {startingNew ? <NewCampaign /> : null}
            <button onClick={addEvent}>{'Click to add event'}</button>
            {events.map((e, i) => {
                return <div key={i}>{`${e.name}: ${e.message}`}</div>
            })}
        </div>
    )
}

export default withAuthenticationRequired(Campaign)
