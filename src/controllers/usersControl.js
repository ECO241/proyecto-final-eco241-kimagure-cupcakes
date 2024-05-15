const usersService = require('../services/usersService');

const usersController = {
    registerUser: async (req, res) => {
        try {
            const userData = req.body;
            const newUser = await usersService.createUser(userData);
            
            if (newUser) {
                res.json(newUser);
            } else {
                res.status(500).send("Error al crear el usuario en Supabase");
            }
        } catch (error) {
            console.error("Error registrando usuario en Supabase:", error.message);
            res.status(500).send(error.message);
        }
    }
};

module.exports = usersController;


