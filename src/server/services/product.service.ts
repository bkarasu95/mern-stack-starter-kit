import { MongooseDocument } from "mongoose";
import { Product, ProductModel } from "../models/product.model";
import HttpException from "../exceptions/api/http-exception";

export const findAll = () => {
  const products = Product.find({}, (error: Error) => {
    if (error) {
      throw new HttpException(500, error.message);
    }
  });
  return products;
};

export const find = async (slug: string) => {
  const product = Product.find(
    { slug: slug },
    (error: Error, product: MongooseDocument) => {
      if (error) {
        throw new HttpException(500, error.message);
      }
    }
  );
  console.log(product);
  
  return product;
};

export const insert = async (newItem: ProductModel) => {
  let product = new Product(newItem);
  await product.save().catch((err) => {
    throw new HttpException(400, err.message);
  });
};

export const update = async (id: string, updatedProduct: ProductModel) => {
  await Product.findByIdAndUpdate(id, updatedProduct);
};

export const remove = async (id: string) => {
  await Product.findOneAndDelete({ _id: id }).catch((err) => {
    if (err) throw new HttpException(500, err.message);
  });
  return true;
};

export const isExists = async (
  key: string,
  value: string
): Promise<boolean> => {
  let condition: any = {};
  condition[key] = value;
  return Product.find(condition).then((result) => {
    if (result.length > 0) {
      return true;
    } else {
      return false;
    }
  });
};
