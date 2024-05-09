import { Router } from "express";
import equipmentsController from "../../controllers/equipments/equipmentsController";

const equipmentsRoutes = Router();

equipmentsRoutes.post('/', equipmentsController.create)
equipmentsRoutes.get('/', equipmentsController.index)

export default equipmentsRoutes;