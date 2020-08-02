import { UseGuards } from "@nestjs/common";
import { SubscribeMessage, WebSocketGateway, WebSocketServer, WsResponse } from '@nestjs/websockets'
import { Observable, of } from 'rxjs'
import { Client, Server } from 'socket.io'

import {JwtAuthGuard} from "../authz/jwt-auth.guard";

interface Event {
    name: string
    message: string
}

@WebSocketGateway()
export class EventsGateway {
    @WebSocketServer()
    server: Server

    @UseGuards(JwtAuthGuard)
    @SubscribeMessage('events')
    onEvent(client: Client, data: Event): Observable<WsResponse<Event>> {
        const modifiedData: Event = {
            name: data.name,
            message: `${data.message} -- Client Id: ${client.id}`
        }

        return of({ event: 'events', data: modifiedData })
    }

    handleDisconnect(client: Client): void {
        console.log(`Client disconnected: ${client.id}`)
    }

    handleConnection(client: Client): void {
        console.log('connection to socket... token = ', client.id)
    }
}
