import { Menu, Banner, Feature, Footer } from './components';
import styles from './Landing.module.css';

export const Landing = () => {
    return (
        <div className={styles.container}>
            <Menu />
            <Banner />
            <Feature />
            <Footer />
        </div>
    )
};