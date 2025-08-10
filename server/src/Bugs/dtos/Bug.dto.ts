import {IsString ,IsIn, IsNotEmpty} from "class-validator";
import { PartialType } from "@nestjs/mapped-types";

export class CreateBugDto {
    @IsNotEmpty()
    @IsString()
    title:string;
    @IsNotEmpty()

    @IsString()
    description:string;
    @IsNotEmpty()
    @IsIn(['low', 'medium', 'high','critical'], {
  })
  priority: string;
    @IsString()
        @IsNotEmpty()

    projectName:string;
    @IsString()
    @IsIn(['Solved','In progress','Unsolved'])
    status:string;


}
export class UpdateBugDto extends PartialType(CreateBugDto) {}
