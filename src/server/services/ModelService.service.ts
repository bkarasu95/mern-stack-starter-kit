import { Model } from "mongoose";
import HttpException from "../exceptions/api/http-exception";

class ModelService {
    model: Model<any, {}>;
    constructor(model: Model<any>) {
        this.model = model
    }
    findAll = (where: object = {}, select: object = {}, limit: number | null = null, offset: number | null = null) => {
        let data = this.model.find(where, select, (error: Error) => {
            if (error) {
                throw new HttpException(500, error.message);
            }
        })

        if (limit !== null && offset !== null && !isNaN(limit) && !isNaN(offset)) data.limit(limit).skip(offset);
        return data;
    }
    find = async (where?: any, select?: any) => {
        const item = this.model.find(where, select, (error: Error) => {
            if (error) {
                throw new HttpException(500, error.message);
            }
        });
        return item;
    };
    insert = async (newItem: Document) => {
        let model = new this.model(newItem);
        await model.save().catch((err: Error) => {
            throw new HttpException(400, err.message);
        });
    };
    update = async (id: string, updatedModel: Document) => {
        await this.model.findByIdAndUpdate(id, updatedModel);
    };

    remove = async (id: string) => {
        await this.model.findOneAndDelete({ _id: id }).catch((err) => {
            if (err) throw new HttpException(500, err.message);
        });
        return true;
    };

    count = async () => {
        return this.model.count({}, function (err) {
            if (err) throw new HttpException(500, err.message);
        })
    }

    isExists = async (
        key: string,
        value: string
    ): Promise<boolean> => {
        let condition: any = {};
        condition[key] = value;
        return this.model.find(condition).then((result) => {
            if (result.length > 0) {
                return true;
            } else {
                return false;
            }
        });
    };


}

export default ModelService;