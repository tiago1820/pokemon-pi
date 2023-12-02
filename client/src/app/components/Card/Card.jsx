import styles from './Card.module.css';
import { Link } from 'react-router-dom';
import defaultImg from '../../../images/default-img.png';

export const Card = props => {

    const { id, name, image, types, onClose } = props;

    const capitalizeFirstLetter = word => {
        return word.charAt(0).toUpperCase() + word.slice(1);
    };

    return (
        <div className={styles.container}>

            <div className={styles.card}>
                {/* <Link to={`/app/detail/${id}`} className={styles.cardLink}> */}

                {onClose && (
                    <button onClick={() => onClose(id)}>X</button>
                )}

                <img className={styles.img} src={image || defaultImg} alt="" />

                <div className={styles.cardContent}>
                    <Link to={`/app/detail/${id}`} className={styles.cardLink}>
                        <div className={styles.name}>{capitalizeFirstLetter(name)}</div>
                    </Link>
                </div>

                {
                    types && types.length > 0 && (
                        <div className={styles.types}>
                            {types.map((type, index) => (
                                <span
                                    key={index}
                                    className={`${styles.type} ${styles[type.toLowerCase()]}`}
                                >
                                    {type}
                                </span>
                            ))}
                        </div>
                    )
                }
                {/* </Link> */}
            </div>
        </div>
    )
}