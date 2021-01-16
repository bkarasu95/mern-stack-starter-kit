
import BaseSeeder from "./BaseSeeder";
import ProductFactory from '../factories/ProductFactory';

export class ProductSeeder extends BaseSeeder {
    async run(): Promise<boolean> {
        const docs = await (new ProductFactory).produce(500);
        return await this.dbo.collection('products').insertMany(docs).then(result => {
            return result.insertedCount === docs.length;
        });
    }
}

export const Seeder = ProductSeeder; // don't change this 
