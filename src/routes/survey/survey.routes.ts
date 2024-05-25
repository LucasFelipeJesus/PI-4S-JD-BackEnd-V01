
import { Router } from 'express';
import SurveysController from '../../controllers/survey/survaysController';
import authenticationMiddleware from '../../middlewares/authentication.Middleware';

const surveyRoutes = Router();

surveyRoutes.post('/', authenticationMiddleware, SurveysController.store)
surveyRoutes.get('/', authenticationMiddleware, SurveysController.index)
surveyRoutes.get('/:id', authenticationMiddleware, SurveysController.show)
surveyRoutes.delete('/:id', authenticationMiddleware, SurveysController.delete)
surveyRoutes.put('/:id', authenticationMiddleware, SurveysController.update)

export default surveyRoutes;


