import e, { Request, Response } from 'express';
import Equipment from '../../models/equipments.entity';

export default class EquipmentsController {
    static async create(req: Request, res: Response) {
        const { description, model, category, id_item_equipment } = req.body;

        if (!description || !model || !category) {
            return res.status(400).json({ message: 'Campos obrigatórios' });
        }

        const equipment = new Equipment()
        equipment.description = description
        equipment.model = model
        equipment.category = category
        equipment.item_equipment_id = Number(id_item_equipment)

        await equipment.save()

        return res.status(201).json(equipment);
    }

    static async index(req: Request, res: Response) {
        const equipments = await Equipment.find()
        return res.status(200).json(equipments);
    }
}