import styles from './Edit.module.css';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import validator from './validator';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { getAllPokemons } from '../../redux/actions';
import { usePokemon } from '../../hooks/usePokemon';

export const Edit = props => {
    const { editPokemon } = props;
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
        <div className={styles.container}>
            <div>
                <h2>Edit your pokemon</h2>
            </div>
            <form onSubmit={handleSubmit}>

                {
                    currentStep === 1 && (
                        <section className={styles.formSection}>
                            <div className={styles.wrapper}>
                            <input type="hidden" name="id" value={pokeData.id} />
                            </div>

                            <div className={styles.wrapper}>
                                <label htmlFor="" className={styles.label}>Name</label>
                                <input onChange={handleInput} name='name' type="text" value={pokeData.name} />
                                {errors.name1 && <p>{errors.name1}</p>}
                                {errors.name2 && <p>{errors.name2}</p>}
                                {errors.name3 && <p>{errors.name3}</p>}
                            </div>

                            <div className={styles.wrapper}>
                                <label htmlFor="" className={styles.label}>HP</label>
                                <input onChange={handleInput} name='hp' type="number" value={pokeData.hp} />
                                {errors.hp && <p>{errors.hp}</p>}
                            </div>
                            <div className={styles.wrapper}>
                                <label htmlFor="" className={styles.label}>Attack</label>
                                <input onChange={handleInput} name='attack' type="number" value={pokeData.attack} />
                                {errors.attack && <p>{errors.attack}</p>}
                            </div>
                            <div className={styles.wrapper}>
                                <label htmlFor="" className={styles.label}>Defense</label>
                                <input onChange={handleInput} name='defense' type="number" value={pokeData.defense} />
                                {errors.defense && <p>{errors.defense}</p>}
                            </div>
                            <div className={styles.wrapper}>
                                <label htmlFor="" className={styles.label}>Speed</label>
                                <input onChange={handleInput} name='speed' type="number" value={pokeData.speed} />
                                {errors.speed && <p>{errors.speed}</p>}
                            </div>
                            <div className={styles.wrapper}>
                                <label htmlFor="" className={styles.label}>Weight</label>
                                <input onChange={handleInput} name='weight' type="number" value={pokeData.weight} />
                                {errors.weight && <p>{errors.weight}</p>}
                            </div>
                            <div className={styles.wrapper}>
                                <label htmlFor="" className={styles.label}>Height</label>
                                <input onChange={handleInput} name='height' type="number" value={pokeData.height} />
                                {errors.height && <p>{errors.height}</p>}
                            </div>
                            <button className={styles.btnNext} type='button' onClick={handleNext}>Next</button>
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
                                            onChange={handleCheckboxChange}  // Cambiar onChange a onChange
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
                                <button className={styles.btnPrev} type='button' onClick={handlePrevious}>previous</button>
                                <button className={styles.btnSub} type="button" onClick={handleSubmit}>Update</button>
                            </div>
                        </section>
                    )
                }

            </form>

        </div>
    )

}