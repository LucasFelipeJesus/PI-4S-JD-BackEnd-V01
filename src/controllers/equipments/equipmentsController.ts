import e, { Request, Response } from 'express';
import Equipment from '../../models/equipments.entity';
import Checklist from '../../models/checklist.entity';

export default class EquipmentsController {
    static async store(req: Request, res: Response) {
        const { description, model, category, checklist } = req.body
        const { authorization } = req.headers;

        if (!authorization) {
            return res.status(400).json({ message: 'Usuário não autenticado' });
        }

        if (!description || !model || !category) {
            return res.status(400).json({ message: 'Campos (descrição, modelo e categoria) são obrigatórios' });
        }

        const Checklists = await Checklist.findOne({ where: { id_checklist: checklist } });

        if (!Checklists) {
            return res.status(404).json({ error: 'Checklist não encontrado favor cadastrar' });
        }

        const equipment = new Equipment()
        equipment.description = description
        equipment.model = model
        equipment.category = category
        equipment.checklist = checklist

        await equipment.save()
        return res.status(201).json(equipment);
    }

    static async index(req: Request, res: Response) {
        const { authorization } = req.headers;
        if (!authorization) {
            return res.status(400).json({ message: 'Usuário não autenticado' });
        }

        const equipments = await Equipment.find({ relations: ['survey', 'checklist', 'survey.item_survey', 'survey.user', 'checklist.item_checklist'] })
        return res.status(200).json(equipments);
    }

    static async show(req: any, res: any) {
        const { id } = req.params;
        const { authorization } = req.headers;
        if (!authorization) {
            return res.status(400).json({ message: 'Usuário não autenticado' });
        }

        if (!id || isNaN(Number(id))) {
            return res.status(400).json({ message: 'ID é obrigatório' });
        }
        const equipment = await Equipment.findOne({ where: { id_equipment: Number(id) }, relations: ['checklist', 'checklist.item_checklist'] })

        if (!equipment) {
            return res.status(404).json({ erro: 'Equipamento não encontrado' });
        }
        return res.json(equipment);
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

        const equipment = await Equipment.findOne({ where: { id_equipment: Number(id) }, relations: ['checklist'] });

        if (!equipment) {
            return res.status(404).json({ error: 'Não encontrado' });
        }

        if (equipment.checklist) {
            await equipment.checklist.remove();
        }
        await Equipment.remove(equipment);
        return res.status(204).json({ message: 'Equipamento removido com sucesso' });
    }

    static async update(req: Request, res: Response) {
        const { id } = req.params
        const { description, model, category, checklist } = req.body
        const { authorization } = req.headers

        if (!authorization) {
            return res.status(400).json({ message: 'Usuário não autenticado' });
        }

        if (!description || !model || !category) {
            return res.status(400).json({ message: 'Campos (descrição, modelo e categoria) são obrigatórios' });
        }

        if (!id || isNaN(Number(id))) {
            return res.status(400).json({ error: 'O id é obrigatório!' })
        }

        const equipment = await Equipment.findOne({ where: { id_equipment: Number(id) } })

        if (!equipment) {
            return res.status(404).json({ erro: 'Equipamento não encontrado' })
        }

        equipment.description = description
        equipment.model = model
        equipment.category = category
        equipment.checklist = checklist

        await equipment.save()
        return res.status(204).json()
    }
}