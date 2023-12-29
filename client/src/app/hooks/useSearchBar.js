import { useState } from "react";
import { useDispatch } from "react-redux";
import { getPokemonByName } from "../redux/actions";

export const useSearchBar = () => {
    const dispatch = useDispatch();
    const [name, setName] = useState('');

    const handleKeyPress = e => {
        if (e.key === 'Enter') {
            dispatch(getPokemonByName(name));
        }
    };

    const handleChange = e => {
        setName(e.target.value);
    };

    const handleSearch = name => {
        dispatch(getPokemonByName(name));
    }

    return {
        name,
        handleKeyPress,
        handleChange,
        handleSearch
    };
};