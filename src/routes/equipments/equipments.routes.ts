import { Router } from "express";
import equipmentsController from "../../controllers/equipments/equipmentsController";
import authenticationMiddleware from "../../middlewares/authentication.Middleware";

const equipmentsRoutes = Router();

equipmentsRoutes.post('/', authenticationMiddleware, equipmentsController.store)
equipmentsRoutes.get('/', authenticationMiddleware, equipmentsController.index)
equipmentsRoutes.get('/:id', authenticationMiddleware, equipmentsController.show)
equipmentsRoutes.delete('/:id', authenticationMiddleware, equipmentsController.delete)
equipmentsRoutes.put('/:id', authenticationMiddleware, equipmentsController.update)

export default equipmentsRoutes;