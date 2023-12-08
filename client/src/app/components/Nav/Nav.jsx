import { Link } from 'react-router-dom';
import styles from './Nav.module.css';
import logo from '../../../images/pokemon-logo.png';

export const Nav = props => {

    return (
        <nav className={styles.navbar}>
            <div className={styles.left}>
                <Link to={'/app'}>
                    <img src={logo} alt="Pokemon logo" className={styles.logo} />
                </Link>
            </div>

            <div className={styles.buttonContainer}>
                <Link to={'/app/create'}>
                    <button className={styles.createButton}>Crear</button>
                </Link>
            </div>
        </nav>

    )



}