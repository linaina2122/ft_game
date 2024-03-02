import { Injectable } from '@nestjs/common';
import { socketGateway } from './socketGatway';

@Injectable()
export class AppService {
  
  // hi(){
  //   let xi:socketGateway;
  //   xi.l()
  // }

  getHello(): string {
    return 'Hello World!';
  }
}
