import * as fs from 'fs';

export const command = 'make:factory [name]'
export const desc = 'Create a data factory'
export const builder = {
    name: {
        required: true
    }
}

export const handler = function (argv: { name: string; }) { // argv gets from yargs
    const factoryPath = './src/server/database/factories/';
    const factoryName = argv.name.charAt(0).toUpperCase() + argv.name.slice(1); // factory that will create
    const template = `
import * as faker from "faker";
import { BaseFactory } from "./BaseFactory";

class ${factoryName} extends BaseFactory {
    defineObject(): object {
        const object = {
            
        }
        return object;
    }
}

export default ${factoryName};
`;
    fs.writeFile(factoryPath + factoryName + '.ts', template, {
        flag: 'wx'
    }, function (err) {
        if (err) return console.log(err);
        console.log(factoryName + " factory created");
    });
}