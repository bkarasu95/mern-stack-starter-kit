import { MongooseDocument } from 'mongoose';
import HttpException from '../exceptions/api/http-exception';
import { AdminUser } from '../models/admin_user.model';

export const findAll = () => {
    const products = AdminUser.find({}, (error: Error) => {
        if (error) {
            throw new HttpException(500, error.message);
        }
    });
    return products;
};

export const find = async (username: string) => {
    const adminUser = await AdminUser.findOne({ "username": username }, (error: Error, adminUser: MongooseDocument) => {
        if (error) {
            throw new HttpException(500, error.message);
        }
    });    
    return adminUser;
};