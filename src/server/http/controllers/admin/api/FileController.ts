import "../../../../libraries/ApiResponse";
import { Request, Response } from "express";
import { fileSystem } from "../../../../config/filesystem";

class FileController {
    uploadFile(req: Request, res: Response) {
        if (typeof req.files != "undefined") {
            let fileValue: Express.Multer.File = Object.values(req.files)[0];
            if (typeof fileValue != "undefined") {
                const fileURL = fileValue.path.replace(fileSystem.uploadPath, fileSystem.assetUrl);
                res.setMessage("Image uploaded").customResponse({
                    "url": fileURL
                });
            } else {

            }
        }
    }
}
export default new FileController();
