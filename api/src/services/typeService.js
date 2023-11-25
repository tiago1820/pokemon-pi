const axios = require('axios');
const { Type } = require('../db.js');

class TypeService {
    constructor(URL) {
        this.URL = URL;
    }

    getAllTypes = async () => {
        try {
            const response = await axios(this.URL);
            const typesFromApi = response.data.results;

            const typePromises = typesFromApi.map(async (apiType) => {
                const [type, created] = await Type.findOrCreate({
                    where: { name: apiType.name },
                    defaults: { name: apiType.name },
                });

                return type;
            });

            const types = await Promise.all(typePromises);

            return types;

        } catch (error) {
            console.log('Error en getAllPokemons:', error);
            throw error;
        }
    }
}

module.exports = TypeService;