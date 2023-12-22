import { Routes, Route } from 'react-router-dom';
import { Cards, Detail, Create, Edit, Landing } from '../../components';

export const AppRoutes = ({
    currentPokemons,
    pokemons,
    onClose,
    isHomeRoute,
    currentPage,
    totalPages,
    onPageChange

}) => {
    return (
        <Routes>
            <Route path='/app' element={
                <Cards
                    allPokemons={currentPokemons}
                    pokemons={pokemons}
                    onClose={onClose}
                    isHomeRoute={isHomeRoute}
                    currentPage={currentPage}
                    totalPages={totalPages}
                    onPageChange={onPageChange}

                />} />
            <Route path='/' element={<Landing />} />
            <Route path='/app/detail/:id' element={<Detail />} />
            <Route path='/app/create' element={<Create />} />
            <Route path='/app/edit/:id' element={<Edit />} />
        </Routes>
    );
};

