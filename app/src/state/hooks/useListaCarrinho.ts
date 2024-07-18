import { useRecoilValue } from "recoil";
import { carrinhoState } from "../atom";

const useListaCarrinho = () =>{
    return useRecoilValue(carrinhoState)
}
export default useListaCarrinho;