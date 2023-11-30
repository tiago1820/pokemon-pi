import styles from './Create.module.css';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import validator from './validator';

export const Create = props => {
    const { createPokemon } = props;
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
            createPokemon(pokeData);
        } else {
            window.alert('Por favor, completa todos los campos antes de crear el Pokémon.');
        }

    };

    return (
        <div className={styles.container}>
            <div>
                <h2>Create your pokemon</h2>
            </div>
            <form onSubmit={handleSubmit}>

                {
                    currentStep === 1 && (
                        <section className={styles.formSection}>
                            <div className={styles.wrapper}>
                                <label htmlFor="" className={styles.label}>Name</label>
                                <input onInput={handleInput} name='name' type="text" value={pokeData.name} />
                                {errors.name1 && <p>{errors.name1}</p>}
                                {errors.name2 && <p>{errors.name2}</p>}
                                {errors.name3 && <p>{errors.name3}</p>}
                            </div>

                            <div className={styles.wrapper}>
                                <label htmlFor="" className={styles.label}>HP</label>
                                <input onInput={handleInput} name='hp' type="number" value={pokeData.hp} />
                                {errors.hp && <p>{errors.hp}</p>}
                            </div>
                            <div className={styles.wrapper}>
                                <label htmlFor="" className={styles.label}>Attack</label>
                                <input onInput={handleInput} name='attack' type="number" value={pokeData.attack} />
                                {errors.attack && <p>{errors.attack}</p>}
                            </div>
                            <div className={styles.wrapper}>
                                <label htmlFor="" className={styles.label}>Defense</label>
                                <input onInput={handleInput} name='defense' type="number" value={pokeData.defense} />
                                {errors.defense && <p>{errors.defense}</p>}
                            </div>
                            <div className={styles.wrapper}>
                                <label htmlFor="" className={styles.label}>Speed</label>
                                <input onInput={handleInput} name='speed' type="number" value={pokeData.speed} />
                                {errors.speed && <p>{errors.speed}</p>}
                            </div>
                            <div className={styles.wrapper}>
                                <label htmlFor="" className={styles.label}>Weight</label>
                                <input onInput={handleInput} name='weight' type="number" value={pokeData.weight} />
                                {errors.weight && <p>{errors.weight}</p>}
                            </div>
                            <div className={styles.wrapper}>
                                <label htmlFor="" className={styles.label}>Height</label>
                                <input onInput={handleInput} name='height' type="number" value={pokeData.height} />
                                {errors.height && <p>{errors.height}</p>}
                            </div>
                            <button type='button' onClick={handleNext}>Next</button>
                        </section>
                    )}
                {
                    currentStep === 2 && (
                        <section className={styles.formSection}>
                            <div>
                                <h2>Types</h2>
                                {errors.types && <p>{errors.types}</p>}
                            </div>
                            <div className={styles.checkboxContainer}>
                                {allTypes.map((type) => (
                                    <div key={type.id} className={styles.checkboxItem}>
                                        <input
                                            onChange={handleCheckboxChange}  // Cambiar onInput a onChange
                                            type="checkbox"
                                            id={type.id}
                                            name={type.name}
                                            value={type.name}
                                            checked={pokeData.types.includes(type.name)}

                                        />
                                        <label htmlFor={type.id}>{type.name}</label>


                                    </div>
                                ))}
                            </div>
                            <div className={styles.buttonContainer}>
                                <button type='button' onClick={handlePrevious}>previous</button>
                                <button type="button" onClick={handleSubmit}>Create</button>
                            </div>
                        </section>
                    )
                }

            </form>

        </div>
    )

}