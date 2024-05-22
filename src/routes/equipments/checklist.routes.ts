import { Router } from "express";
import ChecklistController from "../../controllers/checklist/checklist_Controller";

const checklistRoutes = Router();

checklistRoutes.post('/', ChecklistController.create)
checklistRoutes.get('/', ChecklistController.index)
checklistRoutes.get('/:id', ChecklistController.show)
checklistRoutes.delete('/:id', ChecklistController.delete)
checklistRoutes.put('/:id', ChecklistController.update)

export default checklistRoutes;
