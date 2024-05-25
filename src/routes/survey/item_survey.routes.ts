import { Router } from "express";
import ItemSurveyController from "../../controllers/survey/item_survayController";

const itemSurveyRoutes = Router();

itemSurveyRoutes.post('/', ItemSurveyController.store)
itemSurveyRoutes.get('/', ItemSurveyController.index)
itemSurveyRoutes.get('/:id', ItemSurveyController.show)
itemSurveyRoutes.delete('/:id', ItemSurveyController.delete)
itemSurveyRoutes.put('/:id', ItemSurveyController.update)

export default itemSurveyRoutes;

