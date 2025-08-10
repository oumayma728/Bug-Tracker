//@nestjs/common gives you NestJS decorators like @Controller and @Post, which are used to build APIs.
import { Controller, Post, Body,Get } from '@nestjs/common';
//AuthService is where the real logic (like signup, login) is written. The controller calls the service.
import { AuthService } from './auth.service';

//AuthService is where the real logic (like signup, login) is written. The controller calls the service.
import {SignupDto} from './dtos/signup.dto'
import { LoginDto } from './dtos/login.dto';
@Controller('auth')
export class AuthController {
    constructor (private readonly authService: AuthService){}
    // TODO: POST Signup
    //@Post : Defines a POST endpoint at /auth/signup
    @Post('signup')
    //@Body() is decorator :  Extracts the body from the HTTP request (which contains name, email, password)
// Validates the shape of the body using your SignupDto (checks required fields, formats, etc.)
 //Gives the validated body as an object named signupData to your controller function
    async signUp ( @Body() SignupData: SignupDto){
        return this.authService.signup(SignupData);
    }
    //TODO: POST Login
    @Post('login')
   
    async login ( @Body() loginData: LoginDto){
        return this.authService.login(loginData);
    }
    //TODO: POST Refresh Token
}