import styles from './Footer.module.css';
import github from "../../../images/icons/github.png";
import linkedin from "../../../images/icons/linkedin.png";

export const Footer = () => {

    const year = new Date().getFullYear();

    return (
        <section id='footer' className={styles.footer}>
            <div>
                <ul className={styles.list}>
                    <li className={styles.item}>
                        <a className={styles.icon} href="https://github.com/tiago1820" target='_blank'><img src={github} alt="GitHub Icon" /></a>
                        <a className={styles.icon} href="https://www.linkedin.com/in/tiago0liveira/" target='_blank'><img src={linkedin} alt="Linkedin Icon" /></a>
                    </li>
                </ul>
            </div>
            <a className={styles.contacto} href="mailto:tiago.zdo@gmail.com"><p>tiago.zdo@gmail.com</p></a>
            <p>Desarrollado por Tiago de Oliveira - {year}</p>
        </section>
    )
};