import mongoose, { Schema } from "mongoose";
import { LogModel } from "../../../@types/server/models";

const LogsSchema: Schema = new Schema(
    {
        type: {
            type: String,
            required: true,
            enum: ['rest', 'cli'],
        },
        endpoint: {
            type: String,
            required: true,
        },
        log: {
            type: Object,
            required: true,
        },
        message: {
            type: String,
            required: true
        },
        status: {
            type: String,
            enum: ["error", "warning", "success"],
            required: true
        },
        statusCode: {
            type: Number
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
