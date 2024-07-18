import { useSetRecoilState } from "recoil";
import { carrinhoState } from "../atom";
import IProduto from "../../types/IProduto";

const useAdicionarAoCarrinho = () =>{
    const setLista = useSetRecoilState(carrinhoState)
    return (produto: IProduto) =>{
        setLista(oldCarrinho => {
            const index = oldCarrinho.findIndex(item => item.produto.name === produto.name);
            if (index >= 0) {
              const newCarrinho = [...oldCarrinho];
              newCarrinho[index] = {
                ...newCarrinho[index],
                quantidade: newCarrinho[index].quantidade + 1,       
              };
              return newCarrinho;
            } else {
              return [...oldCarrinho, { produto, quantidade: 1 }];
            }
          });
    }
}
export default useAdicionarAoCarrinho;