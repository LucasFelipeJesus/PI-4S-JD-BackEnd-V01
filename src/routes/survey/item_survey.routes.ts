import { Router } from "express";
import ItemSurveyController from "../../controllers/survey/item_survayController";
import authenticationMiddleware from "../../middlewares/authentication.Middleware";

const itemSurveyRoutes = Router();

itemSurveyRoutes.post('/', authenticationMiddleware, ItemSurveyController.store)
itemSurveyRoutes.get('/', authenticationMiddleware, ItemSurveyController.index)
itemSurveyRoutes.get('/:id', authenticationMiddleware, ItemSurveyController.show)
itemSurveyRoutes.delete('/:id', authenticationMiddleware, ItemSurveyController.delete)
itemSurveyRoutes.put('/:id', authenticationMiddleware, ItemSurveyController.update)

export default itemSurveyRoutes;

