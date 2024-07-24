import { render, screen, fireEvent } from '@testing-library/react';
import Carrinho from '.';
import { carrinhoState } from '../../../state/atom';
import { MutableSnapshot, RecoilRoot } from 'recoil';
import ICarrinhoItem from '../../../types/ICarrinhoItem';

const carrinhoAberto = true;
const mockSetCarrinhoAberto = jest.fn();
const mockSetTamCarrinho = jest.fn();

const mockCarrinho: ICarrinhoItem[] = [
    {
        produto: {
            id: 1, name: "Produto 1", price: 100, img: "img1.png",
            description: "", brand: "brand1", createdAt: "", updatedAt: ""
        }, quantidade: 1
    },
    {
        produto: {
            id: 2, name: "Produto 2", price: 200, img: "img2.png",
            description: "", brand: "brand1", createdAt: "", updatedAt: ""
        }, quantidade: 1
    }
];

jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom'),
    useNavigate: jest.fn(),
  }));

jest.mock('../../../state/hooks/useListaCarrinho', () => ({
    __esModule: true,
    default: () => mockCarrinho,
}));

const initializeState = ({ set }: MutableSnapshot) => {
    set(carrinhoState, mockCarrinho);
};

describe("Carrinho", () => {
    test("Renderiza o carrinho quando aberto", () => {
        render(
            <RecoilRoot initializeState={initializeState}>
                <Carrinho
                    carrinhoAberto={carrinhoAberto}
                    setCarrinhoAberto={mockSetCarrinhoAberto}
                    setTamCarrinho={mockSetTamCarrinho}
                />
            </RecoilRoot>
        )
        expect(screen.getByText("Resumo do carrinho")).toBeInTheDocument();
        expect(screen.getByText("Produto 1")).toBeInTheDocument();
        expect(screen.getByText("Produto 2")).toBeInTheDocument();
        expect(screen.getByText("R$: 300.00")).toBeInTheDocument();
    })
    test("Fecha carrinho quando clicar no botao de continuar", () => {
        render(
            <RecoilRoot initializeState={initializeState}>
                <Carrinho
                    carrinhoAberto={carrinhoAberto}
                    setCarrinhoAberto={mockSetCarrinhoAberto}
                    setTamCarrinho={mockSetTamCarrinho}
                />
            </RecoilRoot>
        )
        fireEvent.click(screen.getByText("Continuar Comprando"));
        expect(mockSetCarrinhoAberto).toHaveBeenCalledWith(false);
    })
    test("Atualiza tamanho do carrinho quando muda estado dos itens", () => {
        render(
            <RecoilRoot initializeState={initializeState}>
                <Carrinho
                    carrinhoAberto={carrinhoAberto}
                    setCarrinhoAberto={mockSetCarrinhoAberto}
                    setTamCarrinho={mockSetTamCarrinho}
                />
            </RecoilRoot>
        )
        expect(mockSetTamCarrinho).toHaveBeenCalledWith(mockCarrinho.length);
    })
})