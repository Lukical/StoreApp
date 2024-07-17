import Modal from "../../Modal";
import styled from "./Carrinho.module.scss";

interface ICarrinhoProps{
    carrinhoAberto: boolean,
    setCarrinhoAberto: React.Dispatch<React.SetStateAction<boolean>>
}

const Carrinho = ({carrinhoAberto, setCarrinhoAberto}: ICarrinhoProps) =>{
    return(
        <Modal isOpen={carrinhoAberto} onClose={() => setCarrinhoAberto(false)}>
            <div className={`${styled['content']} ${carrinhoAberto ? styled['show'] : ''}`} onClick={(e) => e.stopPropagation()}>
                <div>Modal</div>
                <div>carrinho</div>
                <button onClick={() => setCarrinhoAberto(false)}>Fechar</button>
            </div>
        </Modal>
    )
}
export default Carrinho;