import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import axios from 'axios';
import Produtos from './index';
import http from '../../data/http';

jest.mock('../../data/http');

const mockedHttp = http as jest.Mocked<typeof axios>;

const mockProducts = {
    products: [
        { id: 1, name: 'Produto 1', price: 100 },
        { id: 2, name: 'Produto 2', price: 200 },
        { id: 3, name: 'Produto 3', price: 300 },
        { id: 4, name: 'Produto 4', price: 400 },
        { id: 5, name: 'Produto 5', price: 500 },
        { id: 6, name: 'Produto 6', price: 600 },
        { id: 7, name: 'Produto 7', price: 700 },
    ],
    total: 7,
    totalPages: 2,
};

describe('Produtos', () =>{
    beforeEach(()=>{
        mockedHttp.get.mockResolvedValue({ data: mockProducts });
    })
    afterEach(() => {
        jest.clearAllMocks();
    });

    test("Renderiza produtos", async() =>{  
        render(<Produtos />);

        await waitFor(()=>{
            expect(screen.getByText("Produto 1")).toBeInTheDocument();
        });
        await waitFor(()=>{
            expect(screen.getByText("Produto 2")).toBeInTheDocument();
        });
    })

    test("Procurando produto", async() =>{  
        render(<Produtos />);

        let mockSearchedProducts = {
            products: [
                { id: 2, name: 'Produto 2', price: 200 },
            ],
            total: 1,
            totalPages: 1,
        };

        await waitFor(()=>{
            expect(screen.getByText("Produto 1")).toBeInTheDocument();
        });

        mockedHttp.get.mockResolvedValueOnce({ data: mockSearchedProducts });

        fireEvent.change(screen.getByPlaceholderText('Buscar'), { target: { value: 'Produto 2' } });
        fireEvent.submit(screen.getByTestId('botaoSubmit'));

        await waitFor(()=>{
            expect(screen.queryByText("Produto 1")).not.toBeInTheDocument();
        });
        await waitFor(()=>{
            expect(screen.getByText("Produto 2")).toBeInTheDocument();
        });
    })
    test("ordem", async()=>{
        render(<Produtos />);

        await waitFor(()=>{
            expect(screen.getByText("Produto 2")).toBeInTheDocument();
        });
        await waitFor(()=>{
            expect(screen.getByText("Produto 1")).toBeInTheDocument();
        });
        
        fireEvent.change(screen.getByTestId("selectOrder"), { target: { value: 'nomeDESC' } });

        await waitFor(()=>{
            expect(screen.getByText("Produto 1")).toBeInTheDocument();
        });
        await waitFor(()=>{
            expect(screen.getByText("Produto 2")).toBeInTheDocument();
        });
    })
    test("paginacao", async()=>{
        let mockSearchedProducts = {
            products: [
                { id: 7, name: 'Produto 7', price: 700 },
            ],
            total: 7,
            totalPages: 2,
        };

        render(<Produtos />);

        await waitFor(()=>{
            expect(screen.getByText("Produto 1")).toBeInTheDocument();
        });
        await waitFor(()=>{
            expect(screen.getByText("Produto 2")).toBeInTheDocument();
        });

        mockedHttp.get.mockResolvedValueOnce({ data: mockSearchedProducts });

        fireEvent.click(screen.getByText("Proxima Pagina"));

        await waitFor(()=>{
            expect(screen.queryByText("Produto 1")).not.toBeInTheDocument();
        });

        await waitFor(()=>{
            expect(screen.getByText("Produto 7")).toBeInTheDocument();
        });
    })
})