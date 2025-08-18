import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  someProtectedRoute(){
    return {message:'Accessed Resource'};
  }
  // src/app.controller.ts
@Get('health')
health() { return { ok: true, time: new Date().toISOString() }; }

}
