import { Request, Response } from 'express';
import ItemSurvey from '../../models/item_survey.entity';
import Evidence from '../../models/evidence.entity';


export default class ItemSurveyController {
    static async store(req: Request, res: Response) {
        const { description, status, evidence, survey } = req.body;
        const { authorization } = req.headers;

        if (!authorization) {
            return res.status(400).json({ message: 'Usuário não autenticado' });
        }
        if (!description || !status) {
            return res.status(400).json({ message: 'Campos (descrição e status) são obrigatórios' });
        }

        const item_survey = new ItemSurvey()
        item_survey.description = description
        item_survey.status = status
        item_survey.evidence = evidence
        item_survey.survey = survey

        await item_survey.save()
        return res.status(201).json(item_survey);

    }

    static async index(req: Request, res: Response) {
        const { authorization } = req.headers;
        if (!authorization) {
            return res.status(400).json({ message: 'Usuário não autenticado' });
        }
        const item_surveys = await ItemSurvey.find({ relations: ['evidence'] });
        return res.status(200).json(item_surveys);
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
        const item_survey = await ItemSurvey.findOne({ where: { id_item_survey: Number(id) }, relations: ['evidence'] })

        if (!item_survey) {
            return res.status(404).json({ erro: 'Item da vistoria não encontrado' });
        }
        return res.json(item_survey);
    }

    static async delete(req: Request, res: Response) {

        const { id } = req.params // const id = req.params.id 
        const { authorization } = req.headers;

        if (!authorization) {
            return res.status(400).json({ message: 'Usuário não autenticado' });
        }

        if (!id || isNaN(Number(id))) {
            return res.status(400).json({ message: 'ID é obrigatório' });
        }
        const item_survey = await ItemSurvey.findOne({ where: { id_item_survey: Number(id) } })

        if (!item_survey) {
            return res.status(404).json({ erro: 'Item da vistoria não encontrado' });
        }
        await item_survey.remove()
        return res.status(204).json();
    }

    static async update(req: Request, res: Response) {
        const { id } = req.params;
        const { description, status, evidence, survey } = req.body;
        const { authorization } = req.headers;

        if (!authorization) {
            return res.status(400).json({ message: 'Usuário não autenticado' });
        }

        if (!id || isNaN(Number(id))) {
            return res.status(400).json({ message: 'ID é obrigatório' });
        }

        if (!description) {
            return res.status(400).json({ message: 'Campos (observação e status) obrigatórios' });
        }

        const item_survey = await ItemSurvey.findOne({ where: { id_item_survey: Number(id) } });

        if (!item_survey) {
            return res.status(404).json({ error: 'Item da vistoria não encontrado' });
        }


        item_survey.description = description
        item_survey.status = status
        item_survey.evidence = evidence
        item_survey.survey = survey

        await item_survey.save()
        return res.status(200).json(item_survey);
    }
}