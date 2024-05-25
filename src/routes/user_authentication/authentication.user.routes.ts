import { Router } from "express";
import AuthenticationController from "../../controllers/authentication/authentication.Controller";
import authenticationMiddleware from "../../middlewares/authentication.Middleware";


const authenticationRoutes = Router();

authenticationRoutes.post('/register', AuthenticationController.store)
authenticationRoutes.post('/login', AuthenticationController.login)
authenticationRoutes.post('/logout', AuthenticationController.logout)
authenticationRoutes.post('/refresh', AuthenticationController.refresh)
authenticationRoutes.get('/', authenticationMiddleware, AuthenticationController.index)
authenticationRoutes.get('/:id', authenticationMiddleware, AuthenticationController.show)
authenticationRoutes.delete('/:id', authenticationMiddleware, AuthenticationController.delete)
authenticationRoutes.put('/:id', authenticationMiddleware, AuthenticationController.update)

export default authenticationRoutes;
