const dotenv = require("dotenv");
import { MongoClient } from 'mongodb';
dotenv.config();


export default abstract class BaseSeeder {
    private db?: MongoClient;
    protected dbo?;
    constructor() {
        this.db = null;
        this.dbo = null;
    }
    connectDB() {
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
        this.db.close();
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
            try {
                this.run().then(seedResult => {
                    if (seedResult) {
                        resolve("Seed completed");
                    }
                })
            } catch (error) {
                reject(error);
            }
        });
    }
}
