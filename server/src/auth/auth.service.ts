import { BadRequestException, Injectable, UnauthorizedException } from '@nestjs/common';
import { SignupDto } from './dtos/signup.dto';
import { LoginDto} from './dtos/login.dto';
import { JwtService } from '@nestjs/jwt';
import { User } from './schemas/user.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import * as bcrypt from 'bcrypt';
@Injectable()
export class AuthService {
    constructor(
        @InjectModel(User.name) private UserModel:Model<User>,
        private jwtService:JwtService,
    ){}
    async signup (signupData: SignupDto)
{const {email,name,password,role}=signupData
    //TODO :Check if email is in use
const emailInUse = await this.UserModel.findOne({
    email,
});
if (emailInUse)
{throw new BadRequestException("Email already in use")}
    //TODO :Hash password
const hashedPassword= await bcrypt.hash(password , 10) //10 is  how many times to process the password to make it secure
    //TODO :Create user document and save in mongodb
return await this.UserModel.create
({
    name,
    email,
    password: hashedPassword,
    role,
});}

//LOGIN
async login (credentials : LoginDto)
{const {email,password}=credentials;
    //TODO : Find if user exists by email
const user=await this.UserModel.findOne({email});
if(!user)
{
    throw new UnauthorizedException('Wrong credetials')
}

    //TODO: Compare entered password with existing password
const passwordMatch = await bcrypt.compare(password , user.password)
if (!passwordMatch)   
    {
    throw new UnauthorizedException('Wrong credetials')
}
const payload ={
    sub: user._id,
    email: user.email,
    role: user.role,
}
  const accessToken = this.jwtService.sign(payload);

  return {
    accessToken,
    user: {
      id: user._id,
      email: user.email,
      role: user.role,
      name: user.name,
    },
  };
}

//TODO: Generate JWT tokens
async generateUserTokens(userId)
{
    const accessToken = this.jwtService.sign({userId},{expiresIn:'1h'});
    return {accessToken,};
}

}
