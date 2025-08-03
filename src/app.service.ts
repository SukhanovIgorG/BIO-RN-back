import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  checkWorked(): string {
    return 'App is working!';
  }
}
