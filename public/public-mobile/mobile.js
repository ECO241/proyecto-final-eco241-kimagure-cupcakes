<<<<<<< HEAD

=======
>>>>>>> 4474310 (QR)
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
<<<<<<< HEAD
    return users.find(user => user.username === username);
=======
    return users.find((user) => user.username === username);
>>>>>>> 4474310 (QR)
}

module.exports = {
    addUser,
    getAllUsers,
<<<<<<< HEAD
    findUserByUsername
};
=======
    findUserByUsername,
};
>>>>>>> 4474310 (QR)
