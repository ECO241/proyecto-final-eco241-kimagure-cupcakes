const users = [];

function addUser(username, email) {
    const id = users.length + 1;

    const newUser = {
        id,
        username,
        email,
    };

    users.push(newUser);

    return newUser;
}

function getAllUsers() {
    return users;
}

function findUserByUsername(username) {
    return users.find((user) => user.username === username);
}

module.exports = {
    addUser,
    getAllUsers,
    findUserByUsername,
};
