import { BadRequestException, Injectable, UnauthorizedException,NotFoundException } from '@nestjs/common';
import { CreateBugDto } from './dtos/Bug.dto';
import { JwtService } from '@nestjs/jwt';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Bug } from './schemas/bug.schema';

import * as bcrypt from 'bcrypt';
@Injectable()
export class BugService {
    constructor(
        @InjectModel(Bug.name) private BugModel:Model<Bug>,
    ){}
    async create (CreateBugData: CreateBugDto) : Promise<Bug>
{const {title,description,priority,projectName,status}=CreateBugData;
return await this.BugModel.create({
  title,
  description,
  priority,
  projectName,
  status
});

}
async findAll() {
    return this.BugModel.find();
}
async findByUser(id: string) {
    return this.BugModel.findById(id);
}

/*async update(id: string, updateDto: any) {
    return this.userModel.findByIdAndUpdate(id, updateDto, { new: true });
}*/

async remove(id: string) {
    return this.BugModel.findByIdAndDelete(id);
}
async updateStatus(id: string, newStatus: string): Promise<Bug> {
  const bug = await this.BugModel.findById(id);
  if (!bug) throw new NotFoundException('Bug not found');

  bug.status = newStatus;
  return await bug.save();
}

}

