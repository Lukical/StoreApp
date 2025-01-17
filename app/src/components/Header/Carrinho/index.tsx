import { useEffect } from "react";
import useListaCarrinho from "../../../state/hooks/useListaCarrinho";
import Modal from "../../Modal";
import styled from "./Carrinho.module.scss";
import { totalPrecoState } from "../../../state/atom";
import { useRecoilValue } from "recoil";
import ICarrinhoItem from "../../../types/ICarrinhoItem";
import Items from "./ItemsCarrinho";
import { useNavigate } from "react-router-dom";

interface ICarrinhoProps {
    carrinhoAberto: boolean,
    setCarrinhoAberto: React.Dispatch<React.SetStateAction<boolean>>,
    setTamCarrinho: React.Dispatch<React.SetStateAction<number>>
}

const Carrinho = ({ carrinhoAberto, setCarrinhoAberto, setTamCarrinho }: ICarrinhoProps) => {
    const carrinho: ICarrinhoItem[] = useListaCarrinho();
    const total: number = useRecoilValue(totalPrecoState);
    const navigate = useNavigate();   

    useEffect(() => {
        setTamCarrinho(carrinho.length)
    }, [carrinho, setTamCarrinho])

    const fecharPedido = () =>{
        setCarrinhoAberto(false)
        navigate("/carrinho");
    }

    return (
        <Modal isOpen={carrinhoAberto} onClose={() => setCarrinhoAberto(false)}>
            <div className={`${styled['modalContent']} ${carrinhoAberto ? styled['show'] : ''}`} onClick={(e) => e.stopPropagation()}>
                <h3>Resumo do carrinho</h3>
                <div className={styled.carrinhoProdutos}>
                    <Items carrinho={carrinho}/>
                </div>
                <div className={styled.totalCarrinho}>
                    <label>Total </label>
                    <label>R$: {total.toFixed(2)}</label>
                </div>
                <button onClick={()=> fecharPedido()} className={styled.buttonPedido}>FECHAR PEDIDO</button>
                <button className={styled.buttonFechar} onClick={() => setCarrinhoAberto(false)}>Continuar Comprando</button>
            </div>
        </Modal>
    )
}
export default Carrinho;