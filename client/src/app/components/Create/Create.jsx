import styles from './Create.module.css';
import { useState } from 'react';
import { useSelector } from 'react-redux';

export const Create = props => {
    const allTypes = useSelector(state => state.allTypes);
    const [currentStep, setCurrentStep] = useState(1);

    const handleNext = () => {
        setCurrentStep(currentStep + 1);
    };

    const handlePrevious = () => {
        setCurrentStep(currentStep - 1);
    };

    const handleSubmit = () => {
        console.log('Formulario enviado');
    };

    return (
        <div className={styles.container}>
            <div>
                <h2>Create your pokemon</h2>
            </div>
            <form>
                {
                    currentStep === 1 && (
                        <section className={styles.formSection}>
                            <div className={styles.wrapper}>
                                <label htmlFor="" className={styles.label}>Name</label>
                                <input type="text" />
                            </div>

                            <div className={styles.wrapper}>
                                <label htmlFor="" className={styles.label}>HP</label>
                                <input type="number" />
                            </div>
                            <div className={styles.wrapper}>
                                <label htmlFor="" className={styles.label}>Attack</label>
                                <input type="number" />
                            </div>
                            <div className={styles.wrapper}>
                                <label htmlFor="" className={styles.label}>Defense</label>
                                <input type="number" />
                            </div>
                            <div className={styles.wrapper}>
                                <label htmlFor="" className={styles.label}>Speed</label>
                                <input type="number" />
                            </div>
                            <div className={styles.wrapper}>
                                <label htmlFor="" className={styles.label}>Weight</label>
                                <input type="number" />
                            </div>
                            <div className={styles.wrapper}>
                                <label htmlFor="" className={styles.label}>Height</label>
                                <input type="number" />
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
                                        <input type="checkbox" id={type.id} name={type.name} value={type.name} />
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











