import { useSelector, useDispatch } from 'react-redux';
import { setRequestError } from '../redux/actions';

export const useCards = () => {
    const searchResult = useSelector((state) => state.searchResult);
    const showPagination = searchResult.length === 0;
    const requestError = useSelector((state) => state.requestError);
    const dispatch = useDispatch();

    const handleRequestError = () => {
        dispatch(setRequestError(''));
    };

    return {
        searchResult,
        showPagination,
        requestError,
        handleRequestError,
    };
};