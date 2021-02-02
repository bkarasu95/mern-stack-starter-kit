
import * as path from "path";
import BaseSeeder from "../../../server/database/seeds/BaseSeeder";
export const command: string = 'db:seed [class]'
export const desc: string = 'Seed the table'
export const builder: object = {
    class: {
        required: true
    }
}

export const handler = function (argv: { class: string; }) {
    const seedClass = require(path.join(process.cwd(), 'src/server/database/seeds/' + argv.class + '.ts')).Seeder; // system looks the Seeder as exports, so exporting all seeds is required
    const seedObject: BaseSeeder = new seedClass;
    seedObject.connectDB()
        .then((result: boolean) => {
            if (result) {
                return seedObject.seed();
            } else {
                throw new Error("Can't connected to db");
            }
        })
        .then(result => {
            console.log(result);
            seedObject.closeDB();
        })
        .catch(err => {
            console.log(err);
        });
}