import { Router } from "express";
import itemChecklistController from "../../controllers/checklist/itemChecklistController";


const itemChecklistRoutes = Router();

itemChecklistRoutes.post('/', itemChecklistController.create)
itemChecklistRoutes.get('/', itemChecklistController.index)
itemChecklistRoutes.get('/:id', itemChecklistController.show)
itemChecklistRoutes.delete('/:id', itemChecklistController.delete)
itemChecklistRoutes.put('/:id', itemChecklistController.update)

export default itemChecklistRoutes;