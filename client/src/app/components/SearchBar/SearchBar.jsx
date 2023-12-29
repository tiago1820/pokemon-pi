import { useState } from 'react';
import styles from './SearchBar.module.css';
import searchIcon from '../../../images/icons/searchIcon.png';
import { getPokemonByName } from '../../redux/actions';
import { useDispatch } from 'react-redux';


export const SearchBar = props => {
    const dispatch = useDispatch();
    const [name, setName] = useState('');

    const handleKeyPress = e => {
        if (e.key === 'Enter') {
            dispatch(getPokemonByName(name));
        }
    }

    const handleChange = e => {
        setName(e.target.value);
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
                        onClick={() => dispatch(getPokemonByName(name))}
                        title='Inicia la busqueda del pokemon por nombre.'
                    ><img className={styles.searchIcon} src={searchIcon} /></button>

                </div>
            </div>
        </div>
    );
}