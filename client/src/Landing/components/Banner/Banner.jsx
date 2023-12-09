import styles from './Banner.module.css';

export const Banner = () => {

    return (
        <section className={styles.banner}>
            <div className={styles.container}>
                <div className={styles.row}>
                    <div className={styles.column}>
                        <h1>banner</h1>
                        <a href="#">Entrar</a>
                    </div>
                </div>
            </div>
        </section>
    )
};