import styles from "./Filtro.module.scss";
import { FaSearch } from "react-icons/fa";

interface FiltroProps{
    busca: string,
    setBusca: React.Dispatch<React.SetStateAction<string>>,
    ordem: string,
    setOrdem: React.Dispatch<React.SetStateAction<string>>
}

const Filtro = ({busca, setBusca, ordem, setOrdem} : FiltroProps) =>{
    return(
        <div className={styles.filtroContainer}>
        <label htmlFor="ordenar">Ordenar: </label>
        <select id="ordenar" value={ordem} onChange={e => setOrdem(e.target.value)}>
            <option value="">Escolha</option>
            <option value="nomeASC">Nome crescente</option>
            <option value="nomeDESC">Nome decrescente</option>
            <option value="precoASC">Preço crescente</option>
            <option value="precoDESC">Preço decrescente</option>
        </select>
        <label htmlFor="procurar">Procurar: </label>
        <div className={styles.inputBusca}>
            <input id="procurar" type='text' value={busca} onChange={e => setBusca(e.target.value)} />
            <button type="submit">
                <FaSearch className={styles.lupa} size={25}/>
            </button>
        </div>
    </div>
    )
}
export default Filtro;