import { Router } from 'express';
import { getUser, updateUser } from '../../utils/users.mjs';

export const UserRoute = Router();

UserRoute.get('/:userId', (req, res) => {
    const { userId } = req.params;
    const currentUserId = req.currentUser?.data.userName;

    if (currentUserId !== userId){
        res.status(400).send('Access token and user info is mismatching');
        return; 
    }
    
    const user = getUser(userId);
    if (!user) {
        res.sendStatus(404);
        return;
    }
    const {
        email,
        userName,
        firstName = null,
        lastName = null,
        planet = null,
        designation = null
    } = user;
    res.json({ email, userName, firstName, lastName, planet, designation });
});

UserRoute.put('/:userId', (req, res) => {
    const { userId } = req.params;
    const currentUserId = req.currentUser?.data.userName;
    const user = getUser(userId);

    if (currentUserId !== userId){
        res.status(400).send('Access token and user info is mismatching');
        return; 
    }

    if (!user) {
        res.sendStatus(404);
        return;
    }

    const { firstName, lastName, planet, designation } = req.body;

    const updatedUser = {
        ...user,
        ...{ firstName, lastName, planet, designation }
    };

    const { email, userName } = updatedUser;
    
    updateUser(userName, updatedUser);

    res.json({ email, userName, firstName, lastName, planet, designation });
});
