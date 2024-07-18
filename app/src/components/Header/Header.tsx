import { useEffect, useRef, useState } from "react";
import styles from "./Header.module.scss";
import { FaUser, FaShoppingCart } from "react-icons/fa";
import Select, { SingleValue } from 'react-select';
import Carrinho from "./Carrinho";

const Header: React.FC = () =>{
    const [menu, setMenu] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);
    const[carrinhoAberto, setCarrinhoAberto] = useState(false);
    const[tamCarrinho, setTamCarrinho] = useState(0);

    interface IOption{
        value: string,
        label: string
    }

    const options: IOption[] = [
        {value: "logout", label: "sair"}
    ]

    const handleMenu = (selectedOption: SingleValue<IOption>) =>{

    }
    const handleClickOutside = (event: MouseEvent) => {
        if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
            setMenu(false);
        }
    };

    useEffect(() => {
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    return (
        <>
            <nav className={styles.header}>
                <div className={styles.div_name}>
                    <h1 className={styles.nome}>Store</h1>
                    <p className={styles.subnome}>App</p>
                </div>        
                <nav className={styles.nav}>
                    <div className={styles.user_area}>
                        <div className={styles.div_cart} onClick={()=>setCarrinhoAberto(true)}>
                            <FaShoppingCart className={styles.user_cart} size={25}/>
                            <p>{tamCarrinho}</p>
                        </div>
                        <div className={styles.div_user}>               
                            <FaUser className={styles.user_icon} size={25} onClick={()=>setMenu(!menu)} data-testid="user_icon"/>
                        </div>
                    </div>
                    {menu &&(
                        <div className={styles.dropdown} ref={dropdownRef} data-testid="Menu">
                            <Select 
                                className={styles.menu}
                                options={options}
                                onChange={handleMenu}
                                isSearchable={false}
                                placeholder="Menu"
                                menuIsOpen={true}
                            />
                        </div>
                    )}    
                </nav>        
            </nav>
            <Carrinho 
                carrinhoAberto={carrinhoAberto} 
                setCarrinhoAberto={setCarrinhoAberto}
                setTamCarrinho={setTamCarrinho}
            />
        </>
    );
}
export default Header;