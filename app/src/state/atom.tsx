import { atom, selector } from "recoil";
import ICarrinhoItem from "../types/ICarrinhoItem";

export const carrinhoState = atom<ICarrinhoItem[]>({
    key: 'carrinhoState',
    default: []
})
export const totalPrecoState = selector<number>({
    key: 'totalPrecoState',
    get: ({get}) =>{
        const produtos = get(carrinhoState);
        return produtos.reduce((total, produto) => total + (produto.produto.price * produto.quantidade), 0)
    }
})
