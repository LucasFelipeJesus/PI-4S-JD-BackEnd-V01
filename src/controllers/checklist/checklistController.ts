import Checklist from "../../models/checklist.entity";

import { Request, Response } from "express";

export default class ChecklistController {
    static async store(req: any, res: any) {
        const { description } = req.body;
        const { authorization } = req.headers;

        if (!authorization) {
            return res.status(400).json({ message: 'Usuário não autenticado ' });
        }

        if (!description) {
            return res.status(400).json({ message: 'Campos (descrição) são obrigatórios' });
        }
        const checklist = new Checklist()
        checklist.description = description

        await checklist.save()
        return res.status(201).json(checklist);
    }

    static async index(req: Request, res: Response) {
        const { authorization } = req.headers;
        if (!authorization) {
            return res.status(400).json({ message: 'Usuário não autenticado' });
        }
        const checklists = await Checklist.find({ relations: ['item_checklist'] });
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

    static async removeItem(req: Request, res: Response) {
        const { id, id_item_checklist } = req.params;
        const { authorization } = req.headers;

        if (!authorization) {
            return res.status(400).json({ message: 'Usuário não autenticado' });
        }

        if (!id || isNaN(Number(id)) || !id_item_checklist || isNaN(Number(id_item_checklist))) {
            return res.status(400).json({ error: 'O id é obrigatório!' });
        }

        const checklist = await Checklist.findOne({ where: { id_checklist: Number(id) }, relations: ['item_checklist'] });

        if (!checklist) {
            return res.status(404).json({ error: 'Não encontrado' });
        }

        checklist.item_checklist?.filter(item => item.id_item_checklist !== Number(id_item_checklist));

        checklist.save();

        return res.status(204).json({ message: 'Item checklist removido com sucesso' });
    }

    static async delete(req: Request, res: Response) {
        const { id } = req.params;
        const { authorization } = req.headers;

        if (!authorization) {
            return res.status(400).json({ message: 'Usuário não autenticado' });
        }

        if (!id || isNaN(Number(id))) {
            return res.status(400).json({ error: 'O id é obrigatório!' });
        }

        const checklist = await Checklist.findOne({ where: { id_checklist: Number(id) } });

        if (!checklist) {
            return res.status(404).json({ error: 'Não encontrado' });
        }

        if (checklist.item_checklist) {
            return res.status(400).json({ error: 'Há itens dentro desse checklist' });
        }

        await Checklist.remove(checklist);
        return res.status(204).json({ message: 'Checklist removido com sucesso' });
    }

    static async update(req: Request, res: Response) {
        const { id } = req.params;
        const { description } = req.body;
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

        checklist.description = description ?? checklist.description;



        await checklist.save();
        return res.status(200).json(checklist);
    }

}