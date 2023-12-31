import styles from './EditForm.module.css';

const EditForm = ({
    currentStep,
    pokeData,
    errors,
    allTypes,
    handleInput,
    handleCheckboxChange,
    handleNext,
    handlePrevious,
    handleSubmit,
}) => {
    return (
        <form onSubmit={handleSubmit}>
            {currentStep === 1 && (
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
            {currentStep === 2 && (
                <section className={styles.formSection}>
                    <div>
                        <h2>Types</h2>
                        {errors.types && <p>{errors.types}</p>}
                    </div>
                    <div className={styles.checkboxContainer}>
                        {allTypes.map((type) => (
                            <div key={type.id} className={styles.checkboxItem}>
                                <input
                                    onChange={handleCheckboxChange}
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
            )}
        </form>
    );
};

export default EditForm;