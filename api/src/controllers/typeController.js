const TypeService = require('../services/typeService.js');
const { Type } = require('../db.js');

class TypeController {
    constructor() {
        this.typeService = new TypeService('https://pokeapi.co/api/v2/type');
    }

    getAllTypesDB = async (req, res) => {
        try {
            const types = await this.typeService.getAllTypesDB();
            return res.json(types);
        } catch (error) {
            return res.status(500).send(error.message);
        }
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