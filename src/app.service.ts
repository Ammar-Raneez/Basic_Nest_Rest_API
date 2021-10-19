import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): { name: string } {
    // nestjs automatically infers the return type
    // therefore we don't have to specifically say application/json
    return { name: 'hello world' };
  }
}
