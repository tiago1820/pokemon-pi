import { Utils } from '../../../utils';
import { useState } from 'react';
import styles from './SearchBar.module.css';
import searchIcon from '../../../images/icons/searchIcon.png';

export const SearchBar = props => {
    const utils = new Utils();
    const { handleSearch } = props;
    const [name, setName] = useState('');

    const handleKeyPress = e => {
        utils.handleKeyPress(e, handleSearch, name);
    }

    const handleChange = e => {
        utils.handleChange(e, setName);
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
                        title='Inicia la busqueda del pokemon por nombre.'
                    ><img className={styles.searchIcon} src={searchIcon} /></button>

                </div>
            </div>
        </div>
    );
}