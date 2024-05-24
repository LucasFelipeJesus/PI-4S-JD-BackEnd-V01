import { Router } from "express"
import checklistRoutes from "./checklists/checklist.routes"
import equipmentsRoutes from "./equipments/equipments.routes"
import itemChecklistRoutes from "./checklists/item_checklist.routes"
import authenticationRoutes from "./user_authentication/authentication.user.routes"
import surveyRoutes from "./survey/survey.routes"
import itemSurveyRoutes from "./survey/item_survey.routes"
import evidenceRoutes from "./evidence/evidence.routes"

const routes = Router()


routes.use('/equipment', equipmentsRoutes)
routes.use('/checklist', checklistRoutes)
routes.use('/item-checklist', itemChecklistRoutes)
routes.use('/authentication', authenticationRoutes)
routes.use('/survey', surveyRoutes)
routes.use('/item-survey', itemSurveyRoutes)
routes.use('/evidence', evidenceRoutes)

export default routes