import { CreateForm } from '../../components';
import { Service } from '../../../services';

import styles from './Create.module.css';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import validator from './validator';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { getAllPokemons, cleanFilters, setLoading } from '../../redux/actions';

export const Create = props => {
    const service = new Service();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const allTypes = useSelector(state => state.allTypes);
    const [currentStep, setCurrentStep] = useState(1);
    const [pokeData, setPokeData] = useState({
        name: '',
        hp: '',
        attack: '',
        defense: '',
        speed: '',
        weight: '',
        height: '',
        types: [],

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

        setPokeData((prevData) => ({
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

        // Validación para la cantidad de checkboxes seleccionados
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
                'Por favor, completa todos los campos correctamente antes de crear el Pokémon.'
            );
        } else {
            const allFieldsHaveData = Object.values(pokeData).every(
                (value) => value !== '' && value !== null && value !== undefined
            );

            if (allFieldsHaveData) {
                service.createPokemon(pokeData);
                // dispatch(getAllPokemons());
                dispatch(cleanFilters());
                dispatch(setLoading(true));
                navigate('/app');
            } else {
                window.alert(
                    'Por favor, completa todos los campos antes de crear el Pokémon.'
                );
            }
        }
    };


    return (
        <div className={styles.createContainer}>
            <div className={styles.formContainer}>
                <div>
                    <h2>Create your pokemon</h2>
                </div>
                <div className={styles.right}>
                    <CreateForm
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
        </div>
    );

}