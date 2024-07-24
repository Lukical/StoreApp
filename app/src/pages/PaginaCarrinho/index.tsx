import { useRecoilValue } from "recoil";
import useListaCarrinho from "../../state/hooks/useListaCarrinho";
import ICarrinhoItem from "../../types/ICarrinhoItem";
import styled from "./PaginaCarrinho.module.scss";
import { totalPrecoState } from "../../state/atom";
import IProduto from "../../types/IProduto";
import useAdicionarAoCarrinho from "../../state/hooks/useAdicionarAoCarrinho";
import useRemoverDoCarrinho from "../../state/hooks/useRemoverDoCarrinho";

const PaginaCarrinho = () => {
    const items: ICarrinhoItem[] = useListaCarrinho();
    const total: number = useRecoilValue(totalPrecoState);

    const adcionaCarrinho = useAdicionarAoCarrinho();
    const removeCarrinho = useRemoverDoCarrinho();

    const adicionaProduto = (produto: IProduto) =>{
        adcionaCarrinho(produto);
    }
    const removeProduto = (produto: IProduto, removerTudo = false) =>{
        removeCarrinho(produto, removerTudo);
    }

    return (
        <section className={styled.container}>
            <div className={styled.containerCarrinho}>
                <ul>
                    {items.map(carrinho =>
                        <li key={carrinho.produto.id}>
                            <div className={styled.divPaginaCarrinho}>
                                <img src={carrinho.produto.img} alt={carrinho.produto.name} />
                                <div className={styled.divColunas}>
                                    <div className={styled.divNome}>
                                        <label>{carrinho.produto.brand}</label>
                                        <label>{carrinho.produto.name}</label>
                                    </div>
                                </div>
                                <div className={styled.divColunas}>
                                    <label>Quantidade</label>
                                    <div>
                                        <button onClick={()=>removeProduto(carrinho.produto)}><label>{"<"}</label></button>
                                        <label>{carrinho.quantidade}</label>
                                        <button onClick={()=>adicionaProduto(carrinho.produto)}><label>{">"}</label></button>
                                    </div>
                                    <div onClick={()=>removeProduto(carrinho.produto, true)} className={styled.remover}><label>Remover</label></div>
                                </div>
                                <div className={styled.divColunas}>
                                    <label>Preço</label>
                                    <label>{(carrinho.produto.price * carrinho.quantidade).toFixed(2)}</label>
                                </div>            
                            </div>
                        </li>
                    )}
                </ul>
            </div>
            <div className={styled.containerTotal}>
                <label>Total:</label>
                <label>{total.toFixed(2)}</label>
            </div>
        </section>
    )
}
export default PaginaCarrinho;