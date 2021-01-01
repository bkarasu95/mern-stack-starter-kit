import "../../../../libraries/ApiResponse";
import ModelService from "../../../../services/ModelService.service";
import { Log } from './../../../../models/logs.model';
import ResourceController from "./ResourceController";

class LogController extends ResourceController {
    protected service: ModelService;
    constructor() {
        super();
        this.service = new ModelService(Log);
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
