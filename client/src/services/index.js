import axios from 'axios';

const IP = process.env.REACT_APP_IP;

export class Services {

    onSearch =  async (name, pokemons, setPokemons) => {
        try {
            const { data } = await axios(`${IP}:3001/pokemons/name?name=${name}`);
            if (data.name) {
                const isDuplicate = pokemons.some(pokemon => pokemon.name === data.name);
                if (isDuplicate) {
                    window.alert('¡No puedes buscar Pokémon repetido!');
                } else {
                    setPokemons(oldPokemons => [...oldPokemons, data]);
                }

            }
        } catch (error) {
            window.alert('¡No hay pokemons con este nombre!');
        }
    }

    async createPokemon(pokeData) {
        try {
            const {
                name,
                hp,
                attack,
                defense,
                speed,
                weight,
                height,
                types,
            } = pokeData;

            const URL = `${IP}:3001/pokemons`;

            const response = await axios.post(URL, {
                name,
                hp,
                attack,
                defense,
                speed,
                weight,
                height,
                types,
            });

        } catch (error) {
            console.error('Error al crear el Pokémon:', error);
            throw error;
        }
    }

    async editPokemon(pokeData) {
        console.log("APP", pokeData);

        try {
            const {
                id,
                name,
                hp,
                attack,
                defense,
                speed,
                weight,
                height,
                types,
            } = pokeData;

            const URL = `${IP}:3001/pokemons/${id}`;
            console.log("URL", URL);

            const response = await axios.put(URL, {
                name,
                hp,
                attack,
                defense,
                speed,
                weight,
                height,
                types,
            });

            console.log('Pokemon editado:', response.data);
        } catch (error) {
            console.error('Error al editar el Pokémon:', error);
            throw error;
        }
    }
}