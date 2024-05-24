import e, { Request, Response } from 'express';
import Equipment from '../../models/equipments.entity';


export default class EquipmentsController {
    static async store(req: Request, res: Response) {
        const { description, model, category } = req.body;
        const { id_user } = req.headers;

        if (!id_user) {
            return res.status(400).json({ message: 'Usuário não autenticado' });
        }
        if (!description || !model || !category) {
            return res.status(400).json({ message: 'Campos (descrição, modelo, categoria e id do checklist ) obrigatórios' });
        }

        const equipment = new Equipment()
        equipment.description = description
        equipment.model = model
        equipment.category = category
        equipment.id_user = Number(id_user)


        await equipment.save()
        return res.status(201).json(equipment);
    }

    static async index(req: Request, res: Response) {
        const { id_user } = req.headers;
        if (!id_user) {
            return res.status(400).json({ message: 'Usuário não autenticado' });
        }
        const equipments = await Equipment.find({ relations: ['checklist'] })
        return res.status(200).json(equipments);
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
        const equipment = await Equipment.findOne({ where: { id_equipment: id }, relations: ['checklist'] });

        if (!equipment) {
            return res.status(404).json({ erro: 'Equipamento não encontrado' });
        }
        return res.json(equipment);
    }

    // static async delete(req: Request, res: Response) {
    //     const { id } = req.params
    //     if (!id || isNaN(Number(id))) {
    //         return res.status(400).json({ error: 'O id é obrigatório!' })
    //     }
    //     const equipment = await Equipment.findOne({ where: { id_equipment: Number(id) }, relations: ['checklist'] })

    //     if (!equipment) {
    //         return res.status(404).json({ erro: 'Não encontrado' })
    //     }
    //     equipment.remove()
    //     return res.status(204).json()
    // }

    static async delete(req: Request, res: Response) {
        const { id } = req.params;
        const { id_user } = req.headers;

        if (!id_user) {
            return res.status(400).json({ message: 'Usuário não autenticado' });
        }

        if (!id || isNaN(Number(id))) {
            return res.status(400).json({ error: 'O id é obrigatório!' });
        }

        const equipment = await Equipment.findOne({ where: { id_equipment: Number(id) }, relations: ['checklist'] });

        if (!equipment) {
            return res.status(404).json({ error: 'Não encontrado' });
        }

        if (equipment.checklist && equipment.checklist.length > 0) {
            return res.status(400).json({ error: 'Não é possível deletar o equipamento pois existem checklists relacionados.' });
        }

        await Equipment.remove(equipment);
        return res.status(204).json({ message: 'Equipamento removido com sucesso' });
    }

    static async update(req: Request, res: Response) {
        const { id } = req.params
        const { description, model, category } = req.body
        const { id_user } = req.headers

        if (!id_user) {
            return res.status(400).json({ message: 'Usuário não autenticado' });
        }

        if (!description || !model || !category) {
            return res.status(400).json({ message: 'Campos obrigatórios' });
        }

        if (!id || isNaN(Number(id))) {
            return res.status(400).json({ error: 'O id é obrigatório!' })
        }

        const equipment = await Equipment.findOne({ where: { id_equipment: Number(id) } })

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