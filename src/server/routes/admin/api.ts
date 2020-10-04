import { Auth } from "../../http/middlewares/api/admin_auth.middleware";
import bodyParser from "body-parser";
import cors from "cors";
import express, { Request, Response } from "express";
import helmet from "helmet";
import multer from "multer";
import path from "path";
import { fileSystem } from "../../config/filesystem";
import HttpException from "../../exceptions/api/http-exception";
import AuthController from "../../http/controllers/admin/api/AuthController";
import ProductController from "../../http/controllers/admin/api/ProductController";
import { errorHandler } from "../../http/middlewares/api/error.middleware";
import { notFoundHandler } from "../../http/middlewares/api/notFound.middleware";
import "../../libraries/ApiResponse";
import { Restful } from "../../http/middlewares/api/restful.middleware";
import { Product } from "../../models/product.model";
let storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, fileSystem.imagesPath + "/uploads");
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
adminApiRouter.use(Restful);
adminApiRouter.use(helmet());
adminApiRouter.use(cors());
adminApiRouter.use(bodyParser.json());

adminApiRouter.get("/", (req: Request, res: Response) => {
  res.render("admin", {
    reactPath: fileSystem.publicUrl + "admin.js",
  });
});

adminApiRouter.post("/login", AuthController.login);
adminApiRouter.get("/auth-token", AuthController.getUserByToken);

adminApiRouter.use(Auth);

adminApiRouter
  .route("/products")
  .get(ProductController.list)
  .post(
    upload.any(),
    ProductController.validate("create"),
    ProductController.insert
  );

adminApiRouter
  .route("/products/:id")
  .get(ProductController.show)
  .put(
    upload.any(),
    ProductController.validate("update"),
    ProductController.update
  );
adminApiRouter.put(
  "/products/:id",
  ProductController.validate("update"),
  ProductController.update
);
adminApiRouter.delete("/products/:id", ProductController.delete);

/**
 * After Middleware
 */
adminApiRouter.use(errorHandler);
adminApiRouter.use(notFoundHandler);
