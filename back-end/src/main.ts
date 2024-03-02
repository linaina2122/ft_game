import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger } from '@nestjs/common';
// import { start_server, socketGateway } from './socketGatway';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors({
    origin: 'http://localhost:5173',
    methods: ['POST','DELETE'],
    credentials: true,
  });
  await app.listen(3000);
}
function main(){
  // const s = new socketGateway();
  // start_server(s);
}

bootstrap();
main();
