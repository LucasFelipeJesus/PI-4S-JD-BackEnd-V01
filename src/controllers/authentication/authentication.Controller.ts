import { Request, Response } from 'express';
import User from '../../models/user.entity';
import bycrypt from 'bcrypt';
import Token from '../../models/token.entity';



export default class AuthenticationController {
    static async store(req: Request, res: Response) {
        const { name, email, password } = req.body;

        if (!name || !email || !password) {
            return res.status(400).json({ message: 'Campos (nome email e senha) são obrigatórios' });
        }
        const userExists = await User.findOneBy({ email })
        if (userExists) {
            return res.status(400).json({ message: 'Usuário já cadastrado com esse e-mail' })
        }
        const user = new User()
        user.name = name
        user.email = email
        user.password = bycrypt.hashSync(password, 10)

        await user.save()
        return res.status(201).json({
            id: user.iduser,
            name: user.name,
            email: user.email
        });
    }

    static async login(req: Request, res: Response) {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({ message: 'Campos (e-mail e senha) são obrigatórios' });
        }
        const user = await User.findOneBy({ email });
        if (!user) {
            return res.status(404).json({ error: 'Usuário não encontrado' });
        }
        const passwordMatch = bycrypt.compareSync(password, user.password);

        if (!passwordMatch) {
            return res.status(401).json({ message: 'Senha inválida' });
        }

        await Token.delete(
            {
                user: { iduser: user.iduser }
            }
        )

        const token = new Token()

        token.token = bycrypt.hashSync(Math.random().toString(36), 1).slice(-20)
        token.expire_date = new Date(Date.now() + 60 * 60 * 1000)
        token.refreshToken = bycrypt.hashSync(Math.random().toString(36), 1).slice(-20)

        token.user = user
        await token.save()
        res.cookie('token', token.token, { httpOnly: true, secure: true, sameSite: 'none' })
        return res.json({
            token: token.token,
            expire_date: token.expire_date,
            refresh_token: token.refreshToken,
        })

    }



    static async refresh(req: Request, res: Response) {
        const { authorization } = req.cookies;
        if (!authorization) {
            return res.status(401).json({ error: 'Token não informado' });
        }
        const token = await Token.findOneBy({ refreshToken: authorization });
        if (!token) {
            return res.status(401).json({ error: 'Token inválido' });
        }

        if (token.expire_date < new Date()) {
            await token.remove();
            return res.status(401).json({ error: 'Token expirado' });
        }

        token.token = bycrypt.hashSync(Math.random().toString(36), 1).slice(-20)
        token.refreshToken = bycrypt.hashSync(Math.random().toString(36), 1).slice(-20)
        token.expire_date = new Date(Date.now() + 60 * 60 * 1000)
        await token.save()

        res.cookie('token', token.token, { httpOnly: true, secure: true, sameSite: 'none' })
        return res.json({
            token: token.token,
            expire_date: token.expire_date,
            refresh_token: token.refreshToken,
        })
    }

    static async logout(req: Request, res: Response) {
        const { authorization } = req.cookies;
        if (!authorization) {
            return res.status(401).json({ error: 'Token não informado' });
        }
        const userToken = await Token.findOneBy({ token: authorization });
        if (!userToken) {
            return res.status(401).json({ error: 'Token inválido' });
        }
        await userToken.remove();

        res.clearCookie('token');
        return res.status(204).json();
    }

    static async index(req: Request, res: Response) {
        const { authorization } = req.headers;

        if (!authorization) {
            return res.status(400).json({ error: 'Usuário não autenticado!' });
        }

        const users = await User.find({ relations: ['survey', 'survey.item_survey', 'survey.equipment', 'survey.equipment.checklist', 'survey.equipment.checklist.item_checklist'] });
        return res.status(200).json(users);
    }

    static async show(req: Request, res: Response) {
        const { id } = req.params;
        const { authorization } = req.headers;
        if (!authorization) {
            return res.status(400).json({ message: 'Usuário não autenticado!' });
        }

        if (!id || isNaN(Number(id))) {
            return res.status(400).json({ message: 'ID é obrigatório' });
        }
        const user = await User.findOneBy({ iduser: Number(id) });
        if (!user) {
            return res.status(404).json({ erro: 'Usuário não encontrado' });
        }
        return res.json(user);
    }

    static async delete(req: Request, res: Response) {
        const { id } = req.params;
        const { authorization } = req.headers;
        if (!authorization) {
            return res.status(400).json({ message: 'Usuário não autenticado!' });
        }

        if (!id || isNaN(Number(id))) {
            return res.status(400).json({ error: 'O id é obrigatório!' });
        }

        const user = await User.findOne({ where: { iduser: Number(id) }, relations: ['survey'] });

        if (!user) {
            return res.status(404).json({ error: 'Não encontrado' });
        }

        if (user.survey) {
            return res.status(400).json({ error: 'Usuário não pode ser removido, pois está vinculado a uma vistoria' });
        }


        await User.remove(user)
        return res.status(204).json({ message: 'Usuário removido com sucesso' })
    }

    static async update(req: Request, res: Response) {
        const { id } = req.params
        const { name, email, password } = req.body
        const { authorization } = req.headers;
        if (!authorization) {
            return res.status(400).json({ message: 'Usuário não autenticado!' });
        }
        if (!name || !email || !password) {
            return res.status(400).json({ message: 'Campos (nome email e senha) são obrigatórios' });
        }

        if (!id || isNaN(Number(id))) {
            return res.status(400).json({ error: 'O id é obrigatório!' });
        }
        const user = await User.findOneBy({ iduser: Number(id) });

        if (!user) {
            return res.status(404).json({ error: 'Não encontrado' });
        }
        user.name = name
        user.email = email
        user.password = bycrypt.hashSync(password, 10)

        await user.save()
        return res.status(204).json()
    }
}
