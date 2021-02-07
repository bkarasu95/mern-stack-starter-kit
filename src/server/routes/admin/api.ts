import bodyParser from "body-parser";
import cors from "cors";
import express from "express";
import helmet from "helmet";
import multer from "multer";
import path from "path";
import { fileSystem } from "../../config/filesystem";
import HttpException from "../../exceptions/api/http-exception";
import AdminMenuController from "../../http/controllers/admin/api/AdminMenuController";
import AuthController from "../../http/controllers/admin/api/AuthController";
import FileController from "../../http/controllers/admin/api/FileController";
import LogController from "../../http/controllers/admin/api/LogController";
import ProductController from "../../http/controllers/admin/api/ProductController";
import { Auth } from "../../http/middlewares/api/admin_auth.middleware";
import { errorHandler } from "../../http/middlewares/api/error.middleware";
import { notFoundHandler } from "../../http/middlewares/api/notFound.middleware";
import { Restful } from "../../http/middlewares/api/restful.middleware";
import "../../libraries/ApiResponse";
let storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(fileSystem.imagesPath, "uploads"));
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname)); //Appending extension
  },
});
const upload = multer({
  storage: storage,
  fileFilter(req, file, cb) {
    const ext = path.extname(file.originalname).toLowerCase();
    if (ext !== ".png" && ext !== ".jpg" && ext !== ".jpeg") {
      cb(
        new HttpException(400, "invalid image type", {
          file: file.originalname,
        })
      );
    } else {
      cb(null, true);
    }
  },
});

/**
 * Router Definition
 */
export const adminApiRouter = express.Router();

/**
 * Middleware Setups
 */
adminApiRouter.use(Restful); // our api middleware
adminApiRouter.use(helmet());
adminApiRouter.use(cors());
adminApiRouter.use(bodyParser.json());

adminApiRouter.post("/login", AuthController.login.bind(AuthController));
adminApiRouter.get("/auth-token", AuthController.getUserByToken);


adminApiRouter.use(Auth); // admin authorize is required after that line

adminApiRouter.route('/uploadFile').post(upload.any(), FileController.uploadFile);

adminApiRouter.route("/products/list").get(ProductController.all);
adminApiRouter.route("/products/create").get(ProductController.create);
adminApiRouter.route("/products/:id/edit").get(ProductController.edit);
adminApiRouter.route("/products/:id")
  .get(ProductController.detail)
  .put(upload.any(), ProductController.validate("update"), ProductController.update)
  .delete(ProductController.delete);
adminApiRouter.route("/products")
  .get(ProductController.list)
  .post(upload.any(), ProductController.validate("create"), ProductController.insert);

adminApiRouter.route("/logs/list").get(LogController.all);
adminApiRouter.route("/logs/:id").get(LogController.detail);
adminApiRouter.route("/logs").get(LogController.list);

adminApiRouter.route("/admin-menu").get(AdminMenuController.getList);
/**
 * After Middleware
 */
adminApiRouter.use(errorHandler); // handle the exception
adminApiRouter.use(notFoundHandler); // handle the page not found
