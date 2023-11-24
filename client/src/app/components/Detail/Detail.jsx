import styles from './Detail.module.css';
import { usePokemon } from '../../hooks';

export const Detail = () => {
    const pokemon = usePokemon()

    console.log("AQUI", pokemon);

    return (
        <>
            <h1>Hola</h1>
        </>
    )
}