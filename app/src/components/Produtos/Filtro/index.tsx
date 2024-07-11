import styles from "./Filtro.module.scss";

interface FiltroProps{
    busca: string,
    setBusca: React.Dispatch<React.SetStateAction<string>>
}

const Filtro = ({busca, setBusca} : FiltroProps) =>{
    return(
        <div className={styles.filtroContainer}>
        <p>Ordenar: </p>
        <select>
            <option value="">Escolha</option>
            <option value="crescente">Preço crescente</option>
            <option value="decrescente">Preço decrescente</option>
        </select>
        <p>Procurar: </p>
        <input type='text' value={busca} onChange={e => setBusca(e.target.value)} />
    </div>
    )
}
export default Filtro;