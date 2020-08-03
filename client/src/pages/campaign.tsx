import React, { useState } from 'react'
import { withAuthenticationRequired } from '@auth0/auth0-react'
import { Button, useColorMode } from '@chakra-ui/core'
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
    const { colorMode, toggleColorMode } = useColorMode()
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
            <Button aria-label="create new campaign" variant="outline" variantColor="green" onClick={createNewCampaign}>
                {'Create a new campaign'}
            </Button>
            {colorMode}
            <Button onClick={toggleColorMode}>{'toggle'}</Button>
            {startingNew ? <NewCampaign /> : null}
            <Button onClick={addEvent}>{'Click to add event'}</Button>
            {events.map((e, i) => {
                return <div key={i}>{`${e.name}: ${e.message}`}</div>
            })}
        </div>
    )
}

export default withAuthenticationRequired(Campaign)
