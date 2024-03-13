const jwt = require('jsonwebtoken');
import { Request, Response } from 'express';

module.exports = {
    tokenInfo: (req: Request, res: Response) => {
        try {
            let token = req.header('Authorization')
            if ( !token ) {
                console.error('Authorization error!')
                return res.status(401).send({ message: 'Token empty!'});
            }
            token = token.replace('Bearer ', '');
            const decoded = jwt.verify(token, process.env.SECRET);
            return decoded;
        } catch (err) {
            return res.status(403).json({ message: "Can not find the user's info from token." })
        }
    }
}