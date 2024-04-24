const flavorsService = require('../services/flavorsService');

const flavorsController = {
    getAllFlavors: async (req, res) => {
        try {
            const flavors = await flavorsService.getAllFlavors();
            res.json(flavors);
        } catch (error) {
            console.error("Error retrieving flavors from Supabase:", error.message);
            res.status(500).send(error.message);
        }
    },

    getFlavorById: async (req, res) => {
        try {
            const id = req.params.id;
            const flavor = await flavorsService.getFlavorById(id);
            res.json(flavor);
        } catch (error) {
            console.error("Error retrieving flavor from Supabase:", error.message);
            res.status(500).send(error.message);
        }
    },

    createFlavor: async (req, res) => {
        try {
            const flavor = req.body;
            await flavorsService.createFlavor(flavor);
            res.send("Flavor created successfully");
        } catch (error) {
            console.error("Error creating flavor in Supabase:", error.message);
            res.status(500).send(error.message);
        }
    },

    updateFlavor: async (req, res) => {
        try {
            const id = req.params.id;
            const flavor = req.body;
            await flavorsService.updateFlavor(id, flavor);
            res.send("Flavor updated successfully");
        } catch (error) {
            console.error("Error updating flavor in Supabase:", error.message);
            res.status(500).send(error.message);
        }
    },

    deleteFlavor: async (req, res) => {
        try {
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