import { Model } from "mongoose";
import HttpException from "../exceptions/api/http-exception";

class ModelService {
    model: Model<any, {}>;
    constructor(model: Model<any>) {
        this.model = model
    }
    findAll = (where: object = {}, select: object = {}, limit: number | null = null, offset: number | null = null) => {
        where['deletedAt'] = { $eq: null };
        let data = this.model.find(where, select, (error: Error) => {
            if (error) {
                throw new HttpException(500, error.message);
            }
        })

        if (limit !== null && offset !== null && !isNaN(limit) && !isNaN(offset)) data.limit(limit).skip(offset);
        return data;
    }
    find = async (where?: any, select?: any) => {
        where['deletedAt'] = { $eq: null };
        const item = this.model.find(where, select, (error: Error) => {
            if (error) {
                throw new HttpException(500, error.message);
            }
        });
        return item;
    };
    insert = async (newItem: any) => {
        let model = new this.model(newItem);
        await model.save().catch((err: Error) => {
            throw new HttpException(400, err.message);
        });
    };
    update = async (id: string, updatedModel: Document) => {
        await this.model.findByIdAndUpdate(id, updatedModel);
    };

    delete = async (id: string) => {
        // TODO maybe we can check the model has deletedAt
        let model = await this.model.find({ _id: id, deletedAt: { $exists: true } }).catch((err) => { // check the deletedAt field for soft deleting
            if (err) throw new HttpException(500, err.message);
        });
        if (typeof model[0] === "undefined") { // model won't be null even records not found 
            await this.model.deleteOne({ _id: id }).catch((err) => {
                if (err) throw new HttpException(500, err.message);
            });
        } else {
            let updatedField = {
                deletedAt: Date.now()
            }
            await this.model.updateOne({ _id: id }, { $set: updatedField }).catch((err) => {
                if (err) throw new HttpException(500, err.message);
            });
        }
        return true;
    };

    forceDelete = async (id: string) => { // force the deleting model even it has deletedAt field
        await this.model.findOneAndDelete({ _id: id }).catch((err) => {
            if (err) throw new HttpException(500, err.message);
        });
        return true;
    }


    count = async (where: object = {}) => {
        where['deletedAt'] = { $eq: null };

        return this.model.countDocuments(where, function (err) {
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