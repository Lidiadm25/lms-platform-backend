import { JwtPayload } from './../auth/interfaces/jwt-payload.interface';
import { JwtService } from '@nestjs/jwt';
import { ConnectedSocket, MessageBody, OnGatewayConnection, OnGatewayDisconnect, SubscribeMessage, WebSocketGateway, WebSocketServer } from '@nestjs/websockets';
import { MessagesWsGatewayService } from './messages-ws-gateway.service';
import { Server, Socket } from 'socket.io';
import { NewMessageDto } from './dto/NewMessageDto';



@WebSocketGateway({cors: true})
export class MessagesWsGateway implements OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer() wss!: Server;
 
  constructor(
    private readonly messagesWsGatewayService: MessagesWsGatewayService,
    private readonly jwtService : JwtService
  ) {}

  // Verify jwt token and adds the user to the active user list 
  async handleConnection(client : Socket){
    const token = client.handshake.headers.authentication as string

    let payload : JwtPayload;

    try {
      payload = this.jwtService.verify(token);
      await this.messagesWsGatewayService.registerClient(client, payload.id);
      
    } catch (error) {
      client.disconnect()
    }
    this.broadcastUsers();
  }

  private broadcastUsers(){
     this.wss.emit('clients-updated', this.messagesWsGatewayService.getConnectedClients())
  }


  async handleDisconnect(client:Socket){
    this.messagesWsGatewayService.removeClient(client.id);

    this.broadcastUsers();
  }

  @SubscribeMessage('join_room')
   handleJoinRoom(@MessageBody() newMessageDto: NewMessageDto, @ConnectedSocket() client: Socket){
    this.messagesWsGatewayService.joinRoom(client.id, newMessageDto.room_id , client)
  }

  @SubscribeMessage('send_message') 
  async handleMessage(@MessageBody() newMessageDto: NewMessageDto, @ConnectedSocket() client: Socket){
    this.wss.emit('receive_message',newMessageDto )
  }
}
