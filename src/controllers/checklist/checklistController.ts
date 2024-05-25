import Checklist from "../../models/checklist.entity";
import Equipment from "../../models/equipments.entity";
import Item_Checklist from "../../models/item_checklist.entity";
import { Request, Response } from "express";



export default class ChecklistController {
    static async create(req: any, res: any) {
        const { description, id_equipment } = req.body;
        const { authorization } = req.headers;

        if (!authorization) {
            return res.status(400).json({ message: 'Usuário não autenticado' });
        }

        if (!description || !id_equipment) {
            return res.status(400).json({ message: 'Campos (descrição e id do equipamento) são obrigatórios' });
        }

        const equipment = await Equipment.findOne({ where: { id_equipment } });

        if (!equipment) {
            return res.status(404).json({ error: 'Equipamento não encontrado favor cadastrar' });
        }
        const checklist = new Checklist()
        checklist.description = description
        checklist.equipment = id_equipment
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

    // static async delete(req: Request, res: Response) {
    //     const { id } = req.params // const id = req.params.id  

    //     if (!id || isNaN(Number(id))) {
    //         return res.status(400).json({ error: 'O id é obrigatório!' })
    //     }
    //     const checklist = await Checklist.findOne({ where: { id_checklist: Number(id) }, relations: ['item_checklist'] })

    //     if (!checklist) {
    //         return res.status(404).json({ erro: 'Não encontrado' })
    //     }

    //     if (checklist.item_checklist && checklist.item_checklist.length > 0) {
    //         await Promise.all(checklist.item_checklist.map(item_checklist => Item_Checklist.remove(item_checklist)));
    //     }

    //     await Checklist.remove(checklist)
    //     return res.status(204).json({ message: 'Checklist e itens  removidos com sucesso' })

    // }

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

        if (checklist.item_checklist && checklist.item_checklist.length > 0) {
            return res.status(400).json({ error: 'Não é possível deletar o checklist pois existem itens relacionados.' });
        }

        await Checklist.remove(checklist);
        return res.status(204).json({ message: 'Checklist removido com sucesso' });
    }
    // static async update(req: Request, res: Response) {
    //     const { id } = req.params
    //     const { description, id_item_checklist } = req.body

    //     if (!description || !id_item_checklist) {
    //         return res.status(400).json({ message: 'Campos descrição e id de item) obrigatórios' });
    //     }

    //     if (!id || isNaN(Number(id))) {
    //         return res.status(400).json({ error: 'O id é obrigatório!' })
    //     }
    //     const checklist = await Checklist.findOne({ where: { id_checklist: Number(id) }, relations: ['item_checklist'] })

    //     if (!checklist) {
    //         return res.status(404).json({ erro: 'Não encontrado' })
    //     }

    //     checklist.description = description ?? checklist.description
    //     checklist.item_checklist = id_item_checklist ?? checklist.item_checklist

    //     await checklist.save()
    //     return res.json(checklist)
    // }

    static async update(req: Request, res: Response) {
        const { id } = req.params;
        const { description, id_item_checklist } = req.body;
        const { authorization } = req.headers;

        if (!authorization) {
            return res.status(400).json({ message: 'Usuário não autenticado' });
        }

        if (!description || !Array.isArray(id_item_checklist) || id_item_checklist.length === 0) {
            return res.status(400).json({ message: 'Campos descrição e uma lista de ids de itens obrigatórios' });
        }

        if (!id || isNaN(Number(id))) {
            return res.status(400).json({ error: 'O id é obrigatório!' });
        }

        const checklist = await Checklist.findOne({ where: { id_checklist: Number(id) }, relations: ['item_checklist'] });

        if (!checklist) {
            return res.status(404).json({ error: 'Não encontrado' });
        }

        const itemChecklists = await Item_Checklist.findByIds(id_item_checklist);

        if (itemChecklists.length !== id_item_checklist.length) {
            return res.status(404).json({ error: 'Um ou mais itens de checklist não foram encontrados' });
        }

        checklist.description = description;
        checklist.item_checklist = itemChecklists;

        await checklist.save();
        return res.json(checklist);
    }

}