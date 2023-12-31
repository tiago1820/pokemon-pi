import styles from './Card.module.css';
import { Link } from 'react-router-dom';
import defaultImg from '../../../images/default-img.png';
import { capitalizeFirstLetter } from '../../utils';

export const Card = props => {
    const { id, name, image, types, onClose } = props;

    return (
        <div className={styles.container}>
            <div className={styles.card}>
                {onClose && (
                    <button className={styles.btnClose} onClick={() => onClose(id)}>X</button>
                )}
                <Link to={`/app/detail/${id}`} className={styles.cardLink}>
                    <img
                        className={styles.img}
                        src={image || defaultImg}
                        alt="" />

                    <div className={styles.cardContent}>
                        <div className={styles.name}>{capitalizeFirstLetter(name)}</div>
                    </div>
                </Link>

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
            </div>
        </div>
    )
}