
import { Router } from 'express';
import SurveysController from '../../controllers/survey/survaysController';

const surveyRoutes = Router();

surveyRoutes.post('/', SurveysController.store)
surveyRoutes.get('/', SurveysController.index)
surveyRoutes.get('/:id', SurveysController.show)
surveyRoutes.delete('/:id', SurveysController.delete)
surveyRoutes.put('/:id', SurveysController.update)

export default surveyRoutes;


