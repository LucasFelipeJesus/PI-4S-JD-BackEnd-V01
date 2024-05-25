import { Request, Response } from "express";
import Item_check from "../../models/item_checklist.entity";
import Item_Checklist from "../../models/item_checklist.entity";

export default class itemChecklistController {
    static async create(req: Request, res: Response) {
        const { description, id_checklist } = req.body;
        const { authorization } = req.headers;

        if (!authorization) {
            return res.status(400).json({ message: 'Usuário não autenticado' });
        }

        if (!description || !id_checklist) {
            return res.status(400).json({ message: 'Campos obrigatórios' });
        }

        const item_check = new Item_check()
        item_check.description = description
        item_check.checklist = id_checklist

        await item_check.save()
        return res.status(201).json(item_check);
    }

    static async index(req: Request, res: Response) {
        const { authorization } = req.headers;
        if (!authorization) {
            return res.status(400).json({ message: 'Usuário não autenticado' });
        }
        const itens_check = await Item_Checklist.find()
        return res.status(200).json(itens_check);
    }

    static async show(req: Request, res: Response) {
        const { id_item_checklist } = req.params;
        const { authorization } = req.headers;

        if (!authorization) {
            return res.status(400).json({ message: 'Usuário não autenticado' });
        }

        if (!id_item_checklist || isNaN(Number(id_item_checklist))) {
            return res.status(400).json({ message: 'ID é obrigatório' });
        }
        if (!id_item_checklist) {
            return res.status(404).json({ erro: 'Equipamento não encontrado' });
        }
        return res.json(id_item_checklist);
    }

    static async delete(req: Request, res: Response) {
        const { id } = req.params // const id = req.params.id  
        const { authorization } = req.headers;

        if (!authorization) {
            return res.status(400).json({ message: 'Usuário não autenticado' });
        }
        if (!id || isNaN(Number(id))) {
            return res.status(400).json({ error: 'O id é obrigatório!' })
        }
        const itens_check = await Item_check.findOneBy({ id_item_checklist: Number(id) })

        if (!itens_check) {
            return res.status(404).json({ erro: 'Não encontrado' })
        }
        itens_check.remove()
        return res.status(204).json()

    }
    static async update(req: Request, res: Response) {
        const { id } = req.params
        const { description } = req.body
        const { authorization } = req.headers;

        if (!authorization) {
            return res.status(400).json({ message: 'Usuário não autenticado' });
        }

        if (!description) {
            return res.status(400).json({ message: ' Descrição: Campo obrigatórios' });
        }

        if (!id || isNaN(Number(id))) {
            return res.status(400).json({ error: 'O id é obrigatório!' })
        }
        const itens_check = await Item_check.findOneBy({ id_item_checklist: Number(id) })

        if (!itens_check) {
            return res.status(404).json({ erro: 'Não encontrado' })
        }
        itens_check.description = description
        await itens_check.save()
        return res.status(204).json()
    }

}