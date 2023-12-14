import styles from './Feature.module.css';
import feature1 from '../../../images/landing-page/feature1.png';
import feature2 from '../../../images/landing-page/feature2.png';
import feature3 from '../../../images/landing-page/feature3.png';



export const Feature = () => {
    return <>
        <section id='feature' className={styles.feature}>
            <div className={styles.container}>
                <div className={styles.row}>
                    <div className={styles.column}>
                        <h1>SearchBar Ultra Rápido:</h1>
                        <p>Encuentra a tus Pokémon de manera rápida y precisa con nuestro potente SearchBar. Solo necesitas ingresar el nombre completo del Pokémon que buscas, y ¡listo! La búsqueda es exacta, asegurándote de encontrar al instante la información que necesitas.</p>
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
                        <h1>Vista de Listado con Cards Detalladas:</h1>
                        <p>Entra en el fascinante universo de Pokémon a través de nuestro sector de listado, donde te espera una visualización espectacular de cards detalladas. Al iniciar la aplicación, los primeros resultados cargados te darán acceso instantáneo a la imagen, nombre y tipos de cada Pokémon. Haz clic en la card para sumergirte en la información detallada de tu Pokémon favorito.</p>
                    </div>
                </div>
            </div>
        </section>
        <section className={styles.feature}>
            <div className={styles.container}>
                <div className={styles.row}>
                    <div className={styles.column}>
                        <h1>Paginado Dinámico:</h1>
                        <p>Hemos optimizado la experiencia de navegación con un paginado dinámico. Disfruta de una exploración fácil y sin interrupciones mientras descubres nuevas criaturas y amplías tu conocimiento sobre el mundo Pokémon.</p>
                    </div>
                    <div className={styles.column}>
                        <img src={feature3} alt="" />
                    </div>
                </div>
            </div>
        </section>
    </>
};