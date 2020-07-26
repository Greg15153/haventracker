import { SubscribeMessage, WebSocketGateway, WebSocketServer, WsResponse } from '@nestjs/websockets'
import { Observable, of } from 'rxjs'
import { Client, Server } from 'socket.io'

interface Event {
    name: string
    message: string
}

@WebSocketGateway()
export class EventsGateway {
    @WebSocketServer()
    server: Server

    @SubscribeMessage('events')
    onEvent(client: Client, data: Event): Observable<WsResponse<Event>> {
        console.log('Recieved message', data)
        const modifiedData: Event = {
            name: data.name,
            message: `${data.message} -- Client Id: ${client.id}`
        }

        return of({ event: 'events', data: modifiedData })
    }

    handleDisconnect(client: Client) {
        console.log(`Client disconnected: ${client.id}`)
    }

    handleConnection(client: Client) {
        console.log('connection to socket... token = ', client.id)
    }
}
