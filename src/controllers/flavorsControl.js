const flavorsService = require('../services/flavorsService');
<<<<<<< HEAD
=======
const flavorsSchema = require('../schemas/flavorsSch');
>>>>>>> 4474310 (QR)

const flavorsController = {
    getAllFlavors: async (req, res) => {
        try {
            const flavors = await flavorsService.getAllFlavors();
            res.json(flavors);
        } catch (error) {
<<<<<<< HEAD
            console.error("Error retrieving flavors from Supabase:", error.message);
            res.status(500).send(error.message);
=======
            console.error('Error retrieving flavors from Supabase:', error);
            res.status(500).send(error);
>>>>>>> 4474310 (QR)
        }
    },

    getFlavorById: async (req, res) => {
        try {
<<<<<<< HEAD
            const id = req.params.id;
            const flavor = await flavorsService.getFlavorById(id);
            res.json(flavor);
        } catch (error) {
            console.error("Error retrieving flavor from Supabase:", error.message);
            res.status(500).send(error.message);
=======
            const { id } = req.params;
            const flavor = await flavorsService.getFlavorById(id);
            res.json(flavor);
        } catch (error) {
            console.error('Error retrieving flavor from Supabase:', error);
            res.status(500).send(error);
>>>>>>> 4474310 (QR)
        }
    },

    createFlavor: async (req, res) => {
        try {
<<<<<<< HEAD
            const flavor = req.body;
            await flavorsService.createFlavor(flavor);
            res.send("Flavor created successfully");
        } catch (error) {
            console.error("Error creating flavor in Supabase:", error.message);
            res.status(500).send(error.message);
=======
            const flavor = flavorsSchema.parse(req.body);
            await flavorsService.createFlavor(flavor);
            res.send('Flavor created successfully');
        } catch (error) {
            console.error('Error creating flavor in Supabase:', error);
            res.status(500).send(error);
>>>>>>> 4474310 (QR)
        }
    },

    updateFlavor: async (req, res) => {
        try {
<<<<<<< HEAD
            const id = req.params.id;
            const flavor = req.body;
            await flavorsService.updateFlavor(id, flavor);
            res.send("Flavor updated successfully");
        } catch (error) {
            console.error("Error updating flavor in Supabase:", error.message);
            res.status(500).send(error.message);
=======
            const { id } = req.params;
            const flavor = flavorsSchema.parse(req.body);
            await flavorsService.updateFlavor(id, flavor);
            res.send('Flavor updated successfully');
        } catch (error) {
            console.error('Error updating flavor in Supabase:', error);
            res.status(500).send(error);
>>>>>>> 4474310 (QR)
        }
    },

    deleteFlavor: async (req, res) => {
        try {
<<<<<<< HEAD
            const id = req.params.id;
            await flavorsService.deleteFlavor(id);
            res.send("Flavor deleted successfully");
        } catch (error) {
            console.error("Error deleting flavor in Supabase:", error.message);
            res.status(500).send(error.message);
        }
    }
};

module.exports = flavorsController;
=======
            const { id } = req.params;
            await flavorsService.deleteFlavor(id);
            res.send('Flavor deleted successfully');
        } catch (error) {
            console.error('Error deleting flavor in Supabase:', error);
            res.status(500).send(error);
        }
    },
};

module.exports = flavorsController;
>>>>>>> 4474310 (QR)
