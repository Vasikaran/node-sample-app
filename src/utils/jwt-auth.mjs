import jsonwebtoken from 'jsonwebtoken';
import dotenv from 'dotenv';

const config = dotenv.config();
const privateKey = config.parsed.JWT_PRIVATE_KEY;

const expireDuration = Math.floor(Date.now() / 1000) + 60 * 60;

export function JWTAuthMiddleware(req, res, next) {
    const { authorization } = req.headers;

    if (!authorization) {
        return res.sendStatus(401);
    }

    const [, token] = authorization.split(' ');

    if (!token) {
        return res.sendStatus(401);
    }

    jsonwebtoken.verify(token, privateKey, function (err, decodedValue) {
        if (!err) {
            req.currentUser = decodedValue;
            return next();
        }
        console.error(err);
        if (err.name === 'TokenExpiredError') {
            return res.status(400).send('Access Token Expired');
        }else{
            return res.status(400).send('Something went wrong!');
        }
    });
}

export const createJWTToken = (data) => {
    const token = jsonwebtoken.sign(
        {
            data,
            exp: expireDuration
        },
        privateKey
    );

    return token;
};
