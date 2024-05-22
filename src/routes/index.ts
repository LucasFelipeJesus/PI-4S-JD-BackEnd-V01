import { Router } from "express"
import equipmentsRoutes from "./equipments/equipments.routes"
import checklistRoutes from "./equipments/checklist.routes"
import itemChecklistRoutes from "./equipments/item_checklist.routes"



const routes = Router()

routes.use('/equipment', equipmentsRoutes)
routes.use('/checklist', checklistRoutes)
routes.use('/item-checklist', itemChecklistRoutes)

export default routes