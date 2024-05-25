import { Router } from "express";
import multer from "multer";
import { uploadAvatar } from "../../middlewares/upload/avatar";
import { evidenceController } from "../../controllers/evidence/evidenceController";




const evidenceRoutes = Router();

evidenceRoutes.post('/', multer(uploadAvatar.getconfig).single('avatar'), evidenceController.store);




export default evidenceRoutes;
