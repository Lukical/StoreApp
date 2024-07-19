import { useSetRecoilState } from "recoil";
import { carrinhoState } from "../atom";
import IProduto from "../../types/IProduto";

const useRemoverDoCarrinho = () =>{
    const setLista = useSetRecoilState(carrinhoState);
    return(produto: IProduto, removerTudo = false) =>{
        setLista(oldCarrinho =>{
            const index = oldCarrinho.findIndex(item => item.produto.name === produto.name);
            if(index >= 0){
                const newCarrinho = [...oldCarrinho];
                if(newCarrinho[index].quantidade === 1 || removerTudo){
                    newCarrinho.splice(index, 1);
                }
                else{
                    newCarrinho[index] = {
                        ...newCarrinho[index],
                        quantidade: newCarrinho[index].quantidade - 1,       
                      };
                }
                return newCarrinho;
            }
            return oldCarrinho;
        })
    }
}
export default useRemoverDoCarrinho;