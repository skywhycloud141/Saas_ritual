import { Controller, MaxFileSizeValidator, ParseFilePipe, Post, UploadedFile, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import "multer";

@Controller('asset')
export class AssetController {
    @Post("upload")
    @UseInterceptors(FileInterceptor("file",{dest:"./uploads"}))
    upload(@UploadedFile(new ParseFilePipe({
        validators: [
            new MaxFileSizeValidator({maxSize:1*1024*1024, message: "Слишком большой файл"})
        ]
    })) file:Express.Multer.File){
        console.log(file);
        return {
            message:"Файл успешно дошел до сервера",
            originalName: file.originalname,
            size: file.size
        }
    }
}

