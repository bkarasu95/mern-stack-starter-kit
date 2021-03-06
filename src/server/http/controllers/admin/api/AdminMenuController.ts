import { Request, Response } from "express";
import { IAdminMenu } from "../../../../../../@types/server/models";
import "../../../../libraries/ApiResponse";
import ModelService from "../../../../services/ModelService.service";
import { AdminMenu } from './../../../../models/admin_menu.model';
import { treeAdminMenu } from '../../../../helpers/treeAdminMenu';

class AdminMenuController {
    async getList(req: Request, res: Response) {
        const service = new ModelService(AdminMenu);
        let sidebarItems: Array<IAdminMenu> = await service.findAll().lean();
        sidebarItems = treeAdminMenu(sidebarItems);
        res.setMessage('').customResponse(sidebarItems);
    }
}
export default new AdminMenuController();
