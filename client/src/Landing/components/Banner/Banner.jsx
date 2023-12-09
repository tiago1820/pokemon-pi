import styles from './Banner.module.css';

export const Banner = () => {

    return (
        <section id='banner' className={styles.banner}>
            <div className={styles.container}>
                <div className={styles.row}>
                    <div className={styles.column}>
                        <h1>banner</h1>
                        <a href="/app">Entrar</a>
                    </div>
                </div>
            </div>
        </section>
    )
};