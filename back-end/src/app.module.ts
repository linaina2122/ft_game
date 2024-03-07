import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { socketGateway } from './socketGatway';
import { Game } from './Game';

@Module({
  imports: [],
  controllers: [AppController],
  providers: [AppService, socketGateway, Game],
})
export class AppModule {}
