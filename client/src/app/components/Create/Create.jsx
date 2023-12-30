import { CreateForm } from '../../components';
import { useCreate } from '../../hooks/useCreate';
import styles from "./Create.module.css";

export const Create = () => {
    const {
        currentStep,
        pokeData,
        errors,
        allTypes,
        handleNext,
        handlePrevious,
        handleInput,
        handleCheckboxChange,
        handleSubmit,
    } = useCreate();

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