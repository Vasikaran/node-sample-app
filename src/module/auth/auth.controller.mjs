import { Router } from 'express';
import bcrypt from 'bcrypt';
import { getUser, insertUser } from '../../utils/users.mjs';
import crypto from 'node:crypto';
import dotenv from 'dotenv';

import { createJWTToken } from '../../utils/jwt-auth.mjs';

const config = dotenv.config();
const userIdSecret = config.parsed.USER_ID_SECRET;


export const AuthRoute = Router();

AuthRoute.post('/createUser', async (req, res) => {
    const { userName, password, email } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);

    let userId = crypto
        .createHash('md5', userIdSecret)
        .update(userName)
        .digest('hex');

    insertUser(userName, { userName, password: hashedPassword, email, userId });

    res.sendStatus(200);
});

AuthRoute.post('/', async (req, res) => {
    const { userName, password } = req.body;
    const user = getUser(userName);

    if (!user) {
        res.sendStatus(404);
        return;
    }

    const { password: hashedPassword } = user;

    const isPasswordMatched = await bcrypt.compare(password, hashedPassword);

    if (isPasswordMatched) {
        const token = createJWTToken({
            userName,
            userId: user.userId,
            email: user.email
        });
        res.send(token);
        return;
    }

    res.sendStatus(401);
});
