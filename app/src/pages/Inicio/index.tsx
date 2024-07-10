import Produtos from '../../components/Produtos';
import styles from './Inicio.module.scss';

const Inicio = () =>{
    return(
        <section className={styles.container}>
            <Produtos/>
        </section>
    );
}
export default Inicio;