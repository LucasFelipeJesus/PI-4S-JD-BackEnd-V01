import Checklist from "../../models/checklist.entity";
import { Request, Response } from "express";



export default class ChecklistController {
    static async store(req: any, res: any) {
        const { description, item_checklist } = req.body;
        const { authorization } = req.headers;

        if (!authorization) {
            return res.status(400).json({ message: 'Usuário não autenticado' });
        }

        if (!description) {
            return res.status(400).json({ message: 'Campos (descrição ) são obrigatórios' });
        }
        const checklist = new Checklist()
        checklist.description = description
        checklist.item_checklist = [item_checklist]

        await checklist.save()
        return res.status(201).json(checklist);
    }

    static async index(req: Request, res: Response) {
        const { authorization } = req.headers;
        if (!authorization) {
            return res.status(400).json({ message: 'Usuário não autenticado' });
        }
        const checklists = await Checklist.find({ relations: ['item_checklist', 'equipment'] });
        return res.status(200).json(checklists);
    }

    static async show(req: Request, res: Response) {
        const { id } = req.params;
        const { authorization } = req.headers;

        if (!authorization) {
            return res.status(400).json({ message: 'Usuário não autenticado' });
        }

        if (!id || isNaN(Number(id))) {
            return res.status(400).json({ message: 'ID é obrigatório' });
        }
        const checklist = await Checklist.findOne({ where: { id_checklist: Number(id) }, relations: ['item_checklist'] })

        if (!checklist) {
            return res.status(404).json({ erro: 'Checklist não encontrado' });
        }
        return res.json(checklist);

    }
    static async delete(req: Request, res: Response) {
        const { id } = req.params; // const id = req.params.id  
        const { authorization } = req.headers;

        if (!authorization) {
            return res.status(400).json({ message: 'Usuário não autenticado' });
        }

        if (!id || isNaN(Number(id))) {
            return res.status(400).json({ error: 'O id é obrigatório!' });
        }

        const checklist = await Checklist.findOne({ where: { id_checklist: Number(id) }, relations: ['item_checklist'] });

        if (!checklist) {
            return res.status(404).json({ error: 'Não encontrado' });
        }

        await Checklist.remove(checklist);
        return res.status(204).json({ message: 'Checklist removido com sucesso' });
    }

    static async update(req: Request, res: Response) {
        const { id } = req.params;
        const { description, id_item_checklist } = req.body;
        const { authorization } = req.headers;

        if (!authorization) {
            return res.status(400).json({ message: 'Usuário não autenticado' });
        }

        if (!description) {
            return res.status(400).json({ message: ' Descrição e id do clecklist: Campo obrigatórios' });
        }

        if (!id || isNaN(Number(id))) {
            return res.status(400).json({ error: 'O id é obrigatório!' });
        }
        const checklist = await Checklist.findOne({ where: { id_checklist: Number(id) }, relations: ['item_checklist'] });

        if (!checklist) {
            return res.status(404).json({ error: 'Não encontrado' });
        }
        checklist.description = description;
        checklist.item_checklist = id_item_checklist;

        await checklist.save();
        return res.json(checklist);
    }

}