import { Controller, Post, Body,Get ,Param,Delete,Patch} from '@nestjs/common';
import {BugService} from "./bug.service"
import {CreateBugDto} from "./dtos/Bug.dto"
@Controller('bug')
export class BugController {
constructor(private readonly BugService: BugService) {}
@Post('CreateBug')
createBug(@Body() createBugDto: CreateBugDto) {
  console.log('🚀 Received bug DTO:', createBugDto);
  return this.BugService.create(createBugDto);
}

@Get()
findAll() {
    return this.BugService.findAll();
}

  @Get('user/:userId')
  findOne(@Param('userId') id: string) {
    return this.BugService.findByUser(id);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.BugService.remove(id);
  }

  @Patch(':id/status')
async updateBugStatus(
  @Param('id') id: string,
  @Body('status') status: string,
) {
  return this.BugService.updateStatus(id, status);
}

}
