import { useEffect, useState } from 'react';
import styles from './Inicio.module.scss';
import http from '../../data/http';
import IProduto from '../../types/IProduto';

interface IPromise{
    products: IProduto[],
    total: number,
    totalPages: number
}

const Inicio = () =>{

    const [produtos, setProdutos] = useState<IProduto[]>([]);
    const [total, setTotal] = useState(0);
    const [totalPages, setTotalPages] = useState(0);

    useEffect(()=>{
        http.get<IPromise>("products")
        .then(response =>{
            setProdutos(response.data.products);
            setTotal(response.data.total);
            setTotalPages(response.data.totalPages);
        })
        .catch(e=>{
            console.log(e)
        })
    },[])

    return(
        <section className={styles.container}>
            <div className={styles.containerProducts}>
                {produtos.map(produto =>
                    <div>
                        <li>{produto.name}</li>
                    </div>
                )}
            </div>
        </section>
    );
}
export default Inicio;