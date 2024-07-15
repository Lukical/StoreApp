import IProduto from "../../../types/IProduto";
import styles from "./Produto.module.scss";
import { FaShoppingCart } from "react-icons/fa";

interface ItemProps{
    produto: IProduto
}

const Produto = ({produto} : ItemProps) =>{
    return(
        <section className={styles.container}>
            <div className={styles.produtoContainer}>
                <div className={styles.produto}>
                    <img src={produto.img} alt={produto.name}/>
                    <h1>{produto.name}</h1>
                    <p>R$ {produto.price.toFixed(2)}</p>
                </div>
                <button>
                    <FaShoppingCart className={styles.user_cart} size={25}/>
                    <p>Comprar</p>
                </button>           
            </div>
        </section>
    );
}
export default Produto;