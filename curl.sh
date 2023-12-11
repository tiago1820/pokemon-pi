# Para buscar todos los pokemons
curl "http://localhost:3001/pokemons"

# Para buscar un pokemon por id
curl http://localhost:3001/pokemons/1

# Para eliminar un pokemon por id
curl -X DELETE http://localhost:3000/pokemons/1

# Para buscar un pokemon por UUID
curl http://localhost:3001/pokemons/94d0bc53-5ea6-4f0b-9268-3db7532158a4

# Para cargar la tabla types:
curl http://localhost:3001/types/load

#Para buscar todos los types en la base de datos:
 curl http://localhost:3001/types

# Para buscar un pokemon por name:
curl 'http://localhost:3001/pokemons/name?name=pikachu'

# Para crear un pokemon:
curl -X POST -H "Content-Type: application/json" -d '{
  "name": "Tomy",
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

# Para editar un pokemon:
curl -X PUT -H "Content-Type: application/json" -d '{
  "name": "Charizard",
  "types": ["Fire", "Flying"],
  "hp": 78,
  "attack": 84,
  "defense": 78,
  "speed": 100,
  "height": 50,
  "weight": 90,
  "img": "https://example.com/charizard.png",
  "created": true
}' http://localhost:3001/pokemons/f0402aad-415f-4bff-a225-98d39583bfb9


