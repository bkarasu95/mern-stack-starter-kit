import bodyParser from "body-parser";
import cors from 'cors';
import * as dotenv from "dotenv";
import express from "express";
import helmet from 'helmet';

import ProductController from "../../http/controllers/app/api/ProductController";
import { errorHandler } from '../../http/middlewares/api/error.middleware';
import { notFoundHandler } from '../../http/middlewares/api/notFound.middleware';
import "../../libraries/ApiResponse";
import { Restful } from '../../http/middlewares/api/restful.middleware';
dotenv.config();



/**
 * Router Definition
 */
export const appApiRouter = express.Router();


/**
 * Before Middleware
 */
appApiRouter.use(Restful);
appApiRouter.use(helmet());
appApiRouter.use(cors());
appApiRouter.use(bodyParser.json());

/**
 * Routes
 */
appApiRouter.get('/products', ProductController.list);
appApiRouter.get('/products/:slug', ProductController.show);

/**
 * After Middleware
 */
appApiRouter.use(errorHandler);
appApiRouter.use(notFoundHandler);

