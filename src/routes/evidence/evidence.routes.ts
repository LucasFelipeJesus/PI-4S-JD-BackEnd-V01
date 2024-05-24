import { Router } from "express";
import EvidenceController from "../../controllers/evidence/evidenceController";
import multer from 'multer';

const evidenceRoutes = Router();

evidenceRoutes.post('/', EvidenceController.store);
evidenceRoutes.get('/', EvidenceController.index);
evidenceRoutes.get('/:id', EvidenceController.show);
evidenceRoutes.delete('/:id', EvidenceController.delete);
evidenceRoutes.put('/:id', EvidenceController.update);



export default evidenceRoutes;
