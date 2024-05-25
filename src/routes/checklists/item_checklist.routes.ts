import { Router } from "express";
import itemChecklistController from "../../controllers/checklist/itemChecklistController";
import authenticationMiddleware from "../../middlewares/authentication.Middleware";


const itemChecklistRoutes = Router();

itemChecklistRoutes.post('/', authenticationMiddleware, itemChecklistController.create)
itemChecklistRoutes.get('/', authenticationMiddleware, itemChecklistController.index)
itemChecklistRoutes.get('/:id', authenticationMiddleware, itemChecklistController.show)
itemChecklistRoutes.delete('/:id', authenticationMiddleware, itemChecklistController.delete)
itemChecklistRoutes.put('/:id', authenticationMiddleware, itemChecklistController.update)

export default itemChecklistRoutes;