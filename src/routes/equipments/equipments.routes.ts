import { Router } from "express";
import equipmentsController from "../../controllers/equipments/equipmentsController";

const equipmentsRoutes = Router();

equipmentsRoutes.post('/', equipmentsController.create)
equipmentsRoutes.get('/', equipmentsController.index)
equipmentsRoutes.get('/:id', equipmentsController.show)
equipmentsRoutes.delete('/:id', equipmentsController.delete)
equipmentsRoutes.put('/:id', equipmentsController.update)

export default equipmentsRoutes;