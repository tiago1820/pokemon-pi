import styles from './Feature.module.css';
import feature1 from '../../../images/feature1.png';
import feature2 from '../../../images/feature2.png';


export const Feature = () => {
    return <>
        <section id='feature' className={styles.feature}>
            <div className={styles.container}>
                <div className={styles.row}>
                    <div className={styles.column}>
                        <h1>Hola</h1>
                        <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Dolorem non quisquam iste, assumenda eos ratione accusamus quidem, quam, molestias consectetur ducimus quibusdam id. Facilis, aspernatur.</p>
                    </div>
                    <div className={styles.column}>
                        <img src={feature1} alt="" />
                    </div>
                </div>
            </div>
        </section>
        <section className={styles.feature}>
            <div className={styles.middleContainer}>
                <div className={styles.row}>
                    <div className={styles.column}>
                        <img src={feature2} alt="" />
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
                    <div className={styles.column}>
                        <img src={feature1} alt="" />
                    </div>
                </div>
            </div>
        </section>
    </>
};