import { Service } from '../../../services';
import EditForm from './components/EditForm/EditForm';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import validator from './validator';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setLoading, setReload, cleanFilters } from '../../redux/actions';
import { usePokemon } from '../../hooks/usePokemon';
import styles from './Edit.module.css';

export const Edit = props => {
    const service = new Service();
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
                service.editPokemon(pokeData);
                dispatch(cleanFilters());
                dispatch(setLoading(true));
                dispatch(setReload(true));
                navigate('/app');
            } else {
                window.alert(
                    'Por favor, completa todos los campos antes de actualizar el Pokémon.'
                );
            }
        }
    };


    return (
        <div className={styles.createContainer}>
            <div className={styles.formContainer}>
                <div>
                    <h2>Edit your pokemon</h2>
                </div>
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
            </div>
        </div>

    );
}