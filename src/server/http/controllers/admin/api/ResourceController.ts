import { NextFunction, Request, Response } from "express";
import { validationResult } from "express-validator";
import HttpException from "../../../../exceptions/api/http-exception";
import { toURLConverter } from "../../../../helpers/route";
import ModelService from "../../../../services/ModelService.service";

abstract class ResourceController {
    protected abstract service: ModelService;
    list = async (req: Request, res: Response, next: NextFunction) => {
        try {
            let limitParam: string = typeof req.query.limit != "undefined" ? req.query.limit.toString() : "";
            let offsetParam: string = typeof req.query.start != "undefined" ? req.query.start.toString() : "";
            let count = await this.service.count(); // total data count

            let limit: number | null = Number.parseInt(limitParam);
            let offset: number | null = Number.parseInt(offsetParam);
            const data = await this.service.findAll({}, {}, limit, offset);
            res.setMessage("Records Fetched").customResponse({ items: data, total: count });
        } catch (e) {
            next(e);
        }
    };
    show = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const item = await this.service.find({ _id: req.params.id });
            if (item.length === 0) {
                throw new HttpException(400, "Record Not Found");
            }
            res.setMessage("Record Fetched").customResponse(item[0]);
        } catch (e) {
            next(e);
        }
    };
    insert = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const validationError = validationResult(req);
            if (!validationError.isEmpty()) {
                const validation = validationError.mapped();
                const firstValidationMessage = validation[Object.keys(validation)[0]].msg;
                throw new HttpException(422, "Validation Failed: " + firstValidationMessage + " in " + validation[Object.keys(validation)[0]].param, {
                    validation: validation,
                });
            }
            req.body.slug = req.body.slug ? toURLConverter(req.body.slug) : toURLConverter(req.body.name); // TODO check this with different model that slug doesnt exists.
            let model = req.body;
            if (typeof req.files != "undefined") {
                model.images = this.processImages(req);
                if (model.images.length === 0) {
                    delete model.images;
                }
            }
            await this.service.insert(model);
            res.setMessage("Record Added").customResponse(model);
        } catch (e) {
            next(e);
        }
    };
    update = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const validationError = validationResult(req);
            if (!validationError.isEmpty()) {
                throw new HttpException(422, "Validation Failed", {
                    validation: validationError.mapped(),
                });
            }
            const model: Document = req.body;
            // TODO make compatible
            // model.images = this.processImages(req);
            await this.service.update(req.params.id, model);
            res.setMessage("Record Updated").customResponse(model);
        } catch (e) {
            next(e);
        }
    };

    delete = async (req: Request, res: Response, next: NextFunction) => {
        try {
            if (!this.service.delete(req.params.id)) {
                throw new HttpException(400, "Record Couldn't Deleted");
            }
            res.setMessage("Record Deleted").customResponse();
        } catch (e) {
            next(e);
        }
    };
    /**
     * 
     * @param method 
     */
    abstract validate(method: string): Array<any>;
    /**
     * 
     * @param request 
     */
    abstract processImages(request: Request): Array<any>;

    // TODO think about add afterUpdate, afterSave, beforeUpdate, beforeSave
}

export default ResourceController;