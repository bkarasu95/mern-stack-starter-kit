import { IAdminUser, IUser } from '../../common/resources/types/user';


// extend the express Request class
declare module "express-serve-static-core" {
    // first, declare that we are adding a method to `Response` (the interface)
    export interface Request {
        user?: IUser
        adminUser?: IAdminUser
    }
}