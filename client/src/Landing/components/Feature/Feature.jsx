import styles from './Feature.module.css';
import image from '../../../images/pokemon3.jpg';

export const Feature = () => {
    return <>
        <section className={styles.feature}>
            <div className={styles.container}>
                <div className={styles.row}>
                    <div className={styles.column}>
                        <h1>Hola</h1>
                        <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Dolorem non quisquam iste, assumenda eos ratione accusamus quidem, quam, molestias consectetur ducimus quibusdam id. Facilis, aspernatur.</p>
                    </div>
                    <div classNamne={styles.column}>
                        <img src={image} alt="" />
                    </div>
                </div>
            </div>
        </section>
        <section className={styles.feature}>
            <div className={styles.container}>
                <div className={styles.row}>
                    <div classNamne={styles.column}>
                        <img src={image} alt="" />
                    </div>
                    <div className={styles.column}>
                        <h1>Hola</h1>
                        <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Dolorem non quisquam iste, assumenda eos ratione accusamus quidem, quam, molestias consectetur ducimus quibusdam id. Facilis, aspernatur.</p>
                    </div>
                </div>
            </div>
        </section>
        <section className={styles.feature}>
            <div className={styles.container}>
                <div className={styles.row}>
                    <div className={styles.column}>
                        <h1>Hola</h1>
                        <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Dolorem non quisquam iste, assumenda eos ratione accusamus quidem, quam, molestias consectetur ducimus quibusdam id. Facilis, aspernatur.</p>
                    </div>
                    <div classNamne={styles.column}>
                        <img src={image} alt="" />
                    </div>
                </div>
            </div>
        </section>
    </>
};