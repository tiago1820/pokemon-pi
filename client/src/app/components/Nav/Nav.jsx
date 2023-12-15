import { Link } from 'react-router-dom';
import styles from './Nav.module.css';
import logo from '../../../images/pokemon-logo.png';
import homeIcon from '../../../images/icons/home.png';

export const Nav = props => {

    return (
        <nav className={styles.navbar}>
            <div className={styles.left}>
                <Link to={'/app'}>
                    <img
                        src={homeIcon}na
                        alt="Pokemon logo"
                        className={styles.homeIcon}
                        title='Vuelve al inicio.'
                    />
                </Link>
            </div>

            <div className={styles.middle}>
                <Link to={'/app'}>
                    <img
                        src={logo}
                        alt="Pokemon logo"
                        className={styles.logo}
                        title='Vuelve al inicio.'
                    />

                </Link>
            </div>

            <div className={styles.buttonContainer}>
                <Link to={'/app/create'}>
                    <button
                        className={styles.createButton}
                        title='Crea un nuevo pokemon.'
                    >Crear</button>
                </Link>
            </div>

        </nav>

    )



}