import { Request, Response } from "express";
import Item_check from "../../models/item_checklist.entity";
import Item_Checklist from "../../models/item_checklist.entity";


export default class itemChecklistController {
    static async store(req: Request, res: Response) {
        const { description, item_survey, checklist } = req.body;
        const { authorization } = req.headers;

        if (!authorization) {
            return res.status(400).json({ message: 'Usuário não autenticado' });
        }

        if (!description) {
            return res.status(400).json({ message: 'Descrição é obrigatória' });
        }


        const item_check = new Item_check()
        item_check.description = description
        item_check.item_survey = item_survey
        item_check.checklist = checklist

        await item_check.save()
        return res.status(201).json(item_check);
    }

    static async index(req: Request, res: Response) {
        const { authorization } = req.headers;
        if (!authorization) {
            return res.status(400).json({ message: 'Usuário não autenticado' });
        }
        const itens_check = await Item_Checklist.find({ relations: ['checklist'] })
        return res.status(200).json(itens_check);
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
        const id_item_checklist = await Item_check.findOneBy({ id_item_checklist: Number(id) })

        if (!id_item_checklist) {
            return res.status(404).json({ erro: 'Não encontrado' });
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
        const itens_check = await Item_check.findOne({ where: { id_item_checklist: Number(id) }, relations: ['checklist'] })

        if (!itens_check) return res.status(400).json({ error: "Não Há Item Encontrado" })//verfificação de existencia de item
        if (itens_check?.checklist) return res.status(400).json({ error: "Voce não pode apagar pois há uma checklist atrelada" })//verificação para impedir apagar item caso há checklists atreladas

        if (!itens_check) {
            return res.status(404).json({ erro: 'Não encontrado' })
        }
        itens_check.remove()
        return res.status(204).json()

    }
    static async update(req: Request, res: Response) {
        const { id } = req.params
        const { description, checklist } = req.body
        const { authorization } = req.headers;

        if (!authorization) {
            return res.status(400).json({ message: 'Usuário não autenticado' });
        }

        if (!description) {
            return res.status(400).json({ message: ' Descrição e id do clecklist: Campo obrigatórios' });
        }

        if (!id || isNaN(Number(id))) {
            return res.status(400).json({ error: 'O id é obrigatório!' })
        }
        const itens_check = await Item_check.findOneBy({ id_item_checklist: Number(id) })

        if (!itens_check) {
            return res.status(404).json({ erro: 'Não encontrado' })
        }
        itens_check.description = description ?? itens_check.description
        itens_check.checklist = checklist ?? itens_check.checklist

        await itens_check.save()
        return res.status(204).json()
    }

}