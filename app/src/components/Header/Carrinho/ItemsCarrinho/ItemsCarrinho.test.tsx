import { render, screen, fireEvent } from '@testing-library/react';
import { RecoilRoot } from 'recoil';
import ItemsCarrinho from '.';
import ICarrinhoItem from '../../../../types/ICarrinhoItem';
import useAdicionarAoCarrinho from '../../../../state/hooks/useAdicionarAoCarrinho';
import useRemoverDoCarrinho from '../../../../state/hooks/useRemoverDoCarrinho';

jest.mock('../../../../state/hooks/useAdicionarAoCarrinho', () => ({
    __esModule: true,
    default: jest.fn()
  }));
  
  jest.mock('../../../../state/hooks/useRemoverDoCarrinho', () => ({
    __esModule: true,
    default: jest.fn()
  }));
  
  const mockAdicionarAoCarrinho = useAdicionarAoCarrinho as jest.Mock;
  const mockRemoverDoCarrinho = useRemoverDoCarrinho as jest.Mock;

describe("ItemsCarrinho", () => {
    const mockCarrinho: ICarrinhoItem[] = [{
        produto: {
            id: 1,
            name: "Produto 1",
            description: "",
            brand: "brand1",
            img: "img1.png",
            price: 10.00,
            createdAt: "",
            updatedAt: ""
        },
        quantidade: 2,
    },
    {
        produto: {
            id: 2,
            name: "Produto 2",
            description: "",
            brand: "brand1",
            img: "img2.png",
            price: 20.00,
            createdAt: "",
            updatedAt: ""
        },
        quantidade: 1
    }
    ]

    beforeEach(() => {
        mockAdicionarAoCarrinho.mockClear();
        mockRemoverDoCarrinho.mockClear();
    });

    test("Renderizar items do carrinho", () => {
        render(<RecoilRoot><ItemsCarrinho carrinho={mockCarrinho} /></RecoilRoot>)
        expect(screen.getByText('Produto 1')).toBeInTheDocument();
        expect(screen.getByText('Produto 2')).toBeInTheDocument();
    })
    test("adicionar produto carrinho", () => {
        const mockAddFunction = jest.fn();
        mockAdicionarAoCarrinho.mockReturnValue(mockAddFunction);

        render(<RecoilRoot><ItemsCarrinho carrinho={mockCarrinho} /></RecoilRoot>)

        const button = screen.getByTestId('adicionarTeste1');
        fireEvent.click(button);

        expect(mockAddFunction).toHaveBeenCalledTimes(1);
        expect(mockAddFunction).toHaveBeenCalledWith(mockCarrinho[0].produto);
    })
    test("remover produto carrinho", () => {
        const mockRemoverFunction = jest.fn();
        mockRemoverDoCarrinho.mockReturnValue(mockRemoverFunction);

        render(<RecoilRoot><ItemsCarrinho carrinho={mockCarrinho} /></RecoilRoot>)

        const button = screen.getByTestId('removerTeste1');
        fireEvent.click(button);

        expect(mockRemoverFunction).toHaveBeenCalledTimes(1);
        expect(mockRemoverFunction).toHaveBeenCalledWith(mockCarrinho[0].produto, false);
    })
    test("remover todo o produto do carrinho", () => {
        const mockRemoverTudoFunction = jest.fn();
        mockRemoverDoCarrinho.mockReturnValue(mockRemoverTudoFunction);

        render(<RecoilRoot><ItemsCarrinho carrinho={mockCarrinho} /></RecoilRoot>)

        const button = screen.getByTestId('removerTudoTeste1');
        fireEvent.click(button);

        expect(mockRemoverTudoFunction).toHaveBeenCalledTimes(1);
        expect(mockRemoverTudoFunction).toHaveBeenCalledWith(mockCarrinho[0].produto, true);
    })
})