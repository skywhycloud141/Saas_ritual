import 'multer';
export declare class AssetController {
    upload(file: Express.Multer.File): {
        message: string;
        url: string;
    };
}
