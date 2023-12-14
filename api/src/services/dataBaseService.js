const { Pokemon, Type } = require('../db');

class DataBaseService {

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