const TypeService = require('../services/typeService.js');

class TypeController {
    constructor() {
        this.typeService = new TypeService('https://pokeapi.co/api/v2/type');
    }

    loadTypesTable = async (req, res) => {
        try {
            const types = await this.typeService.getAllTypes();
            return res.json(types);
        } catch (error) {
            return res.status(500).send(error.message);
        }
    }
}

module.exports = TypeController;