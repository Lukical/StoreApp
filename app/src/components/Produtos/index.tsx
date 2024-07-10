import { useEffect, useState } from 'react';
import http from '../../data/http';
import IProduto from '../../types/IProduto';
import Produto from './Produto';
import styles from './Produtos.module.scss';

interface IPromise {
    products: IProduto[],
    total: number,
    totalPages: number
}

const Produtos = () => {
    const [produtos, setProdutos] = useState<IProduto[]>([]);
    const [total, setTotal] = useState(0);
    const [totalPages, setTotalPages] = useState(0);

    useEffect(() => {
        http.get<IPromise>("products")
            .then(response => {
                setProdutos(response.data.products);
                setTotal(response.data.total);
                setTotalPages(response.data.totalPages);
            })
            .catch(e => {
                console.log(e)
            })
    }, [])

    return (
        <section className={styles.container}>
            <div className={styles.filtroContainer}>
                Filtros
            </div>
            <div className={styles.produtosContainer}>
                {produtos.map(produto =>
                    <Produto produto={produto}/>
                )}
            </div>
        </section>
    );
}
export default Produtos;