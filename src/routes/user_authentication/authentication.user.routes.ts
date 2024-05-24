import { Router } from "express";
import AuthenticationController from "../../controllers/authentication/authentication.Controller";
import authenticationMiddleware from "../../middlewares/authentication.Middleware";


const authenticationRoutes = Router();

authenticationRoutes.post('/register', AuthenticationController.store)
authenticationRoutes.post('/login', AuthenticationController.login)
authenticationRoutes.post('/logout', AuthenticationController.logout)
authenticationRoutes.post('/refresh', AuthenticationController.refresh)
authenticationRoutes.get('/', AuthenticationController.index)
authenticationRoutes.get('/:id', AuthenticationController.show)
authenticationRoutes.delete('/:id', AuthenticationController.delete)
authenticationRoutes.put('/:id', AuthenticationController.update)

export default authenticationRoutes;
