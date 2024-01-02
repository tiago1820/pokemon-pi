import { useState, useEffect } from 'react';

export const usePagination = (totalPages) => {
    const [pageNumbers, setPageNumbers] = useState([]);

    useEffect(() => {
        const calculatePageNumbers = () => {
            const numbers = [];
            for (let i = 1; i <= totalPages; i++) {
                numbers.push(i);
            }
            setPageNumbers(numbers);
        };

        calculatePageNumbers();
    }, [totalPages]);

    return pageNumbers;
};