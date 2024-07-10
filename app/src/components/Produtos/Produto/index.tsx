import IProduto from "../../../types/IProduto";
import styles from "./Produto.module.scss";

interface ItemProps{
    produto: IProduto
}

const Produto = ({produto} : ItemProps) =>{
    return(
        <section className={styles.container}>
            <div className={styles.produtoContainer}>
                <img src={produto.img} alt={produto.name}/>
                <h1>{produto.name}</h1>
                <p>R$ {produto.price}</p>             
            </div>
        </section>
    );
}
export default Produto;