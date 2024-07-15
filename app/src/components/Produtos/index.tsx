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

interface IBusca{
    page?: string;
    size?: string;
    name?: string;
    sortBy: string;
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

    const changePage = (tipo: number) =>{
        if((tipo === -1 && page > 1) || (tipo === 1 && page < totalPages)){
            let pagina =  page + tipo;
            setPage(pagina);
            const opcoes = retornaOpcoes(pagina);
            carregarDados("products", opcoes)
        }       
    }

    const retornaOpcoes = (pagina?: number) =>{
        const opcoes = {
            params: {} as IBusca
        }
        if(busca){
            opcoes.params.name = busca;
        }
        if(pagina){
            opcoes.params.page = pagina.toString();
        }
        switch(ordem){
            case "nomeDESC":{
                opcoes.params.order = "DESC";
                break;
            }
            case "precoASC":{
                opcoes.params.sortBy = "price";
                opcoes.params.order = "ASC";
                break;
            }
            case "precoDESC":{
                opcoes.params.sortBy = "price";
                opcoes.params.order = "DESC";
                break;
            }
        }
        return opcoes;
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
                <button onClick={e => changePage(-1)}>Pagina Anterior</button>
                <button onClick={e => changePage(1)}>Proxima Pagina</button>
            </div>
        </section>
    );
}
export default Produtos;