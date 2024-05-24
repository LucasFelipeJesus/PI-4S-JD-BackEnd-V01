import { Request, Response } from "express";
import Evidence from "../../models/evidence.entity";



export default class EvidenceController {

    static async store(req: any, res: any) {
        const { id_user } = req.headers;
        const { description, photo, item_survey } = req.body;

        if (!id_user) {
            return res.status(400).json({ message: 'Usuário não autenticado' });
        }
        if (!description || !photo || !item_survey) {
            return res.status(400).json({ message: 'Campos (descrição e imagem) obrigatórios' });
        }

        const evidence = new Evidence();
        evidence.description = description;
        evidence.photo = photo;
        evidence.id_user = Number(id_user);


        await evidence.save();
        return res.status(201).json(evidence);
    }

    static async index(req: any, res: any) {
        const { id_user } = req.headers;
        if (!id_user) {
            return res.status(400).json({ message: 'Usuário não autenticado' });
        }
        const evidences = await Evidence.find({ relations: ['item_survey'] });
        return res.status(200).json(evidences);
    }

    static async show(req: any, res: any) {
        const { id } = req.params;
        const { id_user } = req.headers;
        if (!id_user) {
            return res.status(400).json({ message: 'Usuário não autenticado' });
        }

        if (!id || isNaN(Number(id))) {
            return res.status(400).json({ message: 'ID é obrigatório' });
        }
        const evidence = await Evidence.findOne({ where: { id_evidence: id }, relations: ['item_survey'] });

        if (!evidence) {
            return res.status(404).json({ erro: 'Evidência não encontrada' });
        }
        return res.json(evidence);
    }


    static async delete(req: Request, res: Response) {
        const { id } = req.params
        const { id_user } = req.headers;

        if (!id_user) {
            return res.status(400).json({ message: 'Usuário não autenticado' });
        }

        if (!id || isNaN(Number(id))) {
            return res.status(400).json({ error: 'O id é obrigatório!' })
        }
        const evidence = await Evidence.findOne({ where: { id_evidence: Number(id) }, relations: ['item_survey'] })

        if (!evidence) {
            return res.status(404).json({ erro: 'Não encontrado' })
        }
        evidence.remove()
        return res.status(204).json()

    }

    static async update(req: Request, res: Response) {
        const { id } = req.params;
        const { id_user } = req.headers;
        const { description, photo, item_survey } = req.body;

        if (!id_user) {
            return res.status(400).json({ message: 'Usuário não autenticado' });
        }
        if (!description || !photo || !item_survey) {
            return res.status(400).json({ message: 'Campos (descrição e imagem) obrigatórios' });
        }

        const evidence = await Evidence.findOne({ where: { id_evidence: Number(id) } });
        if (!evidence) {
            return res.status(404).json({ erro: 'Evidência não encontrada' });
        }
        evidence.description = description;
        evidence.photo = photo;
        evidence.id_user = Number(id_user);
        evidence.item_survey = item_survey;

        await evidence.save();
        return res.status(200).json(evidence);
    }








}













































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



