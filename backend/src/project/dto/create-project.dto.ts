import { ApiProperty } from "@nestjs/swagger";
import { Type } from "class-transformer";
import {IsEmail, IsNotEmpty, IsNumber, IsString, IsUUID, Length, Min} from "class-validator"; 

export class CreateProjectDto {
    @IsString()
    @IsNotEmpty()
    @ApiProperty({example:"Семейный участок 2х2 m",description:"Название макета"})
    name!:string;
    @IsNumber()
    @Min(1)
    @Type(()=> Number)
    width!:number;
    @IsNumber()
    @Min(1)
    @Type(()=> Number)
    length!:number;
    @IsString()
    @IsNotEmpty()
    sceneData!:string;
    
}