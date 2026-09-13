import { OnGatewayConnection } from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
export declare class EventsGateway implements OnGatewayConnection {
    server: Server;
    private logger;
    handleConnection(client: Socket): void;
    handleJoinRoom(client: Socket, agencyId: string): void;
    sendReportReady(agencyId: string, message: string): void;
}
