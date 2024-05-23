import Checklist from "../../models/checklist.entity";



export default class ChecklistController {
    static async create(req: any, res: any) {
        const { description, id_equipment } = req.body;

        if (!description || !id_equipment) {
            return res.status(400).json({ message: 'Campos (descrição e id do item do checklist) obrigatórios' });
        }
        const checklist = new Checklist()
        checklist.description = description
        checklist.equipment = id_equipment


        await checklist.save()
        return res.status(201).json(checklist);
    }

    static async index(req: any, res: any) {
        const checklists = await Checklist.find({ relations: ['item_checklist'] });
        return res.status(200).json(checklists);
    }

    static async show(req: any, res: any) {
        const { id } = req.params;

        if (!id || isNaN(Number(id))) {
            return res.status(400).json({ message: 'ID é obrigatório' });
        }
        if (!id) {
            return res.status(404).json({ erro: 'Checklist não encontrado' });
        }

        const checklist = await Checklist.findOneBy({ id_checklist: Number(id) })
        if (!checklist) {
            return res.status(404).json({ erro: 'Checklist não encontrado' });
        }
        return res.json(checklist);

    }

    static async delete(req: any, res: any) {
        const { id } = req.params // const id = req.params.id  

        if (!id || isNaN(Number(id))) {
            return res.status(400).json({ error: 'O id é obrigatório!' })
        }
        const checklist = await Checklist.findOneBy({ id_checklist: Number(id) })

        if (!checklist) {
            return res.status(404).json({ erro: 'Não encontrado' })
        }
        checklist.remove()
        return res.status(204).json()

    }
    static async update(req: any, res: any) {
        const { id } = req.params
        const { description, id_item_checklist } = req.body

        if (!description) {
            return res.status(400).json({ message: 'Campos obrigatórios' });
        }

        if (!id || isNaN(Number(id))) {
            return res.status(400).json({ error: 'O id é obrigatório!' })
        }
        const checklist = await Checklist.findOneBy({ id_checklist: Number(id) })

        if (!checklist) {
            return res.status(404).json({ erro: 'Não encontrado' })
        }

        checklist.description = description ?? checklist.description
        checklist.item_checklist = id_item_checklist ?? checklist.item_checklist


        await checklist.save()
        return res.json(checklist)
    }

}