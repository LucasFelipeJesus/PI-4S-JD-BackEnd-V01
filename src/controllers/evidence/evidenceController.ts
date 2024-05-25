import { Request, Response } from "express";

class EvidenceController {

    public store(req: Request, res: Response) {
        if (req.file) {
            return res.json({ response: req.file });
        }
        res.status(409);

        return res.json({
            response: 'Arquivo não suportado!',

        });
    }

    public show(req: Request, res: Response) {

        res.json({ response: 'ok' });
    }

    public update(req: Request, res: Response) {
        res.json({ response: 'ok' });
    }

    public delete(req: Request, res: Response) {
        res.json({ response: 'ok' });
    }

}

export const evidenceController = new EvidenceController();









































// const multer = require('multer');
// const path = require('path');
// const crypt = require('crypto');

// module.exports = {
//     dest: path.resolve(__dirname, '..', '..', 'uploads'),
//     storage: multer.diskStorage({
//         destination: (req: any, file: any, callback: (arg0: null, arg1: any) => void) => {
//             callback(null, path.resolve(__dirname, '..', '..', 'uploads'));
//         },
//         filename: (req: any, file: { originalname: any; }, callback: (arg0: null, arg1: string | undefined) => void) => {
//             crypt.randomBytes(16, (error: any, hash: { toString: (arg0: string) => any; }) => {
//                 if (error) callback(null, error);
//                 const filename = `${hash.toString('hex')}-${file.originalname}`;
//                 callback(null, filename);
//             });
//         },

//     }),
//     limits: {
//         fileSize: 2 * 1024 * 1024,
//     },
//     fileFilter: (req: any, file: { mimetype: string; }, callback: (arg0: null, arg1: boolean) => void) => {
//         const allowedMimes = [
//             'image/jpeg',
//             'image/pjpeg',
//             'image/png',
//         ];

//         if (allowedMimes.includes(file.mimetype)) {
//             callback(null, true);
//         } else {
//             callback(null, false);
//         }

//     },

// };



