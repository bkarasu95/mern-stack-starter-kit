import bcrypt from "bcryptjs";
import * as dotenv from "dotenv";
import { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import HttpException from '../../../../exceptions/api/http-exception';
import "../../../../libraries/ApiResponse";
import * as AdminUserService from '../../../../services/admin_users.service';
dotenv.config();

class AuthController {
    async login(req: Request, res: Response, next: NextFunction) {
        try {
            const adminUser = await AdminUserService.find(req.body.username);
            if (adminUser == null || !await bcrypt.compare(req.body.password, adminUser.password)) {
                throw new HttpException(400, "Admin Not Found");
            }
            const payload: object = {
                username: "superadmin",
                admin: true,
                token_created: Date.now()
            };
            if (process.env.JWT_SECRET == null) {
                throw new HttpException(500, "JWT Secret Token Not Defined");
            }
            const jwtToken = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '360000s' });
            res.customResponse({ access_token: jwtToken })
        } catch (e) {
            next(e)
        }

    }
}

export default new AuthController();