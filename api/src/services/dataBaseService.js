const { Pokemon, Type } = require('../db');

class DataBaseService {

    insertTypesInDB = async (allTypes) => {
        try {
            const typePromises = allTypes.map(async (apiType) => {
                const [type] = await Type.findOrCreate({
                    where: { name: apiType.name },
                    defaults: { name: apiType.name },
                });

                return type;
            });

            const types = await Promise.all(typePromises);

            return types;

        } catch (error) {
            throw error;
        }
    }

    getAllTypes = async () => {
        try {
            const allTypes = await Type.findAll();
            return allTypes;
        } catch (error) {
            throw error;
        }
    }

    postPokemon = async (req) => {
        try {
            const {
                name,
                types,
                hp,
                attack,
                defense,
                speed,
                height,
                weight,
                img,
                created
            } = req.body;

            const lowercaseName = name.toLowerCase();

            const newPokemon = await Pokemon.create({
                name: lowercaseName,
                types,
                image: img,
                hp,
                attack,
                defense,
                speed,
                height,
                weight,
                created,
            });

            return newPokemon;

        } catch (error) {
            throw error;
        }
    }

    postType = async (req, newPokemon) => {
        try {
            const { types } = req.body;

            const typeInstances = [];
            for (const typeName of types) {
                const [type, created] = await Type.findOrCreate({
                    where: { name: typeName },
                    defaults: { name: typeName },
                });
                typeInstances.push(type);
            }

            await newPokemon.setTypes(typeInstances);
            return newPokemon;
        } catch (error) {
            throw error;
        }
    }

    updatePokemon = async (req) => {
        try {
            const { id } = req.params;

            const { name, types, hp, attack, defense, speed, height, weight, img } = req.body;
            const lowercaseName = name.toLowerCase();

            const pokemon = await Pokemon.findByPk(id);

            if (!pokemon) {
                return res.status(404).send('Pokemon not found.');
            }

            pokemon.name = lowercaseName;
            pokemon.types = types;
            pokemon.image = img;
            pokemon.hp = hp;
            pokemon.attack = attack;
            pokemon.defense = defense;
            pokemon.speed = speed;
            pokemon.height = height;
            pokemon.weight = weight;

            await pokemon.save();

        } catch (error) {
            throw error
        }
    }

    updateTypes = async (req) => {
        const t = await Type.sequelize.transaction();
        const { id } = req.params;
        const { types } = req.body;
        const pokemon = await Pokemon.findByPk(id);

        try {
            await pokemon.setTypes([], { transaction: t });
            if (!pokemon) {
                return res.status(404).send('Pokemon not found.');
            }

            const typeInstances = [];
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

    deletePokemonById = async (id) => {
        try {
            const deletedRows = await Pokemon.destroy({
                where: {
                    id: id
                }
            });

            return deletedRows > 0;
        } catch (error) {
            throw error;
        }
    }

    getPokemonById = async (id) => {
        try {
            const pokemonFromDB = await Pokemon.findByPk(id, {
                include: [{ model: Type, through: 'pokemon_type' }],
            });

            if (pokemonFromDB) {
                const pokemonInfo = this.formatPokemonInfo(pokemonFromDB);
                return pokemonInfo;
            }
        } catch (error) {
            throw error;
        }
    }

    getAllPokemons = async () => {
        try {
            const pokemonDB = await Pokemon.findAll({
                include: [{ model: Type, through: 'pokemon_type' }],
            });

            const formattedData = pokemonDB.map(pokemon => ({
                id: pokemon.id,
                name: pokemon.name,
                types: pokemon.types ? pokemon.types.map(typeArr => typeArr.name) : [],
                img: pokemon.img,
                hp: pokemon.hp,
                attack: pokemon.attack,
                defense: pokemon.defense,
                speed: pokemon.speed,
                weight: pokemon.weight,
                height: pokemon.height,
                created: pokemon.created
            }));

            return formattedData;
        } catch (error) {
            throw error;
        }
    }

    getPokemonByName = async (name) => {
        try {
            const pokemonFromDB = await Pokemon.findOne({
                where: { name: name },
                include: [{ model: Type, through: 'pokemon_type' }],
            });

            if (pokemonFromDB) {
                const pokemonInfo = this.formatPokemonInfo(pokemonFromDB);
                return pokemonInfo;
            }


        } catch (error) {
            throw error;
        }

    }

    formatPokemonInfo = (pokemon) => {
        return {
            id: pokemon.id,
            name: pokemon.name,
            types: pokemon.types ? pokemon.types.map(typeArr => typeArr.name) : [],
            img: pokemon.img,
            hp: pokemon.hp,
            attack: pokemon.attack,
            defense: pokemon.defense,
            speed: pokemon.speed,
            weight: pokemon.weight,
            height: pokemon.height,
            created: pokemon.created,
        };
    }

}

module.exports = DataBaseService;