import styles from './Card.module.css';

export const Card = props => {

    const { name, image, types } = props;


    return (
        <div className={styles.container}>
            <div className={styles.card}>
                <img className={styles.img} src={image} alt="" />

                <div className={styles.cardContent}>
                    <div className={styles.name}>{name}</div>
                </div>

                <div className={styles.types}>
                    {types.map((type, index) => (
                        <span key={index} className={styles.type}>
                            {type}
                        </span>
                    ))}
                </div>
            </div>
        </div>
    )
}