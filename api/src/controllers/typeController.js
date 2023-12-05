const TypeService = require('../services/typeService.js');
const { Type } = require('../db.js');

class TypeController {
    constructor() {
        this.typeService = new TypeService('https://pokeapi.co/api/v2/type');
    }

    updatePokemonTypes = async (pokemon, types) => {
        const typeInstances = [];
        const t = await Type.sequelize.transaction();

        try {
            for (const typeName of types) {
                const [type, created] = await Type.findOrCreate({
                    where: { name: typeName },
                    defaults: { name: typeName },
                    transaction: t,
                });
                typeInstances.push(type);
            }

            await pokemon.setTypes(typeInstances, { transaction: t });
            await t.commit();
        } catch (error) {
            await t.rollback();
            throw error;
        }
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