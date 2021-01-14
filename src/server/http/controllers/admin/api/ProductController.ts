import { Request } from "express";
import { body } from "express-validator";
import { IProductImage } from "../../../../../../@types/common/product";
import { IFormProperties, IGridProperties } from "../../../../../../@types/server/admin/resource";
import { fileSystem } from "../../../../config/filesystem";
import HttpException from "../../../../exceptions/api/http-exception";
import { toURLConverter } from "../../../../helpers/route";
import "../../../../libraries/ApiResponse";
import { Product } from "../../../../models/product.model";
import ModelService from "../../../../services/ModelService.service";
import ResourceController from "./ResourceController";

class ProductController extends ResourceController {

  protected service: ModelService;
  protected title = "Ürünler"; // TODO localization support
  protected serviceURL = "products"; // TODO localization support
  constructor() {
    super();
    this.service = new ModelService(Product);
  }
  grid(): IGridProperties {
    return {
      fields: ["name", "price", "sku"],
      actions: ["edit", "show", "delete"],
      filterItems: [{
        label: "Adı",
        type: "text",
        name: "name",
      }, {
        label: "Fiyatı",
        type: "number",
        name: "price"
      }],
      disableAdd: false
    }
  }
  form(): IFormProperties {
    return {
      items: [
        {
          name: "name",
          type: "text",
          // initialValue: process.env.NODE_ENV === "production" ? null : faker.commerce.productName() // for filling inputs automatically, it gives us fastly testing, disable it in prd
        },
        {
          name: "slug",
          type: "text",
        },
        {
          name: "price",
          type: "number",
          // initialValue: process.env.NODE_ENV === "production" ? null : faker.commerce.price() // for filling inputs automatically, it gives us fastly testing, disable it in prd
        },
        {
          name: "sku",
          type: "text",
          // initialValue: process.env.NODE_ENV === "production" ? null : faker.lorem.word() // for filling inputs automatically, it gives us fastly testing, disable it in prd
        },
        {
          name: "status",
          type: "switch",
          // initialValue: Date.now() % 2 == 1 // for filling inputs automatically, it gives us fastly testing, disable it in prd
        },
        {
          name: "content",
          type: "wysiwyg",
          // initialValue: process.env.NODE_ENV === "production" ? null : faker.commerce.productDescription() // for filling inputs automatically, it gives us fastly testing, disable it in prd
        },
        {
          name: "images",
          type: "image"
        }
      ]
    }
  }
  show(): void {
    throw new Error("Method not implemented.");
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
            if (await this.service.isExists("sku", value)) {
              return Promise.reject("Sku is already in use");
            }
          })
        );
        rules.push(
          body("name").custom(async (value) => {
            if (await this.service.isExists("name", value)) {
              return Promise.reject("Name is already in use");
            }
          })
        );
        rules.push(
          body("slug").custom(async (value) => {
            if (typeof value !== "undefined") { // it is optional so check the value is exists first
              if (await this.service.isExists("slug", toURLConverter(value))) {
                return Promise.reject("Slug is already in use");
              }
            }
          })
        );
        break;
      case "update":

        break;
      default:
        throw new HttpException(422, "Invalid Method");
    }
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
    rules.push(
      body("name")
        .isLength({ min: 5 })
        .withMessage("Product Name must be at least 5 character long")
    );
    return rules;
  };
}
export default new ProductController();
