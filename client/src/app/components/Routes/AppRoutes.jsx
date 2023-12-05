import { Routes, Route } from 'react-router-dom';
import { Cards, Detail, Create, Edit } from '../../components';

export const AppRoutes = ({ currentPokemons, pokemons, onClose }) => {
    return (
        <Routes>
            <Route path='/app' element={<Cards allPokemons={currentPokemons} pokemons={pokemons} onClose={onClose} />} />
            <Route path='/app/detail/:id' element={<Detail />} />
            <Route path='/app/create' element={<Create />} />
            <Route path='/app/edit/:id' element={<Edit />} />
        </Routes>
    );
};

