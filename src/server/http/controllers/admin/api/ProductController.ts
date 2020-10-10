import { NextFunction, Request, Response } from "express";
import { body, validationResult } from "express-validator";
import { fileSystem } from "../../../../config/filesystem";
import HttpException from "../../../../exceptions/api/http-exception";
import "../../../../libraries/ApiResponse";
import * as ProductService from "../../../../services/product.service";
import { toURLConverter } from "../../../../helpers/route";
import { IProductImage } from "../../../../../../@types/common/product";
import { ProductModel } from "../../../../../../@types/server/models";

class ProductController {
  list = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const products = await ProductService.findAll();
      res.setMessage("Products Fetched").customResponse(products);
    } catch (e) {
      next(e);
    }
  };
  show = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const product = await ProductService.find({ _id: req.params.id });
      if (product.length === 0) {
        throw new HttpException(400, "Product Not Found");
      }
      res.setMessage("Product Fetched").customResponse(product[0]);
    } catch (e) {
      next(e);
    }
  };
  insert = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const validationError = validationResult(req);
      if (!validationError.isEmpty()) {
        throw new HttpException(422, "Validation Failed", {
          validation: validationError.mapped(),
        });
      }
      req.body.slug = req.body.slug ?? toURLConverter(req.body.name);
      let product: ProductModel = req.body;
      product.images = this.processImages(req);
      await ProductService.insert(product);
      res.setMessage("Product Added").customResponse(product);
    } catch (e) {
      next(e);
    }
  };
  update = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const validationError = validationResult(req);
      if (!validationError.isEmpty()) {
        throw new HttpException(422, "Validation Failed", {
          validation: validationError.mapped(),
        });
      }
      const product: ProductModel = req.body;
      product.images = this.processImages(req);
      await ProductService.update(req.params.id, product);
      res.setMessage("Product Updated").customResponse(product);
    } catch (e) {
      next(e);
    }
  };

  delete = async (req: Request, res: Response, next: NextFunction) => {
    try {
      if (!ProductService.remove(req.params.id)) {
        throw new HttpException(400, "Product Couldn't Deleted");
      }
      res.setMessage("Product Deleted").customResponse();
    } catch (e) {
      next(e);
    }
  };

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

  validate = (method: string) => {
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
        rules.push(body("price").isInt().withMessage("Price must be price"));
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
