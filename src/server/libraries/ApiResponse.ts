import { Response } from "express-serve-static-core";
import { response } from "express";
// extend the express Response class


declare module "express-serve-static-core" {
    // first, declare that we are adding a method to `Response` (the interface)
    export interface Response {
        message: string | object;
        customResponse(data?: any | null): this;
        setMessage(message: string | object): this;
    }
}

// app specified response
response.customResponse = function (data?) {
    if (this.message == null) {
        this.message = "";
    }
    return this.json({ message: this.message, data: data });
};

// app specified message
response.setMessage = function (message): Response {
    this.message = message;
    return this;
}