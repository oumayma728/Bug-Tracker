import { User } from '../auth/schemas/user.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { BadRequestException, Injectable, UnauthorizedException } from '@nestjs/common';

@Injectable()
export class UserService {
constructor(@InjectModel('User') private userModel: Model<User>) {}

async findAll() {
    return this.userModel.find();
}
async findOne(id: string) {
    return this.userModel.findById(id);
}

/*async update(id: string, updateDto: any) {
    return this.userModel.findByIdAndUpdate(id, updateDto, { new: true });
}*/

async remove(id: string) {
    return this.userModel.findByIdAndDelete(id);
}
}
