import { Router } from "express";
import ChecklistController from "../../controllers/checklist/checklistController";
import authenticationMiddleware from "../../middlewares/authentication.Middleware";

const checklistRoutes = Router();

checklistRoutes.post('/', authenticationMiddleware, ChecklistController.create)
checklistRoutes.get('/', authenticationMiddleware, ChecklistController.index)
checklistRoutes.get('/:id', authenticationMiddleware, ChecklistController.show)
checklistRoutes.delete('/:id', authenticationMiddleware, ChecklistController.delete)
checklistRoutes.put('/:id', authenticationMiddleware, ChecklistController.update)

export default checklistRoutes;
