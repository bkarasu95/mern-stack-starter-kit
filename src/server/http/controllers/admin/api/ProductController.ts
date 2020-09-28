import { NextFunction, Request, Response } from "express";
import { body, validationResult } from "express-validator";
import { ProductModel } from "../../../../models/product.model";
import { fileSystem } from "../../../../config/filesystem";
import HttpException from "../../../../exceptions/api/http-exception";
import "../../../../libraries/ApiResponse";
import * as ProductService from "../../../../services/product.service";
import { toURLConverter } from "../../../../helpers/route";
import { IProductImage } from "../../../../../../@types/common/product";

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
      const product = await ProductService.find(req.params.id);
      if (product.length === 0) {
        throw new HttpException(400, "Product Not Found");
      }
      res.setMessage("Product Fetched").customResponse(product);
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
      req.body.product.slug =
        req.body.product.slug ?? toURLConverter(req.body.product.name);
      let product: ProductModel = req.body.product;
      if (typeof req.files != "undefined") {
        // image processing        
        var files = Object.values(req.files);
        product.images = [];
        files.forEach((file: Express.Multer.File, index: number): void => {
          if (typeof product.images != "undefined") {
            const productImage: IProductImage = {
              path: file.path.replace(
                fileSystem.uploadPath,
                fileSystem.assetUrl
              ),
            };
            product.images.push(productImage);
          }
        });
      }
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
      const product: ProductModel = req.body.product;
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

  validate = (method: string) => {
    let rules = new Array();
    switch (method) {
      case "create":
        rules.push(
          body("product.name")
            .isLength({ min: 5 })
            .withMessage("Product Name must be at least 5 character long")
            .custom(async (value) => {
              if (await ProductService.isExists("name", value)) {
                return Promise.reject("Product Name is already in use");
              }
            })
        );
        rules.push(
          body("product.sku").custom(async (value) => {
            if (await ProductService.isExists("sku", value)) {
              return Promise.reject("Product Sku is already in use");
            }
          })
        );
        rules.push(
          body("product.slug").custom(async (value) => {
            if (await ProductService.isExists("slug", value)) {
              return Promise.reject("Product Slug is already in use");
            }
          })
        );
        rules.push(
          body("product.price")
            .isInt()
            .withMessage("Product Price must be price")
        );
        break;
      case "update":
        rules.push(
          body("product.name")
            .optional()
            .isLength({ min: 5 })
            .withMessage("Product Name must be at least 5 character long")
            .custom((value) => {
              if (ProductService.isExists("name", value)) {
                return Promise.reject("Product Name is already in use");
              }
            })
        );
        rules.push(
          body("product.sku").custom((value) => {
            if (ProductService.isExists("sku", value)) {
              return Promise.reject("Product Sku is already in use");
            }
          })
        );
        rules.push(
          body("product.price")
            .optional()
            .isInt()
            .withMessage("Product Price must be price")
        );
        break;
      default:
        throw new HttpException(422, "Invalid ");
    }
    return rules;
  };
}
export default new ProductController();
