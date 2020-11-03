import { ILog } from "../../../@types/server/models";
import { Log } from "../models/logs.model";
import ModelService from "../services/ModelService.service";

export const sysLog = (log: ILog) => {
    const logService = new ModelService(Log);
    const logModel: ILog = {
        url: log.url,
        type: log.type,
        message: log.message,
        log: log.log,
        statusCode: log.statusCode
    };
    logService.insert(logModel);
} 