import { Request, Response, NextFunction } from "express";
import Token from "../models/token.entity";
import User from "../models/user.entity";

export default async function authenticationMiddleware(req: Request, res: Response, next: NextFunction) {

    const { token } = req.cookies;
    if (!token) {
        return res.status(401).json({ error: 'Token não informado' });
    }
    const userToken = await Token.findOneBy({ token });
    if (!userToken) {
        return res.status(401).json({ error: 'Token inválido' });
    }

    if (userToken.expire_date < new Date()) {
        await userToken.remove();
        return res.status(401).json({ error: 'Token expirado' });
    }

    req.headers.iduser = userToken.user.iduser.toString();

    next();
}