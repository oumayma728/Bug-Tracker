// src/bug/bug.module.ts
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { BugController } from './bug.controller';
import { BugService } from './bug.service';
import { Bug, BugSchema } from './schemas/bug.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Bug.name, schema: BugSchema },
    ]),
  ],
  controllers: [BugController],
  providers: [BugService],
})
export class BugModule {}
