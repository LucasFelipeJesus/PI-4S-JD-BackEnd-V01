import e, { Request, Response } from 'express';
import Equipment from '../../models/equipments.entity';
import { getRepository } from 'typeorm';
import Survey from '../../models/survey.entity';
import Checklist from '../../models/checklist.entity';


export default class EquipmentsController {
    static async store(req: Request, res: Response) {
        const { description, model, category, id_survey } = req.body
        const { authorization } = req.headers;

        if (!authorization) {
            return res.status(400).json({ message: 'Usuário não autenticado' });
        }

        if (!description || !model || !category || !id_survey) {
            return res.status(400).json({ message: 'Campos (descrição, modelo, categoria e id da vistoria ) são obrigatórios' });
        }

        const survey = await Survey.findOne({ where: { id_survey } });

        if (!survey) {
            return res.status(404).json({ error: 'Vistoria não encontrada favor cadastrar' });
        }

        const equipment = new Equipment()
        equipment.description = description
        equipment.model = model
        equipment.category = category
        equipment.survey = id_survey

        await equipment.save()
        return res.status(201).json(equipment);
    }

    static async index(req: Request, res: Response) {
        const { authorization } = req.headers;
        if (!authorization) {
            return res.status(400).json({ message: 'Usuário não autenticado' });
        }

        const equipments = await Equipment.find({ relations: ['checklist'] && ['checklist.item_checklist'] && ['survey'] && ['survey.item_survey'] })
        const equipmentsFiltered = equipments.map(equipment => {
            return {
                id_equipment: equipment.id_equipment,
                description: equipment.description,
                model: equipment.model,
                category: equipment.category,
                equipment: equipment.checklist,
                vistoria: equipment.survey,




            }
        })

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

        if (equipment.checklist && equipment.checklist.length > 0) {
            return res.status(400).json({ error: 'Não é possível deletar o equipamento pois existem checklists relacionados.' });
        }

        await Equipment.remove(equipment);
        return res.status(204).json({ message: 'Equipamento removido com sucesso' });
    }

    static async update(req: Request, res: Response) {
        const { id } = req.params
        const { description, model, category, id_survey } = req.body
        const { authorization } = req.headers

        if (!authorization) {
            return res.status(400).json({ message: 'Usuário não autenticado' });
        }

        if (!description || !model || !category || !id_survey) {
            return res.status(400).json({ message: 'Campos (descrição, modelo, categoria e id da vistoria ) são obrigatórios' });
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
        equipment.survey = id_survey

        await equipment.save()
        return res.status(204).json()
    }
}