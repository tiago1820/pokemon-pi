import styles from './Pagination.module.css';

export const Pagination = ({ currentPage, totalPages, onPageChange }) => {
    const pageNumbers = Array.from({ length: totalPages }, (_, i) => i + 1);

    return (
        <div className={styles.pagination}>
            {pageNumbers.map(pageNumber => (
                <button
                    key={pageNumber}
                    onClick={() => onPageChange(pageNumber)}
                    className={`button ${pageNumber === currentPage ? styles.active : ''}`}
                >
                    {pageNumber}
                </button>
            ))}
        </div>
    );
};