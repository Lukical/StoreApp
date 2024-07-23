import useAdicionarAoCarrinho from "../../../../state/hooks/useAdicionarAoCarrinho";
import useRemoverDoCarrinho from "../../../../state/hooks/useRemoverDoCarrinho";
import ICarrinhoItem from "../../../../types/ICarrinhoItem";
import IProduto from "../../../../types/IProduto";
import styled from "./ItemsCarrinho.module.scss";

interface IItemsProps{
    carrinho: ICarrinhoItem[]
}

const ItemsCarrinho = (items: IItemsProps)  => {
    const adcionaCarrinho = useAdicionarAoCarrinho();
    const removeCarrinho = useRemoverDoCarrinho();

    const adicionaProduto = (produto: IProduto) =>{
        adcionaCarrinho(produto);
    }
    const removeProduto = (produto: IProduto, removerTudo = false) =>{
        removeCarrinho(produto, removerTudo);
    }
    
    return (
        <ul>
            {items.carrinho.map(carrinho =>
                <li key={carrinho.produto.id}>
                    <div className={styled.carrinhoProduto}>
                        <div className={styled.carrinhoRemover}>
                            <button data-testid={`removerTudoTeste${carrinho.produto.id}`} onClick={() => removeProduto(carrinho.produto, true)}>x</button>
                        </div>
                        <div className={styled.carrinhoTop}>
                            <img src={carrinho.produto.img} alt={carrinho.produto.name} />
                            <label>{carrinho.produto.name}</label>
                        </div>
                        <div className={styled.carrinhoBottom}>
                            <div className={styled.carrinhoQtd}>
                                <button data-testid={`removerTeste${carrinho.produto.id}`} onClick={() => removeProduto(carrinho.produto)}>-</button>
                                <label>{carrinho.quantidade}</label>
                                <button data-testid={`adicionarTeste${carrinho.produto.id}`} onClick={() => adicionaProduto(carrinho.produto)}>+</button>
                            </div>
                            <label>{(carrinho.produto.price * carrinho.quantidade).toFixed(2)}</label>
                        </div>
                    </div>
                </li>
            )}
        </ul>
    )
}
export default ItemsCarrinho;