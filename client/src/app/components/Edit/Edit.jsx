import { useEdit } from '../../hooks/useEdit';
import EditForm from './components/EditForm/EditForm';
import styles from "./Edit.module.css";

export const Edit = props => {
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
    } = useEdit();

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