import styles from './Pagination.module.css';

export const Pagination = ({ currentPage, totalPages, onPageChange }) => {
    // const pageNumbers = Array.from({ length: totalPages }, (_, i) => i + 1);
    const pageNumbers = [];
    for (let i = 1; i <= totalPages; i++) {
        pageNumbers.push(i);
    }


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
