import { useApp } from './app/hooks/useApp';
import { Nav, Loader, SearchBar, FilterSelects, AppRoutes } from "./app/components"
import styles from './App.module.css';

export const App = () => {
    const {
        selectedOrder,
        selectedType,
        selectedOrigin,
        currentPage,
        aux,
        location,
        alteredList,
        allTypes,
        loading,
        searchResult,
        isHomeRoute,
        handleOrder,
        handleFilter,
        handleOrigin,
        clearFilters,
        onClose,
        currentPokemons,
        handlePageChange,
        pokemonsPerPage
    } = useApp();

    return (
        <>
            {loading && <Loader />}
            {loading === false &&
                <div className={styles.appContainer}>
                    {location.pathname && location.pathname !== '/' && <Nav />}
                    {isHomeRoute && isHomeRoute !== '/app/create' && isHomeRoute !== '/app/detail' && (<SearchBar />)}
                    <div className={styles.row}>
                        {isHomeRoute && isHomeRoute !== '/app/create' && isHomeRoute !== '/app/detail' && (
                            <FilterSelects
                                clearFilters={clearFilters}
                                handleOrder={handleOrder}
                                handleFilter={handleFilter}
                                handleOrigin={handleOrigin}
                                selectedOrder={selectedOrder}
                                selectedType={selectedType}
                                selectedOrigin={selectedOrigin}
                                allTypes={allTypes}
                            />
                        )}

                        <AppRoutes
                            currentPokemons={currentPokemons}
                            pokemons={searchResult}
                            onClose={onClose}
                            isHomeRoute={isHomeRoute}
                            currentPage={currentPage}
                            totalPages={Math.ceil(alteredList.length / pokemonsPerPage)}
                            onPageChange={handlePageChange}
                        />
                    </div>
                </div>}
        </>
    );
}
