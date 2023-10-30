const users = {};

export const insertUser = (id, user) => {
    users[id] = user;
};

export const updateUser = (id, user) => {
    users[id] = user;
};

export const getUser = (id) => {
    return users[id] || null;
};
