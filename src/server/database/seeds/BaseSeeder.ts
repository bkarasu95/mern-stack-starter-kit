const dotenv = require("dotenv");
import { Db, MongoClient } from 'mongodb';
dotenv.config();


export default abstract class BaseSeeder {
    private db: MongoClient | null;
    protected dbo: Db | null;
    constructor() {
        this.db = null;
        this.dbo = null;
    }
    connectDB(): Promise<boolean> {
        var self = this;
        return new Promise((resolve, reject) => {
            var url: string = `mongodb://${process.env.DB_HOST}:${process.env.DB_PORT}/`;
            MongoClient.connect(url, {
                useNewUrlParser: true,
                useUnifiedTopology: true
            }, function (err, db: MongoClient) {
                if (err) reject(err);
                self.db = db;
                self.dbo = db.db(process.env.DB_DATABASE);
                resolve(true);
            });
        });
    }
    closeDB() {
        if (this.db != null) {
            this.db.close();
        }
    }
    /**
     * @throws {Error}
     * @returns {Promise}
     */
    abstract run(): Promise<boolean>;

    /**
     * @returns {Promise}
     */
    seed(): Promise<string> {
        return new Promise((resolve, reject) => {
            this.run().then(seedResult => {               
                if (seedResult) {
                    resolve("Seed completed");
                }else{
                    resolve("Seed Failed");
                }
            }).catch(err =>{
                console.log(err);
                resolve("Seed Failed");
            })
        });
    }
}
