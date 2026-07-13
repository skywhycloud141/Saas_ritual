import {IsEmail, IsNotEmpty, IsString, Length} from "class-validator"; 
export class CreateAgencyDto {
    @IsString() 
    @IsNotEmpty()
    @Length(3,50)
    name!:string;
    @IsEmail()
    @IsNotEmpty()
    email!:string;
}
