import { useEffect, useState } from 'react';
import http from '../../data/http';
import IProduto from '../../types/IProduto';
import Produto from './Produto';
import styles from './Produtos.module.scss';
import { AxiosRequestConfig } from 'axios';
import Filtro from './Filtro';

interface IPromise {
    products: IProduto[],
    total: number,
    totalPages: number
}

interface IBusca {
    page?: string;
    size?: string;
    name?: string;
    sortBy?: string;
    order?: string;
}

const Produtos = () => {
    const [produtos, setProdutos] = useState<IProduto[]>([]);
    const [totalPages, setTotalPages] = useState(0);
    const [page, setPage] = useState(1);
    const [busca, setBusca] = useState("");
    const [ordem, setOrdem] = useState("");

    const carregarDados = (url: string, opcoes: AxiosRequestConfig = {}) => {
        http.get<IPromise>(url, opcoes)
            .then(response => {
                setProdutos(response.data.products);
                setTotalPages(response.data.totalPages);
            })
            .catch(e => {
                console.log(e)
            })
    }

    const buscar = (evento: React.FormEvent<HTMLFormElement>) => {
        evento.preventDefault();
        const opcoes = retornaOpcoes();
        carregarDados("products", opcoes)
    }

    const changePage = (numero: number, jump: boolean = false) => {
            let pagina = jump ? numero : page + numero;
            pagina = Math.max(1, Math.min(pagina, totalPages));
            if(pagina === page) return;
            
            setPage(pagina);
            const opcoes = retornaOpcoes(pagina);
            carregarDados("products", opcoes)
    }

    const retornaOpcoes = (pagina?: number) => {
        const opcoes = {
            params: {} as IBusca
        }
        if (busca) {
            opcoes.params.name = busca;
        }
        if (pagina) {
            opcoes.params.page = pagina.toString();
        }
        switch (ordem) {
            case "nomeDESC": {
                opcoes.params.order = "DESC";
                break;
            }
            case "precoASC": {
                opcoes.params.sortBy = "price";
                opcoes.params.order = "ASC";
                break;
            }
            case "precoDESC": {
                opcoes.params.sortBy = "price";
                opcoes.params.order = "DESC";
                break;
            }
        }
        return opcoes;
    }

    const getPaginas = () =>{
        const maxPaginas = 5;
        let inicioPaginas = Math.max(page - Math.floor(maxPaginas)/2, 1);
        let finalPaginas = inicioPaginas + maxPaginas - 1;

        if(finalPaginas > totalPages){
            finalPaginas = totalPages;
            inicioPaginas = Math.max(finalPaginas - maxPaginas + 1, 1);
        }
        const paginas = [];
        for (let i = inicioPaginas; i <= finalPaginas; i++){
            paginas.push(
                <label 
                    key={`pagina${i}`}
                    className={page === i ? styles.active : ''}
                    onClick={()=> changePage(i, true)}
                >
                    {i}
                </label>
            )
        }
        return paginas;
    }

    useEffect(() => {
        carregarDados("products")
    }, [])

    return (
        <section className={styles.container}>
            <form onSubmit={buscar}>
                <Filtro busca={busca} setBusca={setBusca}
                    ordem={ordem} setOrdem={setOrdem}
                />
            </form>
            <div className={styles.produtosContainer}>
                {produtos.map(produto =>
                    <Produto key={produto.id} produto={produto} />
                )}
            </div>
            <div className={styles.paginacao}>
                <button onClick={() => changePage(-1)}>Pagina Anterior</button>
                <div>
                    {getPaginas()}
                </div>           
                <button onClick={() => changePage(1)}>Proxima Pagina</button>
            </div>
        </section>
    );
}
export default Produtos;