# Para buscar todos los pokemons
curl "http://localhost:3001/pokemons"

# Para buscar un pokemon por id
curl http://localhost:3000/pokemons/1

# Para buscar un pokemon por name:
curl http://localhost:3001/pokemons/pikachu

# Para crear un pokemon:
curl -X POST -H "Content-Type: application/json" -d '{
  "name": "Charizard",
  "types": ["Fire", "Flying"],
  "hp": 78,
  "attack": 84,
  "defense": 78,
  "speed": 100,
  "height": 17,
  "weight": 905,
  "img": "charizard_image_url",
  "created": true
}' http://localhost:3001/pokemons

