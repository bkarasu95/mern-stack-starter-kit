import * as fs from 'fs';

export const command = 'make:seed [name]'
export const desc = 'Create a db seeder'
export const builder = {
    name: {
        required: true
    }
}

export const handler = function (argv) {
    const seedsPath = './src/server/database/seeds/';
    const seedName = argv.name.charAt(0).toUpperCase() + argv.name.slice(1); // seed that will create
    const template = `
import BaseSeeder from "./BaseSeeder";

export class ${seedName} extends BaseSeeder {
    async run(): Promise<boolean> {
        const docs = []
        return await this.dbo.collection().insertMany(docs).then(result => {
            return true;
        }).catch(err => {
            throw new err;
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