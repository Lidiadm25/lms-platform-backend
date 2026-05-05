import { Module } from '@nestjs/common';
import { MessagesWsGatewayService } from './messages-ws-gateway.service';
import { MessagesWsGateway } from './messages-ws.gateway';
import { AuthModule } from 'src/auth/auth.module';


@Module({
  providers: [MessagesWsGateway, MessagesWsGatewayService],
  imports: [AuthModule]
})
export class MessagesWsGatewayModule {}
