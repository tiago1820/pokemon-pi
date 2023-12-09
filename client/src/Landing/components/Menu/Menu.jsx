import styles from './Menu.module.css';

export const Menu = () => {
    return (
        <nav className={styles.navbar}>
            <div className={styles.left}>
                <a className={styles.appName} href="#">logo</a>
            </div>
            <div className={styles.column}>
                <nav className={styles.right}>
                    <li>
                        <a className={styles.navLink} href="#">Home</a>
                    </li>
                    <li>
                        <a className={styles.navLink} href="#">Feature 1</a>
                    </li>
                    <li>
                        <a className={styles.navLink} href="#">Feature 2</a>
                    </li>
                    <li>
                        <a className={styles.navLink} href="#">Feature 3</a>
                    </li>
                    <button className={styles.navBtn}>
                        &#9776;
                    </button>
                </nav>
                <button className={styles.navBtn}>
                    X
                </button>
            </div>
        </nav>
    )
};