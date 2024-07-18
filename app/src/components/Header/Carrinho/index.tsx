import { useEffect } from "react";
import useListaCarrinho from "../../../state/hooks/useListaCarrinho";
import Modal from "../../Modal";
import styled from "./Carrinho.module.scss";
import { totalPrecoState } from "../../../state/atom";
import { useRecoilValue } from "recoil";
import ICarrinhoItem from "../../../types/ICarrinhoItem";

interface ICarrinhoProps{
    carrinhoAberto: boolean,
    setCarrinhoAberto: React.Dispatch<React.SetStateAction<boolean>>,
    setTamCarrinho: React.Dispatch<React.SetStateAction<number>>
}

const Carrinho = ({carrinhoAberto, setCarrinhoAberto, setTamCarrinho}: ICarrinhoProps) =>{
    const carrinho: ICarrinhoItem[] = useListaCarrinho();
    const total: number = useRecoilValue(totalPrecoState);

    useEffect(()=>{
        setTamCarrinho(carrinho.length)
    },[carrinho, setTamCarrinho])
 
    return(
        <Modal isOpen={carrinhoAberto} onClose={() => setCarrinhoAberto(false)}>
            <div className={`${styled['modalContent']} ${carrinhoAberto ? styled['show'] : ''}`} onClick={(e) => e.stopPropagation()}>
                <h3>Resumo do carrinho</h3>
                <div className={styled.carrinhoProdutos}>
                    <ul>
                        {carrinho.map(carrinho =>
                            <li key={carrinho.produto.id}>
                                {carrinho.produto.name} -
                                {carrinho.produto.price} x
                                {carrinho.quantidade}
                            </li>
                        )}
                    </ul>
                </div>
                <div className={styled.totalCarrinho}>
                    <label>Total </label>
                    <label>R$: {total.toFixed(2)}</label>
                </div>
                <button className={styled.buttonPedido}>FECHAR PEDIDO</button>
                <button className={styled.buttonFechar} onClick={() => setCarrinhoAberto(false)}>Continuar Comprando</button>
            </div>
        </Modal>
    )
}
export default Carrinho;