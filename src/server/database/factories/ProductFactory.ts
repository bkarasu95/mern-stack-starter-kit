
import * as faker from "faker";
import { IProduct } from "../../../../@types/common/product";
import { BaseFactory } from "./BaseFactory";
import { toURLConverter } from './../../helpers/routeServer';

class ProductFactory extends BaseFactory {
    defineObject(): object {
        const date = new Date();
        const object: IProduct = {
            name: faker.commerce.productName() + " " + faker.commerce.productMaterial() + faker.random.number(Math.random() * 10000),
            slug: toURLConverter(faker.commerce.productName() + " " + faker.commerce.productMaterial() + " " + faker.random.number(Math.random() * 10000)),
            sku: faker.random.number(Math.random() * 10000) + faker.commerce.productMaterial() + faker.commerce.productName(),
            status: faker.random.boolean(),
            price: parseInt(faker.commerce.price()),
            content: `<div>${faker.lorem.paragraphs(faker.random.number(4))}</div>`,
            images: [],
            createdAt: date,
            updatedAt: date,
            deletedAt: null
        }
        return object;
    }
}

export default ProductFactory;
