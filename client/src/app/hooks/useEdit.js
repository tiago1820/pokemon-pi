import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { cleanFilters, setLoading, setReload } from '../redux/actions';
import { usePokemon } from '../../app/hooks/usePokemon';
import { validator } from "../utils/validator.util";
import { editPokemon } from '../services';

export const useEdit = () => {
    const pokemon = usePokemon();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const allTypes = useSelector(state => state.allTypes);

    const [currentStep, setCurrentStep] = useState(1);
    const [pokeData, setPokeData] = useState({
        id: pokemon.id || '',
        name: pokemon.name || '',
        hp: pokemon.hp || '',
        attack: pokemon.attack || '',
        defense: pokemon.defense || '',
        speed: pokemon.speed || '',
        weight: pokemon.weight || '',
        height: pokemon.height || '',
        types: pokemon.types || [],
    });

    const [errors, setErrors] = useState({});

    const handleNext = () => {
        setCurrentStep(currentStep + 1);
    };

    const handlePrevious = () => {
        setCurrentStep(currentStep - 1);
    };

    const handleInput = (e) => {
        const fieldName = e.target.name;
        const value = e.target.value;

        setPokeData(prevData => ({
            ...prevData,
            [fieldName]: value,
        }));

        const validationErrors = validator({ ...pokeData, [fieldName]: value });

        setErrors((prevErrors) => ({
            ...prevErrors,
            ...validationErrors,
        }));
    };

    const handleCheckboxChange = (e) => {
        const { name, checked } = e.target;

        const updatedTypes = checked
            ? [...pokeData.types, name]
            : pokeData.types.filter((type) => type !== name);

        setPokeData((prevData) => ({
            ...prevData,
            types: updatedTypes,
        }));

        if (updatedTypes.length === 0) {
            setErrors((prevErrors) => ({
                ...prevErrors,
                types: 'Selecciona al menos un tipo.',
            }));
        } else if (updatedTypes.length > 2) {
            setErrors((prevErrors) => ({
                ...prevErrors,
                types: 'Selecciona como máximo dos tipos.',
            }));
        } else {
            setErrors((prevErrors) => ({
                ...prevErrors,
                types: '',
            }));
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        const hasErrors = Object.values(errors).some((error) => error !== '');

        const noTypesSelected = pokeData.types.length === 0;

        if (hasErrors || noTypesSelected) {
            window.alert(
                'Por favor, completa todos los campos correctamente antes de actualizar el Pokémon.'
            );
        } else {
            const allFieldsHaveData = Object.values(pokeData).every(
                (value) => value !== '' && value !== null && value !== undefined
            );

            if (allFieldsHaveData) {
                editPokemon(pokeData);
                dispatch(cleanFilters());
                dispatch(setLoading(true));
                dispatch(setReload(+1));
                navigate('/app');
            } else {
                window.alert(
                    'Por favor, completa todos los campos antes de actualizar el Pokémon.'
                );
            }
        }
    };

    return {
        currentStep,
        pokeData,
        errors,
        allTypes,
        handleNext,
        handlePrevious,
        handleInput,
        handleCheckboxChange,
        handleSubmit,
    };
};