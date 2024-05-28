
import Survey from "../../models/survey.entity";
import { Request, Response } from 'express';


export default class SurveysController {
    static async store(req: Request, res: Response) {
        const { description, equipment, date_start, date_end, user, item_survey } = req.body;
        const { authorization } = req.headers;

        if (!authorization) {
            return res.status(400).json({ message: 'Usuário não autenticado' });
        }

        if (!description || !date_start!) {
            return res.status(400).json({ message: 'Campos (descrição, data de inicio e término) são obrigatórios' });
        }
        const survey = new Survey()
        survey.description = description
        survey.date_start = date_start
        survey.date_end = date_end
        survey.user = user
        survey.equipment = equipment
        survey.item_survey = item_survey


        await survey.save()
        return res.status(201).json(survey);
    }

    static async index(req: Request, res: Response) {
        const { authorization } = req.headers;
        if (!authorization) {
            return res.status(400).json({ message: 'Usuário não autenticado' });
        }
        const surveys = await Survey.find({ relations: ['item_survey', 'user', 'equipment', 'equipment.checklist', 'equipment.checklist.item_checklist'] });
        return res.status(200).json(surveys);
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
        const surveys = await Survey.find({ where: { id_survey: Number(id) }, relations: ['item_survey'] });
        //const survey = await Survey.findOne({ where: { id_survey: Number(id) }, relations: ['item_survey'] })

        if (!surveys) {
            return res.status(404).json({ erro: 'Vistoria não encontrada' });
        }
        return res.json(surveys);
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
        const survey = await Survey.findOne({ where: { id_survey: Number(id) }, relations: ['item_survey'] })

        if (!survey) {
            return res.status(404).json({ erro: 'Não encontrado' })
        }

        if (survey.item_survey && survey.item_survey.length > 0) {
            await survey.item_survey.forEach(async item => {
                await item.remove()
            })
        }

        await Survey.remove(survey)
        return res.status(204).json({ message: 'Vistoria removida com sucesso' })
    }

    static async update(req: Request, res: Response) {
        const { id } = req.params
        const { description, equipment, date_start, date_end, user, item_survey } = req.body;
        const { authorization } = req.headers

        if (!authorization) {
            return res.status(400).json({ message: 'Usuário não autenticado' })
        }
        if (!description || !date_start) {
            return res.status(400).json({ message: 'Campos (descrição, data de inicio e término) são obrigatórios' })
        }

        if (!id || isNaN(Number(id))) {
            return res.status(400).json({ error: 'O id é obrigatório!' })
        }

        const survey = await Survey.findOne({ where: { id_survey: Number(id) } })

        if (!survey) {
            return res.status(404).json({ erro: 'Vistoria não encontrada' })
        }

        survey.description = description
        survey.date_start = date_start
        survey.date_end = date_end
        survey.user = user
        survey.equipment = equipment
        survey.item_survey = item_survey

        await survey.save()
        return res.status(200).json(survey)
    }


}



