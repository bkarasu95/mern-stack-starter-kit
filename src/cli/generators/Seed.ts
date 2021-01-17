import * as fs from 'fs';

export const command = 'make:seed [name]'
export const desc = 'Create a db seeder'
export const builder = {
    name: {
        required: true
    }
}

export const handler = function (argv: { name: string; }) { // argv gets from yargs
    const seedsPath = './src/server/database/seeds/';
    const seedName = argv.name.charAt(0).toUpperCase() + argv.name.slice(1); // seed that will create
    const template = `
import BaseSeeder from "./BaseSeeder";
import YourFactory from '../factories/YourFactory';

export class ${seedName} extends BaseSeeder {
    async run(): Promise<boolean> {
        const docs = await (new YourFactory).produce(100);
        return await this.dbo.collection().insertMany(docs).then(result => {
            return result.insertedCount === docs.length;
        });
    }
}

export const Seeder = ${seedName}; // don't change this 
`;
    fs.writeFile(seedsPath + seedName + '.ts', template, {
        flag: 'wx'
    }, function (err) {
        if (err) return console.log(err);
        console.log(seedName + " command created");
    });
}