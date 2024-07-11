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

const Produtos = () => {
    const [produtos, setProdutos] = useState<IProduto[]>([]);
    const [total, setTotal] = useState(0);
    const [totalPages, setTotalPages] = useState(0);
    const [busca, setBusca] = useState("");

    const carregarDados = (url: string, opcoes: AxiosRequestConfig = {}) => {
        http.get<IPromise>(url, opcoes)
            .then(response => {
                setProdutos(response.data.products);
                setTotal(response.data.total);
                setTotalPages(response.data.totalPages);
            })
            .catch(e => {
                console.log(e)
            })
    }

    const buscar = (evento: React.FormEvent<HTMLFormElement>) => {
        evento.preventDefault();
        console.log("Buscando...")
    }

    useEffect(() => {
        carregarDados("products")
    }, [])

    return (
        <section className={styles.container}>   
            <form onSubmit={buscar}>
                <Filtro busca={busca} setBusca={setBusca}/>
            </form>
            <div className={styles.produtosContainer}>
                {produtos.map(produto =>
                    <Produto key={produto.id} produto={produto} />
                )}              
            </div>
        </section>
    );
}
export default Produtos;