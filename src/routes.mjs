import { JWTAuthMiddleware } from './utils/jwt-auth.mjs';

import { UserModule } from "./module/user/index.mjs";
import {AuthModule} from './module/auth/index.mjs';

export default function(app){
    app.use('/auth', AuthModule);
    app.use('/user', JWTAuthMiddleware, UserModule);
    app.use('*', (req, res)=>{
        res.sendStatus(404);
    });
};