import styles from './Menu.module.css';
import { useRef } from 'react';
import logo from '../../../images/pokemon-logo.png';

export const Menu = () => {
    const navRef = useRef();

    const showNavBar = () => {
        navRef.current.classList.toggle(`${styles.responsiveNav}`);
    }

    return (
        <nav className={styles.navbar}>
            <div className={styles.left}>
                <a className={styles.appName} href="#">
                    <img src={logo}
                    alt='Pokemon logo'
                    className={styles.logo}/>
                    </a>
            </div>
            <div className={styles.column}>
                <nav ref={navRef} className={styles.right}>
                    <li>
                        <a className={styles.navLink} href="#banner">Home</a>
                    </li>
                    <li>
                        <a className={styles.navLink} href="#feature">Features</a>
                    </li>
                    <button className={styles.navBtn} onClick={showNavBar}>
                        X
                    </button>
                </nav>
                <button className={styles.navBtn} onClick={showNavBar}>
                    &#9776;
                </button>
            </div>
        </nav>
    )
};