import styles from './Create.module.css';
import { useState } from 'react';
import { useSelector } from 'react-redux';

export const Create = props => {
    const { createPokemon } = props;
    const allTypes = useSelector(state => state.allTypes);
    const [currentStep, setCurrentStep] = useState(1);

    const handleNext = () => {
        setCurrentStep(currentStep + 1);
    };

    const handlePrevious = () => {
        setCurrentStep(currentStep - 1);
    };

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


    const handleChange = (e) => {
        if (e.target.type === 'checkbox') {
            const isChecked = e.target.checked;
            const typeValue = e.target.value;

            setPokeData((prevData) => {
                const updatedTypes = isChecked
                    ? [...prevData.types, typeValue]
                    : prevData.types.filter((type) => type !== typeValue);

                return { ...prevData, types: updatedTypes };
            });
        } else {
            setPokeData({ ...pokeData, [e.target.name]: e.target.value });
        }
    };


    const handleSubmit = (e) => {
        e.preventDefault();
        createPokemon(pokeData);

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
                                <input onChange={handleChange} name='name' type="text" />
                            </div>

                            <div className={styles.wrapper}>
                                <label htmlFor="" className={styles.label}>HP</label>
                                <input onChange={handleChange} name='hp' type="number" />
                            </div>
                            <div className={styles.wrapper}>
                                <label htmlFor="" className={styles.label}>Attack</label>
                                <input onChange={handleChange} name='attack' type="number" />
                            </div>
                            <div className={styles.wrapper}>
                                <label htmlFor="" className={styles.label}>Defense</label>
                                <input onChange={handleChange} name='defense' type="number" />
                            </div>
                            <div className={styles.wrapper}>
                                <label htmlFor="" className={styles.label}>Speed</label>
                                <input onChange={handleChange} name='speed' type="number" />
                            </div>
                            <div className={styles.wrapper}>
                                <label htmlFor="" className={styles.label}>Weight</label>
                                <input onChange={handleChange} name='weight' type="number" />
                            </div>
                            <div className={styles.wrapper}>
                                <label htmlFor="" className={styles.label}>Height</label>
                                <input onChange={handleChange} name='height' type="number" />
                            </div>
                            <button type='button' onClick={handleNext}>Next</button>
                        </section>
                    )}
                {
                    currentStep === 2 && (
                        <section className={styles.formSection}>
                            <div>
                                <h2>Types</h2>
                            </div>
                            <div className={styles.checkboxContainer}>
                                {allTypes.map((type) => (
                                    <div key={type.id} className={styles.checkboxItem}>
                                        <input
                                            type="checkbox"
                                            id={type.id}
                                            name={type.name}
                                            value={type.name}
                                            onChange={handleChange}
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











