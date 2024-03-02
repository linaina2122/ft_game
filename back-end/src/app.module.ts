import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { socketGateway } from './socketGatway';
import { GameController } from './game/game.controller';
import { Player1Controller } from './player2/player1/player1.controller';

@Module({
  imports: [],
  controllers: [AppController, GameController, Player1Controller],
  providers: [AppService, socketGateway],
})
export class AppModule {}
