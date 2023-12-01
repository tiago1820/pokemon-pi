import styles from './Loader.module.css';
import pokeball from '../../../images/pokeball.gif';

export const Loader = () => {
    return (
        <div className={styles.loaderContainer}>
            <img className={styles.loader} src={pokeball} alt="Loading..." />
        </div>
    );
};
