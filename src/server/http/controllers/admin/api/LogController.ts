import { IFormProperties, IGridProperties } from "../../../../../../@types/server/admin/resource";
import "../../../../libraries/ApiResponse";
import ModelService from "../../../../services/ModelService.service";
import { Log } from './../../../../models/logs.model';
import ResourceController from "./ResourceController";

class LogController extends ResourceController {
    protected serviceURL: string = "logs";

    protected title: string = "Kayıtlar";
    protected service: ModelService;
    constructor() {
        super();
        this.service = new ModelService(Log);
    }
    grid(): IGridProperties {
        return {
            fields: ["endpoint", "message", "type", "status", "statusCode", "createdAt"],
            actions: ["show"],
            disableAdd: true
        }
    }
    form(): IFormProperties {
        throw new Error("Method not implemented.");
    }
    show(): void {
        throw new Error("Method not implemented.");
    }
    /**
      * 
      * @param method 
      */
    validate(): Array<null> {
        return [];
    }
    processImages(): Array<null> {
        return [];
    }
}
export default new LogController();
