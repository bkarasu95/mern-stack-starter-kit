import mongoose, { Schema } from "mongoose";
import { LogModel } from "../../../@types/server/models";

const LogsSchema: Schema = new Schema(
    {
        type: {
            type: String,
            required: true,
            enum: ['error', 'app', 'admin'],
        },
        url: {
            type: String,
            required: true,
        },
        log: {
            type: Object,
            required: true,
        },
        message: {
            type: String,
            required: true,
        },
        statusCode: {
            type: Number,
            required: true,
        },
        deletedAt: {
            type: Date,
            default: null
        }
    },
    { timestamps: true },
);
LogsSchema.pre<LogModel>("save", function (next) {
    this.createdAt = new Date();
    next();
});
LogsSchema.pre<LogModel>("update", function (next) {
    this.updatedAt = new Date();
    next();
});
// TODO add the deleted_at support generally
export const Log = mongoose.model<LogModel>("Log", LogsSchema);
