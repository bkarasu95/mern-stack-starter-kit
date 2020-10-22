import { Request } from "express";
import { body } from "express-validator";
import { IProductImage } from "../../../../../../@types/common/product";
import { fileSystem } from "../../../../config/filesystem";
import HttpException from "../../../../exceptions/api/http-exception";
import "../../../../libraries/ApiResponse";
import { Product } from "../../../../models/product.model";
import ModelService from "../../../../services/ModelService.service";
import * as ProductService from "../../../../services/product.service";
import ResourceController from "./ResourceController";

class ProductController extends ResourceController {
  protected service: ModelService;
  constructor() {
    super();
    this.service = new ModelService(Product);
  }

  processImages(req: Request): Array<IProductImage> {
    if (typeof req.files != "undefined") {
      // image processing
      let fileValues = Object.values(req.files);
      let images: Array<IProductImage> = [];
      fileValues.forEach((file: Express.Multer.File): void => {
        if (typeof images != "undefined") {
          const productImage: IProductImage = {
            path: file.path.replace(fileSystem.uploadPath, fileSystem.assetUrl), // replace the path because of we use this url later, we don't have to keep upload path
          };
          images.push(productImage);
        }
      });
      return images;
    } else {
      return [];
    }
  }

  validate = (method: string): Array<any> => {
    let rules = new Array();
    switch (method) {
      case "create":
        rules.push(
          body("sku").custom(async (value) => {
            if (await ProductService.isExists("sku", value)) {
              return Promise.reject("Sku is already in use");
            }
          })
        );
        rules.push(
          body("name").custom(async (value) => {
            if (await ProductService.isExists("name", value)) {
              return Promise.reject("Name is already in use");
            }
          })
        );
        rules.push(
          body("slug").custom(async (value) => {
            if (await ProductService.isExists("slug", value)) {
              return Promise.reject("Slug is already in use");
            }
          })
        );
      case "create":
      case "update":
        rules.push(
          body("name")
            .isLength({ min: 5 })
            .withMessage("Product Name must be at least 5 character long")
        );
        rules.push(
          body("slug").custom(async (value) => {
            if (await ProductService.isExists("slug", value)) {
              return Promise.reject("Slug is already in use");
            }
          })
        );
        rules.push(body("price").isNumeric().withMessage("Price must be price"));
        rules.push(
          body("status").isBoolean().withMessage("Status must be true or false")
        );
        rules.push(body("images").isEmpty().withMessage("Images is required"));
        rules.push(
          body("content")
            .isLength({ min: 10 })
            .withMessage("Content is too short")
        );
        break;
      case "update":
        break;

      default:
        throw new HttpException(422, "Invalid ");
    }
    return rules;
  };
}
export default new ProductController();
