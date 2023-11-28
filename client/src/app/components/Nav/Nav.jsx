import { Link } from 'react-router-dom';
import styles from './Nav.module.css';
import { SearchBar } from '../SearchBar/SearchBar';

export const Nav = props => {
    const { onSearch } = props;

    return (
        <div>
            <nav className={styles.navbar}>
                <div className={styles.left}>
                    <Link to={'/app'}>
                        logo
                    </Link>
                </div>

                <div>
                    <SearchBar onSearch={onSearch} />
                </div>

                <div>
                    <Link to={'/app/create'}>
                        <button>Crear</button>
                    </Link>
                </div>
            </nav>
        </div>
    )



}