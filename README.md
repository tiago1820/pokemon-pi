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
├── index.js                                # It starts the Express.js server
├── package.json                            # Contains metadata about the project and lists dependencies.
├── src
│   ├── app.js                              # It sets up the Express.js server.
│   ├── controllers
│   │   └── pokemonController.js            # Communicates with the models to retrieve or manipulate data.
│   ├── db.js                               # It establishes a connection to the database
│   ├── models
│   │   ├── Pokemon.js                      # Define the data models for Pokémon
│   │   └── Type.js                         # Define the data models for Types
│   ├── routes
│   │   └── index.js                        # Defines the routers.
│   └── services
│       ├── apiService.js                   # Contain services that interact with external APIs
│       └── dataBaseService.js              # Contain services that interact with the database.
└── tests
    ├── models
    │   └── pokemonModel.test.js            # Contain unit tests for the data models 
    └── routes
        └── pokemonRoutes.test.js           # Contain unit tests for the routes 


```

```bash

.Frontend
├── package.json                                      # Node.js project configuration
├── public                                            # Public directory for static files
│   ├── favicon.ico
│   ├── fonts                                         # project sources directory
│   │   └── Oswald-Regular.ttf                        # Oswald font
│   ├── index.html                                    # Main HTML file
│   ├── manifest.json                                 # Manifest.json file
│   └── robots.txt                                    # Robots file
└── src                                               # Source code directory
    ├── app                                           # Pokémon APP source code directory
    │   ├── components                                # React components
    │   │   ├── Card
    │   │   │   ├── Card.jsx                          # Card component
    │   │   │   └── Card.module.css                   # Styles for the Card component
    │   │   ├── Cards
    │   │   │   ├── Cards.jsx                         # Cards component
    │   │   │   └── Cards.module.css                  # Styles for the Cards component
    │   │   ├── Create
    │   │   │   ├── components
    │   │   │   │   └── CreateForm
    │   │   │   │       ├── CreateForm.jsx            # CreateForm component
    │   │   │   │       └── CreateForm.module.css     # Styles for the CreateForm component
    │   │   │   ├── Create.jsx                        # Create component
    │   │   │   └── Create.module.css                 # Styles for the Create component
    │   │   ├── Detail
    │   │   │   ├── Detail.jsx                        # Detail component
    │   │   │   └── Detail.module.css                 # Styles for the Detail component
    │   │   ├── Edit
    │   │   │   ├── components
    │   │   │   │   └── EditForm
    │   │   │   │       ├── EditForm.jsx              # EditForm component
    │   │   │   │       └── EditForm.module.css       # Styles for the EditForm component
    │   │   │   ├── Edit.jsx                          # Edit component
    │   │   │   └── Edit.module.css                   # Styles for the Edit component
    │   │   ├── FilterSelects
    │   │   │   ├── FilterSelects.jsx                 # FilterSelects component
    │   │   │   └── FilterSelects.module.css          # Styles for the FilterSelects component
    │   │   ├── index.js
    │   │   ├── Loader
    │   │   │   ├── Loader.jsx                        # Loader component
    │   │   │   └── Loader.module.css                 # Styles for the Loader component
    │   │   ├── Nav
    │   │   │   ├── Nav.jsx                           # Nav component
    │   │   │   └── Nav.module.css                    # Styles for the Nav component
    │   │   ├── Pagination
    │   │   │   ├── Pagination.jsx                    # Pagination component
    │   │   │   └── Pagination.module.css             # Styles for the Pagination component
    │   │   ├── Routes
    │   │   │   ├── AppRoutes.jsx                     # AppRoutes component
    │   │   │   └── AppRoutes.module.css              # Styles for the AppRoutes component
    │   │   ├── SearchBar
    │   │   │   ├── SearchBar.jsx                     # SearchBar component
    │   │   │   └── SearchBar.module.css              # Styles for the SearchBar component
    │   │   └── tests
    │   │       └── Nav.test.js                       # Nav component test file.
    │   ├── hooks
    │   │   ├── useApp.js                             # useApp hook
    │   │   ├── useCards.js                           # useCards hook
    │   │   ├── useCreate.js                          # useCreate hook
    │   │   ├── useDetail.js                          # useDetail hook
    │   │   ├── useEdit.js                            # useEdit hook
    │   │   ├── usePagination.js                      # usePagination hook
    │   │   ├── usePokemon.js                         # usePokemon hook
    │   │   └── useSearchBar.js                       # useSearchBar hook
    │   ├── redux
    │   │   ├── actions.js                            # Actions file
    │   │   ├── action-types.js                       # Actions types file
    │   │   ├── reducer.js                            # Reducers file
    │   │   └── store.js                              # Store file
    │   ├── services
    │   │   └── index.js                              # File with functions that make requests to the backend
    │   └── utils
    │       ├── index.js                              # It contains several functions that help the components.
    │       └── validator.util.js                     # Checks for errors in the data on the forms.
    ├── App.jsx                                       # Brings together all the components necessary to assemble the application
    ├── App.module.css                                # Root CSS
    ├── index.css                                     # Body CSS
    ├── index.js                                      # Main component
    ├── Landing                                       # Landing page directory
    │   ├── components                                # React components
    │   │   ├── Banner
    │   │   │   ├── Banner.jsx                        # Banner component
    │   │   │   └── Banner.module.css                 # Styles for the Banner component
    │   │   ├── Feature
    │   │   │   ├── Feature.jsx                       # Feature component
    │   │   │   └── Feature.module.css                # Styles for the Feature component
    │   │   ├── Footer
    │   │   │   ├── Footer.jsx                        # Footer component
    │   │   │   └── Footer.module.css                 # Styles for the Footer component
    │   │   ├── index.js
    │   │   └── Menu
    │   │       ├── Menu.jsx                          # Menu component
    │   │       └── Menu.module.css                   # Styles for the Menu component
    │   ├── Landing.jsx                               # Landing component
    │   └── Landing.module.css                        # Styles for the Landing component
    ├── reportWebVitals.js
    └── setupTests.js


```

## License

This project is licensed under the MIT LICENSE - see the [LICENSE](/LICENSE) file for details.

If you find this project helpful or interesting, please give it a ⭐️.
