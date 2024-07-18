import IProduto from "../../../types/IProduto";
import styles from "./Produto.module.scss";
import { FaShoppingCart } from "react-icons/fa";
import useAdicionarAoCarrinho from "../../../state/hooks/useAdicionarAoCarrinho";

interface ItemProps{
    produto: IProduto
}

const Produto = ({produto} : ItemProps) =>{
    const adcionaCarrinho = useAdicionarAoCarrinho();
    
    const adicionaProduto = (produto: IProduto) =>{
        adcionaCarrinho(produto);
    }
    return(
        <section className={styles.container}>
            <div className={styles.produtoContainer}>
                <div className={styles.produto}>
                    <img src={produto.img} alt={produto.name}/>
                    <h1>{produto.name}</h1>
                    <p>R$ {produto.price.toFixed(2)}</p>
                </div>
                <button onClick={()=>adicionaProduto(produto)}>
                    <FaShoppingCart className={styles.user_cart} size={25}/>
                    <p>Comprar</p>
                </button>           
            </div>
        </section>
    );
}
export default Produto;