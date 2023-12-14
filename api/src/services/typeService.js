const axios = require('axios');
const { Type } = require('../db.js');

class TypeService {
    constructor(URL) {
        this.URL = URL;
    }

    // getAllTypesDB = async () => {
    //     try {
    //         const typesFromDB = await Type.findAll();
    //         return typesFromDB;
    //     } catch (error) {
    //         throw error;
    //     }
    // }

    // getAllTypes = async () => {
    //     try {
    //         const response = await axios(this.URL);
    //         const typesFromApi = response.data.results;

    //         const typePromises = typesFromApi.map(async (apiType) => {
    //             const [type, created] = await Type.findOrCreate({
    //                 where: { name: apiType.name },
    //                 defaults: { name: apiType.name },
    //             });

    //             return type;
    //         });

    //         const types = await Promise.all(typePromises);

    //         return types;

    //     } catch (error) {
    //         throw error;
    //     }
    // }
}

module.exports = TypeService;