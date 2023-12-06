import { useState } from 'react';
import styles from './SearchBar.module.css';

export const SearchBar = props => {
    const { handleSearch } = props;
    const [name, setName] = useState('');

    const handleChange = (e) => {
        setName(e.target.value);
    }

    const handleKeyPress = e => {
        if(e.key === 'Enter'){
            handleSearch(name);
        }
    }

    return (
        <div className={styles.form}>
            <div className={styles.column}>
                <h2>Pokemons</h2>
                <div className={styles.row}>

                    <input
                        className={styles.searchInput}
                        type="search"
                        onChange={handleChange}
                        onKeyPress={handleKeyPress}
                        value={name}
                        placeholder='Busqueda por nombre'
                    />
                    <button
                        className={styles.button}
                        onClick={() => handleSearch(name)}
                    >Search</button>

                </div>
            </div>
        </div>
    );
}