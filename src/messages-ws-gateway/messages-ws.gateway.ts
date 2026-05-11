import { JwtPayload } from './../auth/interfaces/jwt-payload.interface';
import { JwtService } from '@nestjs/jwt';
import { ConnectedSocket, MessageBody, OnGatewayConnection, OnGatewayDisconnect, SubscribeMessage, WebSocketGateway, WebSocketServer } from '@nestjs/websockets';
import { MessagesWsGatewayService } from './messages-ws-gateway.service';
import { Server, Socket } from 'socket.io';
import { NewMessageDto } from './dto/NewMessageDto';
import { OnlineClients } from './dto/clientsDto';



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
      // Los meto en una sala "privada"
      console.log("payload id")
      console.log(payload.id)
      client.join(payload.id)
      
    } catch (error) {
      client.disconnect()
    }
    this.broadcastUsers();
     console.log("connected", client.id);
  }

  private broadcastUsers(){
  this.wss.emit("clients-updated", this.messagesWsGatewayService.getConnectedClients());
  }

  // @SubscribeMessage('get_online')
  // async getOnline(client: Socket){
  //    var online : OnlineClients[] = []
  //   this.messagesWsGatewayService.getConnectedClients().map((id)=> online.push({
  //     user_id: id,
  //     user_fullname: this.messagesWsGatewayService.getUserFullName(id)
  //   }) );
    


  //    this.wss.emit('get_online', online) 

  //    console.log(online)
  // }


  async handleDisconnect(client:Socket){
    this.messagesWsGatewayService.removeClient(client.id);

    this.broadcastUsers();
     console.log("disconnected", client.id);
  }

  // @SubscribeMessage('join_room')
  //  handleJoinRoom(@MessageBody() newMessageDto: NewMessageDto, @ConnectedSocket() client: Socket){
  //   this.messagesWsGatewayService.joinRoom(client.id, newMessageDto.room_id , client)
  // }

  @SubscribeMessage('send_message_private') 
  async handleMessage(@MessageBody() newMessageDto: NewMessageDto, @ConnectedSocket() client: Socket){
    console.log(newMessageDto)
    console.log("Llega mensaje: " + newMessageDto.message)
    console.log(newMessageDto.user_id)
    const fullname = this.messagesWsGatewayService.getUserFullName(client.id)
    console.log("se hace el emit de: " +  fullname +  newMessageDto.message)
     this.wss.to(newMessageDto.user_id).emit('receive_private_message', {
      fullname,
      message: newMessageDto.message
     })
 
}
    

   


    //   this.wss.emit('message-from-server', {
    //   fullName: this.messagesWsGatewayService.getUserFullName(client.id),
    //   message: newMessageDto.message || 'no-message!!'
    // });
 // }
}
