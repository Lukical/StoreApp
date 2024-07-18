import Modal from "../../Modal";
import styled from "./Carrinho.module.scss";

interface ICarrinhoProps{
    carrinhoAberto: boolean,
    setCarrinhoAberto: React.Dispatch<React.SetStateAction<boolean>>
}

const Carrinho = ({carrinhoAberto, setCarrinhoAberto}: ICarrinhoProps) =>{
    return(
        <Modal isOpen={carrinhoAberto} onClose={() => setCarrinhoAberto(false)}>
            <div className={`${styled['modalContent']} ${carrinhoAberto ? styled['show'] : ''}`} onClick={(e) => e.stopPropagation()}>
                <h3>Resumo do carrinho</h3>
                <div className={styled.carrinhoProdutos}>
                    Produtos
                </div>
                <div className={styled.totalCarrinho}>
                    <label>Total </label>
                    <label>R$: 100,00</label>
                </div>
                <button className={styled.buttonPedido}>FECHAR PEDIDO</button>
                <button className={styled.buttonFechar} onClick={() => setCarrinhoAberto(false)}>Continuar Comprando</button>
            </div>
        </Modal>
    )
}
export default Carrinho;