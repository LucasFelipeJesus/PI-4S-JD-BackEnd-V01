import { Router } from "express"
import equipmentsRoutes from "./equipments/equipments.routes"



const routes = Router()

routes.use('/equipments', equipmentsRoutes)

export default routes