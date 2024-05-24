import Survey from "../../models/survey.entity";
import { Request, Response } from 'express';


export default class SurveysController {
    static async store(req: Request, res: Response) {
        const { description, date_start, id_equipment } = req.body;
        const { id_user } = req.headers;

        if (!id_user) {
            return res.status(400).json({ message: 'Usuário não autenticado' });
        }

        if (!description || !date_start || !id_equipment) {
            return res.status(400).json({ message: 'Campos (descrição e id do item do checklist) obrigatórios' });
        }
        const survey = new Survey()
        survey.description = description
        survey.date_start = date_start
        survey.id_user = Number(id_user)
        survey.equipment = id_equipment

        await survey.save()
        return res.status(201).json(survey);

    }

    static async index(req: Request, res: Response) {
        const { id_user } = req.headers;
        if (!id_user) {
            return res.status(400).json({ message: 'Usuário não autenticado' });
        }
        const surveys = await Survey.find({ relations: ['item_survey'] });
        return res.status(200).json(surveys);
    }

    static async show(req: Request, res: Response) {
        const { id } = req.params;
        const { id_user } = req.headers;

        if (!id_user) {
            return res.status(400).json({ message: 'Usuário não autenticado' });
        }

        if (!id || isNaN(Number(id))) {
            return res.status(400).json({ message: 'ID é obrigatório' });
        }
        const survey = await Survey.findOne({ where: { id_survey: Number(id) }, relations: ['item_survey'] })

        if (!survey) {
            return res.status(404).json({ erro: 'Vistoria não encontrada' });
        }
        return res.json(survey);
    }


    static async delete(req: Request, res: Response) {

        const { id } = req.params // const id = req.params.id 
        const { id_user } = req.headers;

        if (!id_user) {
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
            return res.status(400).json({ erro: 'Não é possível excluir uma vistoria com itens de vistoria' })
        }

        await Survey.remove(survey)
        return res.status(204).json({ message: 'Vistoria removida com sucesso' })
    }

    static async update(req: Request, res: Response) {
        const { id } = req.params
        const { description, date_start, date_end, id_equipment } = req.body
        const { id_user } = req.headers

        if (!id_user) {
            return res.status(400).json({ message: 'Usuário não autenticado' })
        }

        if (!description || !date_start || !date_end) {
            return res.status(400).json({ message: 'Campos (descrição , data de inicio e término) são obrigatórios' })
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
        survey.equipment = id_equipment
        survey.id_user = Number(id_user)

        await survey.save()
        return res.status(200).json(survey)



    }


}



