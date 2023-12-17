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

### First of all, please give the repository a star ⭐️

1. You must have installed the PostgreSQL database in your machine

2. Clone this repository:

```bash
git clone https://github.com/tiago1820/pokemon-pi.git
```

3. In the api directory you must create a file called: .env that has the following form:
```bash
    DB_USER=postgresuser        
    DB_PASSWORD=userpassword
    DB_HOST=localhost
```

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

## Project Structure

The project follows a specific structure to organize its files and directories. Below is an overview of the main components:
```bash
.Backend
├── index.js
├── package.json
├── package-lock.json
├── src
│   ├── app.js
│   ├── controllers
│   │   └── pokemonController.js
│   ├── db.js
│   ├── models
│   │   ├── Pokemon.js
│   │   └── Type.js
│   ├── routes
│   │   └── index.js
│   └── services
│       ├── apiService.js
│       └── dataBaseService.js
└── tests
    ├── models
    │   └── pokemon.spec.js
    └── routes
        └── pokemon.spec.js

``` 
```
.Frontend
├── package.json
├── package-lock.json
├── public
│   ├── favicon.ico
│   ├── fonts
│   │   └── Oswald-Regular.ttf
│   ├── index.html
│   ├── manifest.json
│   └── robots.txt
└── src
    ├── app
    │   ├── components
    │   │   ├── Card
    │   │   │   ├── Card.jsx
    │   │   │   └── Card.module.css
    │   │   ├── Cards
    │   │   │   ├── Cards.jsx
    │   │   │   └── Cards.module.css
    │   │   ├── Create
    │   │   │   ├── components
    │   │   │   │   └── CreateForm
    │   │   │   │       ├── CreateForm.jsx
    │   │   │   │       └── CreateForm.module.css
    │   │   │   ├── Create.jsx
    │   │   │   ├── Create.module.css
    │   │   │   └── validator.js
    │   │   ├── Detail
    │   │   │   ├── Detail.jsx
    │   │   │   └── Detail.module.css
    │   │   ├── Edit
    │   │   │   ├── components
    │   │   │   │   └── EditForm
    │   │   │   │       ├── EditForm.jsx
    │   │   │   │       └── EditForm.module.css
    │   │   │   ├── Edit.jsx
    │   │   │   ├── Edit.module.css
    │   │   │   └── validator.js
    │   │   ├── FilterSelects
    │   │   │   ├── FilterSelects.jsx
    │   │   │   └── FilterSelects.module.css
    │   │   ├── index.js
    │   │   ├── Loader
    │   │   │   ├── Loader.jsx
    │   │   │   └── Loader.module.css
    │   │   ├── Nav
    │   │   │   ├── Nav.jsx
    │   │   │   └── Nav.module.css
    │   │   ├── Pagination
    │   │   │   ├── Pagination.jsx
    │   │   │   └── Pagination.module.css
    │   │   ├── Routes
    │   │   │   ├── AppRoutes.jsx
    │   │   │   └── AppRoutes.module.css
    │   │   ├── SearchBar
    │   │   │   ├── SearchBar.jsx
    │   │   │   └── SearchBar.module.css
    │   │   └── tests
    │   │       └── SearchBar.test.js
    │   ├── hooks
    │   │   └── usePokemon.js
    │   └── redux
    │       ├── actions.js
    │       ├── action-types.js
    │       ├── reducer.js
    │       └── store.js
    ├── App.jsx
    ├── App.module.css
    ├── App.test.js
    ├── images
    │   ├── default-img.png
    │   ├── github-images
    │   │   ├── 01.png
    │   │   ├── 02.png
    │   │   └── 03.png
    │   ├── icons
    │   │   ├── delete.png
    │   │   ├── edit.png
    │   │   ├── garbageIcon.png
    │   │   ├── home.png
    │   │   ├── previous.png
    │   │   └── searchIcon.png
    │   ├── landing-page
    │   │   ├── feature1.png
    │   │   ├── feature2.png
    │   │   ├── feature3.png
    │   │   └── pokemon3.jpg
    │   ├── pokeball.gif
    │   └── pokemon-logo.png
    ├── index.css
    ├── index.js
    ├── Landing
    │   ├── components
    │   │   ├── Banner
    │   │   │   ├── Banner.jsx
    │   │   │   └── Banner.module.css
    │   │   ├── Feature
    │   │   │   ├── Feature.jsx
    │   │   │   └── Feature.module.css
    │   │   ├── Footer
    │   │   │   ├── Footer.jsx
    │   │   │   └── Footer.module.css
    │   │   ├── index.js
    │   │   └── Menu
    │   │       ├── Menu.jsx
    │   │       └── Menu.module.css
    │   ├── Landing.jsx
    │   └── Landing.module.css
    ├── reportWebVitals.js
    ├── services
    │   └── index.js
    ├── setupTests.js
    └── utils
        └── index.js

```

## License

This project is licensed under the GNU GENERAL PUBLIC LICENSE - see the [LICENSE](/LICENSE) file for details. 

 If you find this project helpful or interesting, please give it a ⭐️.