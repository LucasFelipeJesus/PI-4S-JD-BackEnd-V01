import e, { Request, Response } from 'express';
import Equipment from '../../models/equipments.entity';

export default class EquipmentsController {
    static async create(req: Request, res: Response) {
        const { description, model, category, id_checklist } = req.body;

        if (!description || !model || !category || !id_checklist) {
            return res.status(400).json({ message: 'Campos (descrição, modelo, categoria e id do checklist ) obrigatórios' });
        }

        const equipment = new Equipment()
        equipment.description = description
        equipment.model = model
        equipment.category = category
        equipment.checklist = id_checklist


        await equipment.save()
        return res.status(201).json(equipment);
    }

    static async index(req: Request, res: Response) {
        const equipments = await Equipment.find()
        return res.status(200).json(equipments);
    }

    static async show(req: Request, res: Response) {
        const { id } = req.params;

        if (!id || isNaN(Number(id))) {
            return res.status(400).json({ message: 'ID é obrigatório' });
        }
        const equipment = await Equipment.findOneBy({ id_equipment: Number(id) })
        if (!equipment) {
            return res.status(404).json({ erro: 'Equipamento não encontrado' });
        }
        return res.json(equipment);
    }

    static async delete(req: Request, res: Response) {
        const { id } = req.params

        if (!id || isNaN(Number(id))) {
            return res.status(400).json({ error: 'O id é obrigatório!' })
        }
        const equipment = await Equipment.findOneBy({ id_equipment: Number(id) })

        if (!equipment) {
            return res.status(404).json({ erro: 'Não encontrado' })
        }

        equipment.remove()
        return res.status(204).json()
    }

    static async update(req: Request, res: Response) {
        const { id } = req.params
        const { description, model, category, id_checklist } = req.body

        if (!description || !model || !category) {
            return res.status(400).json({ message: 'Campos obrigatórios' });
        }

        if (!id || isNaN(Number(id))) {
            return res.status(400).json({ error: 'O id é obrigatório!' })
        }

        const equipment = await Equipment.findOneBy({ id_equipment: Number(id) })

        if (!equipment) {
            return res.status(404).json({ erro: 'Não encontrado' })
        }

        equipment.description = description
        equipment.model = model
        equipment.category = category


        await equipment.save()

        return res.status(204).json()
    }
}