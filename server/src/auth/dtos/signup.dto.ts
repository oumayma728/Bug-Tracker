import { IsEmail, IsString , Matches, matches, MinLength
 ,IsIn} from "class-validator";
export class SignupDto {
    @IsString()
    name:string;
    @IsEmail()
    email:string;
    @IsString()
    @MinLength(6)
    @Matches(/^(?=.*[0-9])/, {message:'Password must contain at least one number'})
    password:string;
     @IsIn(['admin', 'developer', 'reporter'], {
    message: 'Role must be either admin, developer, or reporter',
  })
  role: string;
}