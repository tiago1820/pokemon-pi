import styles from './Footer.module.css';

export const Footer = () => {

    const year = new Date().getFullYear();

    return (
        <section id='footer' className={styles.footer}>
            <div>
                <ul className={styles.list}>
                    <li className={styles.item}>
                        <a href="">icono</a>
                        <a href="">icono</a>  
                    </li>
                </ul>
            </div>
            <a className={styles.contacto} href="mailto:tiago.zdo@gmail.com">tiago.zdo@gmail.com</a>
            <p>Desarrollado por Tiago de Oliveira - {year}</p>
        </section>
    )
};