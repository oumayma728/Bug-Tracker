import { IsEmail, IsString , Matches, matches, MinLength
 } from "class-validator";
export class LoginDto {
    @IsEmail()
    email:string;
    @IsString()
    @MinLength(6)
    @Matches(/^(?=.*[0-9])/, {message:'Password must contain at least one number'})
    password:string;
}