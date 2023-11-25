import styles from './Card.module.css';
import { Link } from 'react-router-dom';

export const Card = props => {

    const { id, name, image, types } = props;

    return (
        <div className={styles.container}>
            <Link to={`/app/detail/${id}`}>
                <div className={styles.card}>
                    <img className={styles.img} src={image} alt="" />

                    <div className={styles.cardContent}>
                        <div className={styles.name}>{name}</div>
                    </div>

                    {
                        types && types.length > 0 && (
                            <div className={styles.types}>
                                {types.map((type, index) => (
                                    <span key={index} className={styles.type}>
                                        {type}
                                    </span>
                                ))}
                            </div>
                        )
                    }
                </div>
            </Link>


        </div>
    )
}