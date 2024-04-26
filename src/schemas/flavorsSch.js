const { z } = require('zod');

const schFlavor = z.object({
    type: z.string(),
    flavor: z.string(),
    quantity: z.number(),
});

module.exports = schFlavor;