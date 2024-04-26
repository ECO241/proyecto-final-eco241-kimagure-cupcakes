const flavorsService = require('../services/flavorsService');
const flavorsSchema = require('../schemas/flavorsSch');

const flavorsController = {
    getAllFlavors: async (req, res) => {
        try {
            const flavors = await flavorsService.getAllFlavors();
            res.json(flavors);
        } catch (error) {
            console.error("Error retrieving flavors from Supabase:", error);
            res.status(500).send(error);
        }
    },

    getFlavorById: async (req, res) => {
        try {
            const id = req.params.id;
            const flavor = await flavorsService.getFlavorById(id);
            res.json(flavor);
        } catch (error) {
            console.error("Error retrieving flavor from Supabase:", error);
            res.status(500).send(error);
        }
    },

    createFlavor: async (req, res) => {
        try {
            const flavor = flavorsSchema.parse(req.body);
            await flavorsService.createFlavor(flavor);
            res.send("Flavor created successfully");
        } catch (error) {
            console.error("Error creating flavor in Supabase:", error);
            res.status(500).send(error);
        }
    },

    updateFlavor: async (req, res) => {
        try {
            const id = req.params.id;
            const flavor = flavorsSchema.parse(req.body);
            await flavorsService.updateFlavor(id, flavor);
            res.send("Flavor updated successfully");
        } catch (error) {
            console.error("Error updating flavor in Supabase:", error);
            res.status(500).send(error);
        }
    },

    deleteFlavor: async (req, res) => {
        try {
            const id = req.params.id;
            await flavorsService.deleteFlavor(id);
            res.send("Flavor deleted successfully");
        } catch (error) {
            console.error("Error deleting flavor in Supabase:", error);
            res.status(500).send(error);
        }
    }
};

module.exports = flavorsController;