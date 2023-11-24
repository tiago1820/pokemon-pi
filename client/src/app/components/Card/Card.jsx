import styles from './Card.module.css';

export const Card = props => {

    const { name, image } = props;


    return (
        <div className={styles.container}>
            <div className={styles.card}>
                <img className={styles.img} src={image} alt="" />

                <div className={styles.cardContent}>
                    <div className={styles.name}>{name}</div>
                </div>



            </div>
        </div>
    )
}