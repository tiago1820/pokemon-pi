import EditForm from './EditForm/EditForm';
import { editPokemon } from '../../../services';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import validator from './validator';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { getAllPokemons } from '../../redux/actions';
import { usePokemon } from '../../hooks/usePokemon';

export const Edit = props => {
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

        const allFieldsHaveData = Object.values(pokeData).every((value) => value !== '' && value !== null && value !== undefined);

        if (allFieldsHaveData) {
            editPokemon(pokeData);
            navigate('/app');
            dispatch(getAllPokemons());

        } else {
            window.alert('Por favor, completa todos los campos antes de crear el Pokémon.');
        }

    };

    return (
        <EditForm
            currentStep={currentStep}
            pokeData={pokeData}
            errors={errors}
            allTypes={allTypes}
            handleInput={handleInput}
            handleCheckboxChange={handleCheckboxChange}
            handleNext={handleNext}
            handlePrevious={handlePrevious}
            handleSubmit={handleSubmit}
        />
    );
}