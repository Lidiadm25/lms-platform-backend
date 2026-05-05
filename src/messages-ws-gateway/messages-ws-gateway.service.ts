import { User } from './../auth/entities/user.entity';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Socket } from 'socket.io';
import { Repository } from 'typeorm';



@Injectable()
export class MessagesWsGatewayService {
     private connectedClients = new Map<string, {
    socket: Socket;
    user: User;
    roomId?: string;
  }>();
   

    constructor(
        @InjectRepository(User)
        private readonly userRepository: Repository<User>
    ){ }

    async registerClient(client: Socket, userId:string){
        const user = await this.userRepository.findOneBy({id:userId});

        if(!user) throw new Error(`User not found`)
        if(!user.isActive) throw new Error(`User is not active`)

        this.checkUserConnection(user);

        this.connectedClients[client.id] = {
            socket: client,
            user: user
        }
    }

    joinRoom(userId: string, roomId: string, client: Socket){
        

        if(!this.connectedClients.get(userId)) throw Error(`User not conencted`)

        let user =this.connectedClients.get(userId)
        user!.roomId = roomId;

        client.join(roomId);
         console.log(`User with client ID ${client.id} joined room ${roomId}.`);
    }

    removeClient(clientId:string){
        delete this.connectedClients[clientId];
    }

    getConnectedClients():string[]
    {
        return Object.keys(this.connectedClients)
    }

    getUserFullName(socketId: string){
        return this.connectedClients[socketId].user.fullName
    }

    private checkUserConnection(user:User){
        for(const clientId of Object.keys(this.connectedClients)){
            const connectedClient = this.connectedClients[clientId];

            if(connectedClient.user.id === user.id){
                connectedClient.socket.disconnect();
                break;
            }
        }
    }
}
