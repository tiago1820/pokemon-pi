# Pokémon web application

The Pokémon web application is complete and fully functional. Developed using NodeJS, Express, React, and Redux, the platform seamlessly integrates with the PokeAPI and a PostgreSQL database using Sequelize. Users can search, view, and filter Pokémon information, as well as create new Pokémon through an interactive form. The frontend provides an intuitive experience with home pages, detailed views, and a creation form. Advanced features, such as filtering and sorting, were implemented without relying on predefined API endpoints. Comprehensive testing was conducted to ensure the system's quality, covering frontend components, backend routes, and database models. These features and tests ensure a complete and robust Pokémon application for users.

## Table of Contents

- [Features](#features)
- [Demo](#demo)
- [Installation](#installation)
- [License](#license)

## Features

- Search pokemons.
- View pokemon information.
- Filter pokemons.
- Sort pokemons.
- Create new pokemon.

## Demo

![image](https://github.com/tiago1820/pokemon-pi/blob/main/client/src/images/github-images/01.png)
![image](https://github.com/tiago1820/pokemon-pi/blob/main/client/src/images/github-images/02.png)
![image](https://github.com/tiago1820/pokemon-pi/blob/main/client/src/images/github-images/03.png)



## Installation

To run this project locally, follow these steps:

1. Clona este repositorio:

```bash
git clone https://github.com/tiago1820/pokemon-pi.git
```

2. In the api directory you must create a file called: .env that has the following form:
    DB_USER=postgresuser
    DB_PASSWORD=userpassword
    DB_HOST=localhost

3. Replace "postgresuser" and "userpassword" with your own credentials.

4. You will need to create, from psql (shell or PGAdmin), a database called pokemon.

5. Open the "api" directory in the terminal and run:
```bash
npm install
npm run dev
```
6. In another terminal open the "client" directory and run:
```bash
npm install
npm run dev
```



















