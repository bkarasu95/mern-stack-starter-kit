import { ProductModel } from "../../../@types/server/models";
import HttpException from "../exceptions/api/http-exception";
import { Product } from "../models/product.model";

export const findAll = (where: object = {}, select: object = {}, limit: number | null = null, offset: number | null = null) => {
  let products = Product.find(where, select, (error: Error) => {
    if (error) {
      throw new HttpException(500, error.message);
    }
  })

  if (limit !== null && offset !== null && !isNaN(limit) && !isNaN(offset)) products.limit(limit).skip(offset);
  return products;
};

export const find = async (where?: any, select?: any) => {
  const product = Product.find(where, select, (error: Error) => {
    if (error) {
      throw new HttpException(500, error.message);
    }
  });
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

export const count = async () => {
  return Product.count({}, function (err) {
    if (err) throw new HttpException(500, err.message);
  })
}

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
