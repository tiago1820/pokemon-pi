import { usePagination } from '../../hooks/usePagination';
import styles from './Pagination.module.css';

export const Pagination = ({ currentPage, totalPages, onPageChange }) => {
    const pageNumbers = usePagination(totalPages);

    return (
        <div className={styles.pagination}>
            {pageNumbers.map(pageNumber => (
                <button
                    key={pageNumber}
                    onClick={() => onPageChange(pageNumber)}
                    className={`${styles.btnPage} ${pageNumber === currentPage ? styles.active : ''}`}
                    title={`Pagina ${pageNumber}.`}
                >
                    {pageNumber}
                </button>
            ))}
        </div>
    );
};
