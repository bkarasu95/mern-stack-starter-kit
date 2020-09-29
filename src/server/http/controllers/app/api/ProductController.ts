import { NextFunction, Request, Response } from "express";
import HttpException from "../../../../exceptions/api/http-exception";
import "../../../../libraries/ApiResponse";
import * as ProductService from "../../../../services/product.service";

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
      const product = await ProductService.find({ slug: req.params.slug });
      if (product.length === 0) {
        throw new HttpException(400, "Product Not Found");
      }
      res.setMessage("Product Fetched").customResponse(product[0]);
    } catch (e) {
      next(e);
    }
  };
}
export default new ProductController();
