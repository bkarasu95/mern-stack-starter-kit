import HttpException from "../../../exceptions/api/http-exception";
import { Request, Response, NextFunction } from "express";
import fs from "fs";
import { promisify } from "util";
import '../../../libraries/ApiResponse';


const unlinkAsync = promisify(fs.unlink);

export const errorHandler = (error: HttpException, request: Request, response: Response, next: NextFunction): Response => {
    const status = error.statusCode || 500;
    let message = "";
    let data = {};
    if (typeof request.files != 'undefined' && request.files.length > 0) { // delete the uploaded files at failed request that throws exception
        var files = Object.values(request.files);
        files.forEach((file: Express.Multer.File): void => {
            unlinkAsync(file.path).catch(err => { // delete
                // if (err) console.log(err);
            });
        })
    }
    // TODO add error logging
    if (process.env.NODE_ENV === 'production') {
        message = "We are having some problems. This error logged."
        data = { error: error.error };
    } else {
        message = (error.message !== "") ? error.message : "We are having some problems. This error logged.";
        data = { error: error.error };
    }    
    return response.status(status).setMessage(message).customResponse(data);
};